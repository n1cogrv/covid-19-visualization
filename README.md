# Covid-19 Visualization in US

US Covid-19 Data Panel/Overview

## How this works

+ Thanks to [@nytimes](https://github.com/nytimes), this project is using its [covid-19-data](https://github.com/nytimes/covid-19-data) as submodule for data update.

+ Data is fetched at every build time.

+ Using `python` `pandas` to build structured JSON data and pushed to `gh-pages` branch to serve at `Pages`.

## Github Actions - Automation

+ Action will be set as a automation build every morning.

## Version History

### v1.0

+ Initial Release of Covid-19-Visualization.

+ `Github Actions` is introduced to automatically and periodically build the site.

### v1.1

+ `moment.js` is introduced in `about` page.

+ `about` page updated.

### v1.2

+ `sitemap.xml` generation procedure integrated into Github Actions.

### v2.0

+ Major Change in site ui.

+ NightMode is now supported on all pages.

+ Auto detect device theme to switch page theme.

### v2.1

+ Domain update to [wear-a-mask.jasonchen.icu](https://wear-a-mask.jasonchen.icu)

+ Submodule dependency removed, clone 1 depth of original submodule project in each Github Action build.



