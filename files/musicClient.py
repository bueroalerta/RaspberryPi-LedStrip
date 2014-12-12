import pyaudio
import socket
import numpy as np
from thread import start_new_thread

# Init pyAudio
p = pyaudio.PyAudio()


# CONFIG START #

# If you need the output and input device, use this code to get a list of all devices and search for the correct ones
#for x in range(p.get_device_count()):
	#print p.get_device_info_by_index(x)

# The socket address
socketAddress = ("192.168.178.20", 8993)

# The real output device (your speakers)
realOutput = 4

# The input device
inputIndex = p.get_default_input_device_info()["index"]

# CONFIG END #


# Default values
matrix = [0 for _ in range(3)]
mean = 12.0
std = 1.5
counter = 0

# Connect socket
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect(socketAddress)

# Open audio stream
stream = p.open(output_device_index = realOutput, format = pyaudio.paInt16, 
				channels = 2, rate = 44100, input = True, 
				output = True, input_device_index = inputIndex)


# Calculate the frequency per channel
def calculate_channel_frequency():
	channel_length = 3

	octaves = (np.log(15000 / 50)) / np.log(2)
	octaves_per_channel = octaves / channel_length
	frequency_limits = []
	frequency_store = []

	frequency_limits.append(50)
	
	for i in range(1, channel_length + 1):
		frequency_limits.append(frequency_limits[-1] * 10 ** (3 / (10 * (1 / octaves_per_channel))))
		
	for i in range(0, channel_length):
		frequency_store.append((frequency_limits[i], frequency_limits[i + 1]))

	return frequency_store


def piff(val):
	return int(1024 * val / 44100)


# Calculate the sound levels from raw data
def calculate_levels(data, frequency_limits):
	data_stereo = np.frombuffer(data, dtype=np.int16)
	data = np.empty(len(data) / 4)
	data[:] = data_stereo[::2]

	window = np.hanning(len(data))
	data = data * window

	fourier = np.fft.rfft(data)
	fourier = np.delete(fourier, len(fourier) - 1)

	power = np.abs(fourier) ** 2

	matrix = [0 for i in range(3)]
	
	for i in range(3):
		matrix[i] = np.log10(np.sum(power[piff(frequency_limits[i][0])
											:piff(frequency_limits[i][1]):1]))
	return matrix
	

# Send data to the PI
def send_data(data):
	global sock
	try:
		# Calculate frequency and levels
		frequency_limits = calculate_channel_frequency()
		matrix = calculate_levels(data, frequency_limits)
		message = list()
		
		# Calculate colors
		for i in range(0, 3):
			# Calculate brightness
			brightness = matrix[i] - mean + 0.5 * std
			brightness = brightness / (1.25 * std)
			
			# Look at the range ;)
			if brightness > 1.0:
				brightness = 1.0
				
			if brightness < 0:
				brightness = 0
			
			# Add to the socket message
			message.append("%.5f" % brightness)
			
		if len(message) == 3:
			# Send sound through socket
			sock.send(str(message).replace("'", "").replace("[", "").replace("]", "").replace(" ", ""))
	except Exception as e:
		sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
		sock.connect(socketAddress)


while True:
	# Read audio data from output
	data = stream.read(1024)
	counter += 1
	
	# Found data -> send it
	if data and data != '':
		# Only every three times to prevent bugs
		if counter == 3:
			counter = 0
			send_data(data)
		# Write sound to the real speakers
		stream.write(data)

# Close the socket and audio stream
sock.close()
stream.close()