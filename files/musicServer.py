#!/usr/bin/python
import socket
import time
import sys
import tty
import termios
from thread import start_new_thread


# CONFIG START #

# Socket Address to use
socketAddress = ("192.168.178.20", 8993)

# Pins
RED_PIN = 17
GREEN_PIN = 22
BLUE_PIN = 24

# CONFIG END #


# Change the color of pi blaster 
def piBlasterChange(pin, value):
	os.system("echo %i=%f > /dev/pi-blaster" % (pin, value))

# Get pressed key
def getch():
	fd = sys.stdin.fileno()
	old_settings = termios.tcgetattr(fd)
	try:
		tty.setraw(fd)
		ch = sys.stdin.read(1)
	finally:
		termios.tcsetattr(fd, termios.TCSADRAIN, old_settings)
	return ch

# Turn a light on with a given brightness
def turn_on_light(i, brightness=1.0):
	global brightness_factor
	
	brightness *= brightness_factor
	
	if (i == 0):
		piBlasterChange(RED_PIN, brightness)
	if (i == 1):
		piBlasterChange(GREEN_PIN, brightness)
	if (i == 2):
		piBlasterChange(BLUE_PIN, brightness)

# Print information
print "b/d = Increase / Decrease brightness"
print "p/r = Pause / Resume"
print "c = Abort Program"

# Default values
matrix = [0 for _ in range(3)]
mean = 12
std = 1.5
abort = False
state = True
brightness_factor = 0.5

# Open socket server
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.bind(socketAddress)
sock.listen(1)

print "Connected ..."

# Checks the pressed key
def check_key():
	global abort
	global state
	global brightness_factor
	
	while True:
		# Retrieve the pressed key
		c = getch()
		
		if c == 'b' and brightness_factor < 0.95:
			brightness_factor = brightness_factor + 0.05
			print "Current brightness: %.2f" % brightness_factor
			
		if c == 'd' and brightness_factor > 0.05:
			brightness_factor = brightness_factor - 0.05
			print "Current brightness: %.2f" % brightness_factor
			
		if c == 'p':
			state = False
			print "Pausing..."
			
			time.sleep(0.1)
			
			for i in range(0, 3):
				turn_on_light(i, 0.0)
			
		if c == 'r':
			state = True
			print "Resuming..."
			
		if c == 'c':
			abort = True
			break;

start_new_thread(check_key, ())


while not abort:
	# Wait for incoming...
	connection, client_address = sock.accept()
	
	try:
		while True and state and not abort:
			# Receive data
			data = connection.recv(23)
			# Invalid data?
			if not data or len(data) < 23:
				break
			
			try:
				# Read out values
				data = data.split(",")
				
				r = float(data[0])
				g = float(data[1])
				b = float(data[2])
				
				# Turn on the lights
				turn_on_light(0, r)
				turn_on_light(1, g)
				turn_on_light(2, b)
			except:
				pass
	finally:
		# End
		connection.close()

print "Aborting..."

# Close socket
sock.close()

# Turn off lights
for i in range(0, 3):
	turn_on_light(i, 0.0)

time.sleep(1)