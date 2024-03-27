var CURRENT_FOCUS_STATE_NAME;
var CURRENT_FOCUS_STATE_FIPS;

function promptState() {
    $("#state-select-modal").modal();
}

async function checkParamAndPrompt(force) {
    const queryString = window.location.search;
    const qObj = new URLSearchParams(queryString);
    stateToFips = await awaitToGetJson("state-to-fips.json");
    var stateNameNotFound = stateToFips[qObj.get('state')] === undefined;
    if (force) {
        stateNameNotFound = true;
    }
    if (qObj.has('state') && !stateNameNotFound) {
        CURRENT_FOCUS_STATE_NAME = qObj.get('state');
        CURRENT_FOCUS_STATE_FIPS = stateToFips[qObj.get('state')];
        await parseStateViewData();
        await parseStateOverviewChart("container1", 30);
        await fillStateWiseCountyTable();

    } else {
        let statesList = $("#states-list");
        for (let stateName in stateToFips) {
            statesList.append(buildStateAHrefEntry(stateToFips[stateName], stateName));
        }
        promptState();

    }
}


//TODO: Fix Code Reuse Here!!!
async function parseStateViewData() {
    if (CURRENT_FOCUS_STATE_FIPS.toString().length < 2) {
        window.location.replace("./index.html");
    }

    let casesCurrent;
    let deathsCurrent;
    let casesCompare;
    let deathsCompare;
    dataWithin7days = await awaitToGetJson(JSON_STATEWISE_URL + CURRENT_FOCUS_STATE_FIPS + "/7.json");
    casesCurrent = dataWithin7days["casesY"][dataWithin7days["casesY"].length - 1];
    deathsCurrent = dataWithin7days["deathsY"][dataWithin7days["deathsY"].length - 1];
    $("#deaths-current").html(addComma(deathsCurrent));
    $("#cases-current").html(addComma(casesCurrent));
    $("#current-header").html("Covid-19 Overview in " + CURRENT_FOCUS_STATE_NAME).append(getChangeBtn());
    $("#date-current").html(dataWithin7days["dayX"][dataWithin7days["dayX"].length - 1]);
    casesCompare = casesCurrent - dataWithin7days["casesY"][dataWithin7days["casesY"].length - 2];
    deathsCompare = deathsCurrent - dataWithin7days["deathsY"][dataWithin7days["deathsY"].length - 2];

    $("#cases-compare").html(addComma(Math.abs(casesCompare))).append(getUpOrDownArror(casesCompare));
    $("#deaths-compare").html(addComma(Math.abs(deathsCompare))).append(getUpOrDownArror(deathsCompare));
}

async function parseStateOverviewChart(containerId, timeScale) {
    let dataForChart;
    dataForChart = await awaitToGetJson(JSON_STATEWISE_URL + CURRENT_FOCUS_STATE_FIPS + "/" + timeScale + ".json");
    parseLineChart(containerId, "COVID-19 CASES & DEATHS IN " + CURRENT_FOCUS_STATE_NAME, dataForChart["dayX"], dataForChart["casesY"], dataForChart["deathsY"]);
}

async function fillStateWiseCountyTable() {
    let countiesData = await awaitToGetJson(JSON_STATEWISE_URL + CURRENT_FOCUS_STATE_FIPS + "/" + "counties-under.json");
    let tmp = $("#state-wise-tb > tbody:last-child");
    for (let idx = 0; idx < countiesData["countyX"].length; idx++) {
        tmp.append(
            buildStateWiseListingRow(
                idx + 1,
                countiesData["countyX"][idx],
                countiesData["casesY"][idx],
                countiesData["deathsY"][idx]
            )
        );
    }
}