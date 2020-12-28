async function fillListingTables() {

    let stateListingData = await awaitToGetJson(JSON_TOPS_URL + "states10.json");
    let countyListingData = await awaitToGetJson(JSON_TOPS_URL + "counties10.json");

    for (let listingIdx = 0; listingIdx < 10; listingIdx++) {
        $("#state-cases-tb > tbody:last-child").append(
            buildListingRow(listingIdx + 1,
                stateListingData["topcases"]["x"][listingIdx],
                stateListingData["topcases"]["y"][listingIdx])
        );
        $("#county-cases-tb > tbody:last-child").append(
            buildListingRow(listingIdx + 1,
                countyListingData["topcases"]["x"][listingIdx],
                countyListingData["topcases"]["y"][listingIdx])
        );
        $("#state-deaths-tb > tbody:last-child").append(
            buildListingRow(listingIdx + 1,
                stateListingData["topdeaths"]["x"][listingIdx],
                stateListingData["topdeaths"]["y"][listingIdx])
        );
        $("#county-deaths-tb > tbody:last-child").append(
            buildListingRow(listingIdx + 1,
                countyListingData["topdeaths"]["x"][listingIdx],
                countyListingData["topdeaths"]["y"][listingIdx])
        );
    }

}