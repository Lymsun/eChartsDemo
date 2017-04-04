/**
 *
 * File: demo3.js
 * Author: Lym
 * Created Date: 2017/3/18.
 * Function:
 *
 */

(function ($) {
    var demo3Chart = echarts.init(document.getElementById('demo3Content'));

    demo3Chart.showLoading();
    $.get('../json/ne_50m_admin_0_countries_lakes.json').done(function (geoJson) {
        var mapChart = echarts.registerMap('geo', geoJson);
        var opinion = {
            geo: {
                map: 'geo',
                roam: true
            }
        };

        demo3Chart.hideLoading();
        demo3Chart.setOption(opinion);
    });
})(jQuery);