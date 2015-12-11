(function () {
    "use strict";

    (function (i, s, o, g, r, a, m) {
        i["GoogleAnalyticsObject"] = r;
        i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");

    ga("create", "UA-54198343-2", "auto");
    ga("require", "displayfeatures");
    ga("send", "pageview");

    angular.module("rpiLed", ["ngCookies", "ui.router", "ngTouch", "pascalprecht.translate"]).config(["$translateProvider", "$stateProvider", "$urlRouterProvider", function ($translateProvider, $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $translateProvider.useSanitizeValueStrategy("escaped");
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
            .state("rgbDE", {
                url: "/de",
                templateUrl: "angular/page/rgb.tpl.html",
                controller: function($scope, $translate) {
                    $translate.use("de");
                }
            })
            .state("rgbEN", {
                url: "/en",
                templateUrl: "angular/page/rgb.tpl.html",
                controller: function($scope, $translate) {
                    $translate.use("en");
                }
            })
            .state("ws2812", {
                url: "/ws2812",
                templateUrl: "angular/page/ws2812.tpl.html"
            })
            .state("ws2812DE", {
                url: "/ws2812/de",
                templateUrl: "angular/page/ws2812.tpl.html",
                controller: function($scope, $translate) {
                    $translate.use("de");
                }
            })
            .state("ws2812EN", {
                url: "/ws2812/en",
                templateUrl: "angular/page/ws2812.tpl.html",
                controller: function($scope, $translate) {
                    $translate.use("en");
                }
            });
    }]);
})();