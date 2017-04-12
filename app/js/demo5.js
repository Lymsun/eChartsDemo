/**
 *
 * File: demo5.js
 * Author: Lym
 * Created Date: 2017/3/23.
 * Function:
 *
 */

(function ($) {
    function splitData(rawData) {
        var specificData = [];
        for (var i = 0; i < rawData.length; i++) {
            if (rawData[i].Ticker == 'ABC') {
                specificData.push(rawData[i]);
            }
        }

        var categoryData = [];
        var values = [];
        var volumes = [];

        for (var j = 0; j < specificData.length; j++ ) {
            var dateString = specificData[j].Date;
            var pattern = /(\d{4})(\d{2})(\d{2})/;
            var newDateString = dateString.replace(pattern, '$1/$2/$3');
            categoryData.push(newDateString);
            values.push([specificData[j].Open, specificData[j].Close, specificData[j].Low, specificData[j].High]);
            volumes.push(specificData[j].Volume);
        }

        return{
            categoryData: categoryData,
            values: values,
            volumes: volumes
        }
    }

    function calculateMA(dayCount, data) {
        var result = [];
        for (var i = 0; i < data.values.length; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
                sum = sum + parseFloat(data.values[i-j][1]);
            }
            result.push((sum/dayCount).toFixed(3));
        }
        return result;
    }

    var demo5Chart = echarts.init(document.getElementById('demo5Content'));
    demo5Chart.showLoading();

    $.get('../json/stock.json').done(function (stockData) {
        var stock = splitData(stockData);

        var opinion = {
            title: {
                text: 'ABC Company Candlestick Chart',
                x: 'left'
            },
            legend: {
                bottom: 10,
                left: 'center',
                data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30']
            },
            tooltip: {
                trigger: 'axis'
            },
            axisPointer: {
                link: {xAxisIndex: 'all'},
                label: {
                    backgroundColor: '#777'
                }
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: false
                    },
                    brush: {
                        type: ['lineX', 'clear']
                    }
                }
            },
            brush: {
                xAxisIndex: 'all',
                brushLink: 'all',
                outOfBrush: {
                    colorAlpha: 0.1
                }
            },
            grid: [
                {
                    left: '10%',
                    right: '8%',
                    height: '50%'
                },
                {
                    left: '10%',
                    right: '8%',
                    top: '63%',
                    height: '16%'
                }
            ],
            xAxis: [
                {
                    type: 'category',
                    data: stock.categoryData,
                    scale: true,
                    boundaryGap : false,
                    axisLine: {onZero: false},
                    splitLine: {show: false},
                    splitNumber: 20,
                    min: 'dataMin',
                    max: 'dataMax',
                    axisPointer: {
                        z: 100
                    }
                },
                {
                    type: 'category',
                    gridIndex: 1,
                    data: stock.categoryData,
                    scale: true,
                    boundaryGap : false,
                    axisLine: {onZero: false},
                    axisTick: {show: false},
                    splitLine: {show: false},
                    axisLabel: {show: false},
                    splitNumber: 20,
                    min: 'dataMin',
                    max: 'dataMax'
                }
            ],
            yAxis: [
                {
                    scale: true,
                    splitArea: {
                        show: true
                    }
                },
                {
                    scale: true,
                    gridIndex: 1,
                    splitNumber: 2,
                    axisLabel: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: [0, 1],
                    start: 0,
                    end: 30
                },
                {
                    show: true,
                    type: 'slider',
                    xAxisIndex: [0, 1],
                    top: '85%',
                    start: 0,
                    end: 30
                }
            ],
            series: [
                {
                    name: 'Dow-Jones index',
                    type: 'candlestick',
                    data: stock.values
                },
                {
                    name: 'MA5',
                    type: 'line',
                    data: calculateMA(5, stock),
                    smooth: true,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                },
                {
                    name: 'MA10',
                    type: 'line',
                    data: calculateMA(10, stock),
                    smooth: true,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                },
                {
                    name: 'MA20',
                    type: 'line',
                    data: calculateMA(20, stock),
                    smooth: true,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                },
                {
                    name: 'MA30',
                    type: 'line',
                    data: calculateMA(30, stock),
                    smooth: true,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                },
                {
                    name: 'Volume',
                    type: 'bar',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: stock.volumes
                }
            ]
        };

        demo5Chart.hideLoading();
        demo5Chart.setOption(opinion);
    });
})(jQuery);