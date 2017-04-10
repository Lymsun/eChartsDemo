/**
 *
 * File: demo4.js
 * Author: Lym
 * Created Date: 2017/3/23.
 * Function:
 *
 */

(function ($) {
    function splitData(rawData) {
        var specificData = [];
        for (var i = 0; i<rawData.length; i++) {
            if (rawData[i].Ticker == 'ABC') {
                specificData.push(rawData[i]);
            }
        }

        var categoryData = [];
        var values = [];
        var volumes = [];

        for (var j = 0; j< specificData.length; j++ ) {
            var dateString = specificData[j].Date;
            var pattern = /(\d{4})(\d{2})(\d{2})/;
            var newDateString = dateString.replace(pattern, '$1-$2-$3');
            categoryData.push(newDateString);
            values.push(specificData[j].Open, specificData[j].High, specificData[j].Low, specificData[j].Close);
            volumes.push(specificData[j].Volume);
        }

        return{
            categoryData: categoryData,
            values: values,
            volumes: volumes
        }
    }

    var demo4Chart = echarts.init(document.getElementById('demo4Content'));
    demo4Chart.showLoading();

    $.get('../json/stock.json').done(function (stockData) {
        var data = splitData(stockData);

        var opinion = {};

        demo4Chart.hideLoading();
        demo4Chart.setOption(opinion);
    });
})(jQuery);