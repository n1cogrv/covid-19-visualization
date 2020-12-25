#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: MijazzChan
# @Date: 2020-12-25, 6:01 PM
import csv
import json
import re

import pandas as pd

UPSTREAM = './covid-19-data/'


def topDataPersistence():
    usTotalCases = 0
    usTotalDeaths = 0
    updatedOn = ''

    statedf = pd.read_csv(UPSTREAM + 'live/us-states.csv')
    countydf = pd.read_csv(UPSTREAM + 'live/us-counties.csv')

    # Full US Persistence
    with open(UPSTREAM + 'live/us.csv', 'r') as f:
        for c in csv.reader(f):
            if len(c) < 2:
                continue
            if re.match('\d{4}-\d{1,2}-\d{1,2}', c[0]):
                updatedOn = c[0]
                usDeaths = int(c[1])
                updatedOn = int(c[2])

    # Top 10 States
    casesDFTmp = statedf[['state', 'cases']].sort_values('cases', ascending=False)[:10]
    usTop10StateCasesX = casesDFTmp['state'].tolist()
    usTop10StateCasesY = casesDFTmp['cases'].tolist()
    deathsDFTmp = statedf[['state', 'deaths']].sort_values('deaths', ascending=True)[:10]
    usTop10StateDeathsX = deathsDFTmp['state'].tolist()
    usTop10StateDeathsY = deathsDFTmp['deaths'].tolist()

    # Top 10 County
    casesDFTmp = countydf[['county', 'cases']].sort_values('cases', ascending=False)[:10]
    usTop10CountyCasesX = casesDFTmp['county'].tolist()
    usTop10CountyCasesY = casesDFTmp['cases'].tolist()
    deathsDFTmp = countydf[['county', 'deaths']].sort_values('deaths', ascending=True)[:10]
    usTop10CountyDeathsX = deathsDFTmp['county'].tolist()
    usTop10CountyDeathsY = deathsDFTmp['deaths'].tolist()

    top10data = {
        'states': {
            'top10cases': {
                'x': usTop10StateCasesX,
                'y': usTop10StateCasesY
            },
            'top10deaths': {
                'x': usTop10StateDeathsX,
                'y': usTop10StateDeathsY
            }
        },
        'counties': {
            'top10cases': {
                'x': usTop10CountyCasesX,
                'y': usTop10CountyCasesY
            },
            'top10deaths': {
                'x': usTop10CountyDeathsX,
                'y': usTop10CountyDeathsY
            }
        }
    }

    totalData = {
        'cases': usTotalCases,
        'deaths': usTotalDeaths,
        'lastUpdate': updatedOn
    }

    with open('./generatedjson/top10/overview.json', 'w', encoding='utf-8') as f:
        json.dump(top10data, f, indent=4)
    with open('./generatedjson/overview.json', 'w', encoding='utf-8') as f:
        json.dump(totalData, f, indent=4)


if __name__ == '__main__':
    topDataPersistence()