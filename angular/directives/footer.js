(function () {
    "use strict";

    angular.module("rpiLed").directive("rpiFooter", [function () {
        return {
            restrict: "E",
            replace: "true",
            templateUrl: "angular/directives/footer.tpl.html",
            scope: {},
            link: function ($scope) {
                $scope.disqusConfig = {
                    disqus_shortname: "raspberrypiledstrip",
                    disqus_identifier: "http://popoklopsi.github.io/RaspberryPi-LedStrip",
                    disqus_url: "http://popoklopsi.github.io/RaspberryPi-LedStrip/#/"
                };
            }
        }
    }]);
})();