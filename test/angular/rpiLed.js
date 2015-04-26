(function () {
    "use strict";

    angular.module("rpiLed", ["ngCookies", "ui.router", "ngTouch", "pascalprecht.translate"]).config(["$translateProvider", "$stateProvider", "$urlRouterProvider", function ($translateProvider, $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $translateProvider.preferredLanguage("en");
        $translateProvider.fallbackLanguage("de");
        $translateProvider.useLocalStorage();

        $translateProvider.useStaticFilesLoader({
            files: [{
                prefix: "i18n/rgb/locale-",
                suffix: ".json"
            }, {
                prefix: "i18n/ws2812/locale-",
                suffix: ".json"
            }]
        });

        $stateProvider
            .state("rgb", {
                url: "/",
                templateUrl: "angular/page/rgb.tpl.html"
            })
            .state("ws2812", {
                url: "/ws2812",
                templateUrl: "angular/page/ws2812.tpl.html"
            });
    }]);
})();