async function fillListingTables() {

    let stateListingData = await awaitToGetJson(JSON_TOPS_URL + "states10.json");
    let countyListingData = await awaitToGetJson(JSON_TOPS_URL + "counties10.json");
    // Reduce Selector Query Time
    let tmp1 = $("#state-cases-tb > tbody:last-child");
    let tmp2 = $("#county-cases-tb > tbody:last-child");
    let tmp3 = $("#state-deaths-tb > tbody:last-child");
    let tmp4 = $("#county-deaths-tb > tbody:last-child");


    for (let listingIdx = 0; listingIdx < 10; listingIdx++) {
        tmp1.append(
            buildListingRow(listingIdx + 1,
                stateListingData["topcases"]["x"][listingIdx],
                stateListingData["topcases"]["y"][listingIdx])
        );
        tmp2.append(
            buildListingRow(listingIdx + 1,
                countyListingData["topcases"]["x"][listingIdx],
                countyListingData["topcases"]["y"][listingIdx])
        );
        tmp3.append(
            buildListingRow(listingIdx + 1,
                stateListingData["topdeaths"]["x"][listingIdx],
                stateListingData["topdeaths"]["y"][listingIdx])
        );
        tmp4.append(
            buildListingRow(listingIdx + 1,
                countyListingData["topdeaths"]["x"][listingIdx],
                countyListingData["topdeaths"]["y"][listingIdx])
        );
    }

}