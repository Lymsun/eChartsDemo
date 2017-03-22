/**
 *
 * File: main.js
 * Author: Lym
 * Created Date: 2017/3/18.
 * Function:
 *
 */

(function ($) {
    var demo1Chart = echarts.init(document.getElementById('demo1Content'));

    demo1Chart.showLoading();
    $.get('../json/demo1.json').done(function (data) {
        var opinion = {
            title: {
                text: 'demo1'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['案件总数', '新增案件数', '办结案件数']
            },
            xAxis: {
                type: 'category',
                data: data.xCategories
            },
            yAxis: [
                {
                    type: 'value',
                    name: '案件数',
                    
                    axisLabel: {
                        formatter: '{value} 件'
                    }
                }
            ],
            series: [
                {
                    name: '案件总数',
                    type: 'bar',
                    data: data.aData
                },
                {
                    name: '新增案件数',
                    type: 'bar',
                    data: data.bData
                },
                {
                    name: '办结案件数',
                    type: 'line',
                    data: data.cData
                }
            ]
        };
        demo1Chart.hideLoading();
        demo1Chart.setOption(opinion);
    });
})(jQuery);