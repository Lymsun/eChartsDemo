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
        var yMax = 400;

        var opinion = {
            backgroundColor: '#d7e4eb',
            title: {
                text: 'Demo2',
                textStyle: {
                    fontSize: '30'
                },
                left: '40'
            },
            tooltip: {
                trigger: 'axis'
            },
            color: ['#33748a', '#33b6e3'],
            legend: {
                data: ['案件总数', '新增案件数'],
                top: '80',
                left: '40'
            },
            grid: {
                top: '116',
                left: '40'
            },
            xAxis: {
                type: 'category',
                data: data.xCategories,
                axisLine: {
                    lineStyle: {
                        color: '#f0494f',
                        width: '2',
                        type: 'solid'
                    }
                }
            },
            yAxis: [
                {
                    type: 'value',
                    inverse: true,
                    position: 'right',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value} 件'
                    },
                    max: yMax,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#fff',
                            width: '2',
                            type: 'solid'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '案件总数',
                    type: 'bar',
                    barGap: '0',
                    data: data.aData
                },
                {
                    name: '新增案件数',
                    type: 'bar',
                    barGap: '0',
                    data: data.bData
                }
            ]
        };

        demo2Chart.hideLoading();
        demo2Chart.setOption(opinion);
    });
})(jQuery);