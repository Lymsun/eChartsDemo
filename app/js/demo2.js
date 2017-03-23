/**
 *
 * File: demo2.js
 * Author: Lym
 * Created Date: 2017/3/23.
 * Function:
 *
 */

(function ($) {
    var demo2Chart = echarts.init(document.getElementById('demo2Content'));

    demo2Chart.showLoading();
    $.get('../json/demo.json').done(function (data) {
        var dataShadow = [];
        var yMax = 400;
        for (var i = 0; i < data.xCategories.length; i++) {
            dataShadow.push(yMax);
        }

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
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value} 件'
                    }
                }
            ],
            series: [
                {
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    barGap: '-100%',
                    barCategoryGap: '40%',
                    data: dataShadow,
                    animation: false
                },
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
        demo2Chart.hideLoading();
        demo2Chart.setOption(opinion);
    });
})(jQuery);