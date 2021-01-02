async function parseStateOverviewMap() {

    let casesData, deathsData;
    casesData = await awaitToGetJson("json/mapdata/states-cases.json");
    casesData.forEach(function (state) {
        state.fipsCode = "US" + state.fipsCode;
    });
    parseUSMap('container1', 'cases', casesData);
    deathsData = await awaitToGetJson("json/mapdata/states-deaths.json");
    deathsData.forEach(function (state) {
        state.fipsCode = "US" + state.fipsCode;
    });
    parseUSMap('container2', 'deaths', deathsData);

}

