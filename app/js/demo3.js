/**
 *
 * File: demo3.js
 * Author: Lym
 * Created Date: 2017/3/18.
 * Function:
 *
 */

(function ($) {
    function randomCountryValue() {
        return Math.round(Math.random()*10000);
    }

    var demo3Chart = echarts.init(document.getElementById('demo3Content'));
    demo3Chart.showLoading();

    $.get('../json/ne_50m_admin_0_countries_lakes.json').done(function (geoJson) {
        var countryNum = geoJson.features.length;
        var countryArray = [];
        for(var i = 0; i < countryNum; i++)
        {
            countryArray.push({
                name: geoJson.features[i].properties.name,
                value: randomCountryValue()
            });
        }

        echarts.registerMap('worldMap', geoJson);

        var opinion = {
            backgroundColor: '#404a59',
            title: {
                text: 'World Map',
                textStyle: {
                    color: '#fff'
                },
                x: 'left'
            },
            visualMap: {
                type: 'continuous',
                min: 0,
                max: 10000,
                realtime: false,
                calculable: true,
                color: ['orangered','yellow','lightskyblue'],
                textStyle: {
                    color: '#fff'
                },
                y: 'center'
            },
            series: [{
                type: 'map',
                roam: true,
                map: 'worldMap',
                data: countryArray
            }]
        };

        demo3Chart.hideLoading();
        demo3Chart.setOption(opinion);
    });
})(jQuery);