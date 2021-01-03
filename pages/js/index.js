async function getOverviewData() {
    let casesCurrent;
    let deathsCurrent;
    let casesCompare;
    let deathsCompare;
    currentData = await awaitToGetJson(JSON_URL + "current.json");
    deathsCurrent = currentData["deaths"];
    casesCurrent = currentData["cases"];
    $("#deaths-current").html(addComma(deathsCurrent));
    $("#cases-current").html(addComma(casesCurrent));
    $("#date-current").html(currentData["lastUpdate"]);

    dataWithin7days = await awaitToGetJson(JSON_OVERVIEW_URL + "7.json");
    casesCompare = dataWithin7days["casesY"][dataWithin7days["casesY"].length - 1] - dataWithin7days["casesY"][dataWithin7days["casesY"].length - 2];
    deathsCompare = dataWithin7days["deathsY"][dataWithin7days["deathsY"].length - 1] - dataWithin7days["deathsY"][dataWithin7days["deathsY"].length - 2];

    $("#cases-compare").html(addComma(Math.abs(casesCompare))).append(getUpOrDownArror(casesCompare));
    $("#deaths-compare").html(addComma(Math.abs(deathsCompare))).append(getUpOrDownArror(deathsCompare));
    // $.getJSON(JSON_URL + "current.json", function (currentData) {
    //     casesCurrent = currentData["cases"];
    //     deathsCurrent = currentData["deaths"];
    //
    //     $("#cases-current").html(addComma(casesCurrent));
    //     $("#deaths-current").html(addComma(deathsCurrent));
    //
    //     $("#date-current").html(currentData["lastUpdate"]);
    // });
    // $.getJSON(JSON_OVERVIEW_URL + "7.json", function (dataWithin7days) {
    //     casesCompare = dataWithin7days["casesY"][dataWithin7days["casesY"].length - 1] - dataWithin7days["casesY"][dataWithin7days["casesY"].length - 2];
    //     deathsCompare = dataWithin7days["deathsY"][dataWithin7days["deathsY"].length - 1] - dataWithin7days["deathsY"][dataWithin7days["deathsY"].length - 2];
    //
    //     $("#cases-compare").html(addComma(Math.abs(casesCompare))).append(getUpOrDownArror(casesCompare));
    //     $("#deaths-compare").html(addComma(Math.abs(deathsCompare))).append(getUpOrDownArror(deathsCompare));
    //
    //
    // });
}

async function parseOverviewLineChart(containerId, timeScale) {
    let dataForChart;
    dataForChart = await awaitToGetJson(JSON_OVERVIEW_URL + timeScale + ".json");
    parseLineChart(containerId, "COVID-19 CASES & DEATHS OVERVIEW GRAPH", dataForChart["dayX"], dataForChart["casesY"], dataForChart["deathsY"]);
}
