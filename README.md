# Covid 19 Visualization in US

> Project Link => [www.wearamask.ml](https://www.wearamask.ml/)

## How this works

+ Thanks to [@nytimes](https://github.com/nytimes), this project is using its [covid-19-data](https://github.com/nytimes/covid-19-data) as submodule for data update.

+ Data is fetched at every build time.

+ Using `python` `pandas` to build structured JSON data and pushed to `gh-pages` branch to serve at `Pages`.

## Github Actions - Automation

+ Action will be set as a automation build every morning.

## Goals

- [x] Configure `Github Actions` and build to `gh-pages` branch.

- [x] CNAME for this project.

- [ ] Re-write the project data processing part by using `sqlite3`, prepare for changing fetched data format and handling complex queries.

- [ ] Rewrtie the frontend part using `React` or any other `nodejs` frontend framework.

## WEAR A MASK, PLZ.

