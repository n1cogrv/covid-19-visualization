const upArrorElement = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"#00ff00\" class=\"bi bi-triangle-fill\" viewBox=\"0 0 20 20\"><path fill-rule=\"evenodd\" d=\"M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z\"/></svg>";
const downArrorElement = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"#ff0000\" class=\"bi bi-triangle-fill\" viewBox=\"0 0 20 20\" ><path fill-rule=\"evenodd\" d=\"M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z\" transform='rotate(180)'/></svg>";
const JSON_URL = "json/";
const JSON_OVERVIEW_URL = "json/overview/";
const JSON_STATEWISE_URL = "json/statewise/";
const JSON_MAPDATA_URL = "json/mapdata/";
const JSON_TOPS_URL = "json/tops/";
function awaitToGetJson(url) {
    return new Promise(((resolve, reject) => {
        $.getJSON(url, dataReceived => {
            resolve(dataReceived);
        })
    }))
}


function addComma(number) {
    return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

function getUpOrDownArror(upOrDown) {
    return upOrDown <= 0 ? downArrorElement : upArrorElement;
}

function buildListingRow(idx, col1, col2) {
    return "<tr><th scope='row'>"+ idx.toString() +"</th><td>" + addComma(col1) +"</td><td>" + addComma(col2) + "</td></tr>"
}

function buildStateWiseListingRow(idx, countyName ,col1, col2) {
    return "<tr><th scope='row'>" + idx.toString() + "</th><td>" + countyName + "</td><td>" + addComma(col1) + "</td><td>" + addComma(col2) + "</td></tr>";
}

function buildStateAHrefEntry(fips, stateName) {
    return "<a class='list-group-item list-group-item-action state-selection' href='?state=" + stateName + "'>" + fips + " - " + stateName + "</a>";
}

function getChangeBtn() {
    return "<button class='btn btn-sm btn-primary' onclick='checkParamAndPrompt(true)'>Change</button>"
}

function getHighChartTheme() {
    let lightTheme =   {
        colors: "#f45b5b #8085e9 #8d4654 #7798BF #aaeeee #ff0066 #eeaaee #55BF3B #DF5353 #7798BF #aaeeee".split(
          " "
        ),
        chart: {
          backgroundColor: "#f8f9fa",
          style: { fontFamily: "'Jetbrains Mono', sans-serif" },
        },
        title: {
          style: { color: "black", fontFamily: "'Jetbrains Mono', sans-serif", fontSize: "24px" },
        },
        subtitle: { style: { color: "black" } },
        tooltip: { borderWidth: 0, style:{fontSize: "16px"} },
        labels: { style: { color: "#6e6e70", fontSize: "18px" } },
        legend: {
          itemStyle: { fontWeight: "bold", fontSize: "18px" },
        },
        xAxis: { labels: { style: { color: "#6e6e70" } } },
        yAxis: { labels: { style: { color: "#6e6e70" } } },
        plotOptions: {
          series: { shadow: !0 },
          candlestick: { lineColor: "#404048" },
          map: { shadow: !1 },
        },
        navigator: { xAxis: { gridLineColor: "#D0D0D8" } },
        rangeSelector: {
          buttonTheme: {
            fill: "white",
            stroke: "#C0C0C8",
            "stroke-width": 1,
            states: { select: { fill: "#D0D0D8" } },
          },
        },
        scrollbar: { trackBorderColor: "#C0C0C8" },
      };


    let darkTheme = {
        colors: "#2b908f #90ee7e #f45b5b #7798BF #aaeeee #ff0066 #eeaaee #55BF3B #DF5353 #7798BF #aaeeee".split(
          " "
        ),
        chart: {
          backgroundColor: "#2b2727",
          style: { fontFamily: "'Jetbrains Mono', sans-serif" },
          plotBorderColor: "#606063",
        },
        title: {
          style: { color: "#E0E0E3",fontFamily: "'Jetbrains Mono', sans-serif", fontSize: "24px" },
        },
        subtitle: { style: { color: "#E0E0E3" } },
        xAxis: {
          gridLineColor: "#707073",
          labels: { style: { color: "#E0E0E3" } },
          lineColor: "#707073",
          minorGridLineColor: "#505053",
          tickColor: "#707073",
          title: { style: { color: "#A0A0A3" } },
        },
        yAxis: {
          gridLineColor: "#707073",
          labels: { style: { color: "#E0E0E3" } },
          lineColor: "#707073",
          minorGridLineColor: "#505053",
          tickColor: "#707073",
          tickWidth: 1,
          title: { style: { color: "#A0A0A3" } },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          style: { color: "#F0F0F0", fontSize: "16px" },
        },
        plotOptions: {
          series: {
            dataLabels: { color: "#F0F0F3", style: { fontSize: "14px" } },
            marker: { lineColor: "#333" },
          },
          boxplot: { fillColor: "#505053" },
          candlestick: { lineColor: "white" },
          errorbar: { color: "white" },
        },
        legend: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          itemStyle: { fontWeight: "bold", fontSize: "18px", color: "#FFF" },
          itemHoverStyle: { color: "#245852" },
          itemHiddenStyle: { color: "#606063" },
          title: { style: { color: "#C0C0C0" } },
        },
        credits: { style: { color: "#666" } },
        labels: { style: { color: "#707073", fontSize: "16px" } },
        drilldown: {
          activeAxisLabelStyle: { color: "#F0F0F3" },
          activeDataLabelStyle: { color: "#F0F0F3" },
        },
        navigation: {
          buttonOptions: {
            symbolStroke: "#DDDDDD",
            theme: { fill: "#505053" },
          },
        },
        rangeSelector: {
          buttonTheme: {
            fill: "#505053",
            stroke: "#000000",
            style: { color: "#CCC" },
            states: {
              hover: {
                fill: "#707073",
                stroke: "#000000",
                style: { color: "white" },
              },
              select: {
                fill: "#000003",
                stroke: "#000000",
                style: { color: "white" },
              },
            },
          },
          inputBoxBorderColor: "#505053",
          inputStyle: { backgroundColor: "#333", color: "silver" },
          labelStyle: { color: "silver" },
        },
        navigator: {
          handles: { backgroundColor: "#666", borderColor: "#AAA" },
          outlineColor: "#CCC",
          maskFill: "rgba(255,255,255,0.1)",
          series: { color: "#7798BF", lineColor: "#A6C7ED" },
          xAxis: { gridLineColor: "#505053" },
        },
        scrollbar: {
          barBackgroundColor: "#808083",
          barBorderColor: "#808083",
          buttonArrowColor: "#CCC",
          buttonBackgroundColor: "#606063",
          buttonBorderColor: "#606063",
          rifleColor: "#FFF",
          trackBackgroundColor: "#404043",
          trackBorderColor: "#404043",
        },
      };

    let darkFlag = (localStorage.getItem("darkSwitch") !== null && localStorage.getItem("darkSwitch") === "dark");
    return darkFlag? darkTheme : lightTheme;

}

function parseLineChart(containerId, graphTitle, dateSeriesX, casesSeriesY, deathsSeriesY) {
    Highcharts.setOptions(getHighChartTheme());
    Highcharts.chart('container1', {
    chart: {
        scrollablePlotArea: {
            scrollPositionX: 1
        },
    }, title: {
        text: graphTitle,
        align: 'center'
    },
    subtitle: {
        text: 'FROM '+dateSeriesX[0]+' TO '+dateSeriesX[dateSeriesX.length - 1]+'.',
        align: 'center'
    },
    xAxis: {
        type: 'datetime',
        labels: {
            overflow: 'justify'
        },
        categories: dateSeriesX
    },
    yAxis: [{
        title: {
            text: 'Cases Reported'
        }
    }, {
        title: {
            text: 'Deaths Reported'
        },
        opposite: true
    }],

    series: [{
        type: 'line',
        data: casesSeriesY,
        name: 'Cases',
        lineWidth: 4,
        yAxis: 0
    }, {
        type: 'line',
        data: deathsSeriesY,
        name: 'Deaths',
        lineWidth: 4,
        yAxis: 1
    }], navigation: {
        menuItemStyle: {
            fontSize: '12px'
        }
    },
});
//     Highcharts.chart(containerId, {
//     chart: {
//         type: 'spline',
//         scrollablePlotArea: {
//             minWidth: 600,
//             minHeight: 600,
//             scrollPositionX: 1
//         },
//     },
//     title: {
//         text: 'COVID-19 CASES&DEATHS OVERVIEW GRAPH',
//         align: 'left'
//     },
//     subtitle: {
//         text: 'START FROM '+dateSeriesX[0]+', TO '+dateSeriesX[dateSeriesX.length - 1]+'.',
//         align: 'left'
//     },
//     xAxis: {
//         type: 'datetime',
//         labels: {
//             overflow: 'justify'
//         }
//     },
//     tooltip: {
//         valueSuffix: ''
//     },
//     plotOptions: {
//         spline: {
//             lineWidth: 4,
//             states: {
//                 hover: {
//                     lineWidth: 6
//                 }
//             },
//             marker: {
//                 enabled: true
//             },
//             pointInterval: 3600000*24, // per day
//             pointStart: Date.parse(dateSeriesX[0])
//         }
//     },
//     series: [{
//         name: 'Cases',
//         x: dateSeriesX,
//         data: casesSeriesY,
//
//     }, {
//         name: 'Deaths',
//         selected: false,
//         x: dateSeriesX,
//         data: deathsSeriesY
//     }],
//     navigation: {
//         menuItemStyle: {
//             fontSize: '12px'
//         }
//     },
// });
}