(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-54198343-2', 'auto');
ga('send', 'pageview');

$(document).ready(function () {
    $('#main_content').headsmart();

    $('#overview').elevateZoom({
        cursor: "pointer",
        zoomType: "inner",
        scrollZoom: true
    });


    $('#gpio').elevateZoom({
        cursor: "pointer",
        zoomType: "inner",
        scrollZoom: true
    });

    $('#mosfet').elevateZoom({
        gallery: 'mosfet_gal',
        galleryActiveClass: 'active',
        zoomType: "inner",
        scrollZoom: true,
        cursor: "pointer"
    });

    $("#mosfet").bind("click", function (e) {
        var ez = $('#mosfet').data('elevateZoom');
        $.fancybox(ez.getGalleryList());

        return false;
    });

    $('#led').elevateZoom({
        gallery: 'led_gal',
        galleryActiveClass: 'active',
        zoomType: "inner",
        scrollZoom: true,
        cursor: "pointer"
    });

    $("#led").bind("click", function (e) {
        var ez = $('#led').data('elevateZoom');
        $.fancybox(ez.getGalleryList());

        return false;
    });

    $('#pi').elevateZoom({
        gallery: 'pi_gal',
        galleryActiveClass: 'active',
        zoomType: "inner",
        scrollZoom: true,
        cursor: "pointer"
    });

    $("#").bind("click", function (e) {
        var ez = $('#pi').data('elevateZoom');
        $.fancybox(ez.getGalleryList());

        return false;
    });

    $('#power').elevateZoom({
        gallery: 'power_gal',
        galleryActiveClass: 'active',
        zoomType: "inner",
        scrollZoom: true,
        cursor: "pointer"
    });

    $("#power").bind("click", function (e) {
        var ez = $('#power').data('elevateZoom');
        $.fancybox(ez.getGalleryList());

        return false;
    });

    $('#finish').elevateZoom({
        gallery: 'finish_gal',
        galleryActiveClass: 'active',
        zoomType: "inner",
        scrollZoom: true,
        cursor: "pointer"
    });

    $("#finish").bind("click", function (e) {
        var ez = $('#finish').data('elevateZoom');
        $.fancybox(ez.getGalleryList());

        return false;
    });

    $('#finish_color').elevateZoom({
        gallery: 'finish_color_gal',
        galleryActiveClass: 'active',
        zoomType: "inner",
        scrollZoom: true,
        cursor: "pointer"
    });

    $("#finish_color").bind("click", function (e) {
        var ez = $('#finish_color').data('elevateZoom');
        $.fancybox(ez.getGalleryList());

        return false;
    });

    $("#german").click(function () {
        i18n.setLng('de', function () {
            $("#pitut").i18n();
        });
    });

    $("#english").click(function () {
        i18n.setLng('en', function () {
            $("#pitut").i18n();
        });
    });
});

i18n.init({fallbackLng: 'en'}, function () {
    $("#pitut").i18n();
});