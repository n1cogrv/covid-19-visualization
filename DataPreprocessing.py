#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: MijazzChan
# @Date: 2020-12-25, 2:47 PM
import csv
import re

import UTILS
import pandas as pd
import numpy as np

UPSTREAM = './covid-19-data/'
# For Better Type Hint
usFull = pd.DataFrame()
usState = pd.DataFrame()
usCounty = pd.DataFrame()
usLiveState = pd.DataFrame()
usLiveCounty = pd.DataFrame()


def prepareUSData():
    """
    Read all United State Covid-19 Data into memory.
    Access global variable to turn each into DataFrame.
    """
    global usFull, usState, usCounty, usLiveState, usLiveCounty
    unusedColumn = ['confirmed_cases','confirmed_deaths','probable_cases','probable_deaths']
    dataFrames =[usFull, usState, usCounty, usLiveState, usLiveCounty]
    usFull = pd.read_csv(UPSTREAM + 'us.csv', dtype={'fips': str})
    usState = pd.read_csv(UPSTREAM + 'us-states.csv', dtype={'fips': str})
    usCounty = pd.read_csv(UPSTREAM + 'us-counties.csv', dtype={'fips': str})
    usLiveState = pd.read_csv(UPSTREAM + 'live/us-states.csv', dtype={'fips': str})
    usLiveCounty = pd.read_csv(UPSTREAM + 'live/us-counties.csv', dtype={'fips': str})
    usCounty = usCounty[usCounty['fips'].notna()]
    usLiveCounty = usLiveCounty[usLiveCounty['fips'].notna()]
    for df in (usFull, usState, usCounty):
        df['dateIndex'] = pd.to_datetime(df['date'], format='%Y-%m-%d')
        df.set_index(pd.DatetimeIndex(df['dateIndex']), inplace=True)


def gainDataWithinGivenDays(df: pd.DataFrame, delta: int = 30) -> pd.DataFrame:
    if type(df.index) is not pd.DatetimeIndex:
        raise Exception('Index Must be set to DateTimeIndex')

    df.sort_index(inplace=True)
    lastUpdatedOn = df.index.max()
    return df.loc[lastUpdatedOn - pd.Timedelta(days=delta): lastUpdatedOn]


def getCasesOrDeathsSeries(df: pd.DataFrame, identifiedCol: str, casesOrDeaths: str = 'cases'):
    identifiers = df[identifiedCol].unique()  # Array of States/County/Fips
    if len(identifiers) < 2:
        raise Exception('Check Identified Column for unique')
    seriesX = np.array(identifiers).astype(str).tolist()
    seriesY = []
    if casesOrDeaths == 'both':
        seriesY = {'cases': [], 'deaths': []}
        for identifier in identifiers:
            seriesY['cases'].append(df[df[identifiedCol] == identifier]['cases'].fillna(0).astype(int).tolist())
            seriesY['deaths'].append(df[df[identifiedCol] == identifier]['deaths'].fillna(0).astype(int).tolist())
    else:
        for identifier in identifiers:
            seriesY.append(df[df[identifiedCol] == identifier][casesOrDeaths].fillna(0).tolist())

    return seriesX, seriesY


def topDataPersistence():
    usTotalCases = 0
    usTotalDeaths = 0
    updatedOn = ''

    # Full US Persistence
    with open(UPSTREAM + 'live/us.csv', 'r') as f:
        for c in csv.reader(f):
            if re.match('\d{4}-\d{1,2}-\d{1,2}', c[0]):
                usTotalCases = int(c[1])
                usTotalDeaths = int(c[2])
                updatedOn = c[0]

    # Top States
    casesDFTmp = usLiveState[['state', 'cases']].sort_values('cases', ascending=False)
    casesDFTmp.fillna(value=0, inplace=True)
    usTopStateCasesX = casesDFTmp['state'].tolist()
    usTopStateCasesY = casesDFTmp['cases'].tolist()
    deathsDFTmp = usLiveState[['state', 'deaths']].sort_values('deaths', ascending=False)
    deathsDFTmp.fillna(value=0, inplace=True)
    usTopStateDeathsX = deathsDFTmp['state'].tolist()
    usTopStateDeathsY = deathsDFTmp['deaths'].tolist()

    # Top County
    casesDFTmp = usLiveCounty[['county', 'state', 'cases']].sort_values('cases', ascending=False)
    casesDFTmp.fillna(value=0, inplace=True)
    usTopCountyCasesX = casesDFTmp[['county', 'state']].agg(' - '.join, axis=1).tolist()
    usTopCountyCasesY = casesDFTmp['cases'].tolist()
    deathsDFTmp = usLiveCounty[['county', 'state', 'deaths']].sort_values('deaths', ascending=False)
    deathsDFTmp.fillna(value=0, inplace=True)
    usTopCountyDeathsX = deathsDFTmp[['county', 'state']].agg(' - '.join, axis=1).tolist()
    usTopCountyDeathsY = deathsDFTmp['deaths'].tolist()

    topStateData = {
        'topcases': {
            'x': usTopStateCasesX,
            'y': usTopStateCasesY
        },
        'topdeaths': {
            'x': usTopStateDeathsX,
            'y': usTopStateDeathsY
        }
    }
    top10StateData = {
        'topcases': {
            'x': usTopStateCasesX[:10],
            'y': usTopStateCasesY[:10]
        },
        'topdeaths': {
            'x': usTopStateDeathsX[:10],
            'y': usTopStateDeathsY[:10]
        }
    }
    topCountyData = {
        'topcases': {
            'x': usTopCountyCasesX,
            'y': usTopCountyCasesY
        },
        'topdeaths': {
            'x': usTopCountyDeathsX,
            'y': usTopCountyDeathsY
        }
    }
    top10CountyData = {
        'topcases': {
            'x': usTopCountyCasesX[:10],
            'y': usTopCountyCasesY[:10]
        },
        'topdeaths': {
            'x': usTopCountyDeathsX[:10],
            'y': usTopCountyDeathsY[:10]
        }
    }

    totalData = {
        'cases': usTotalCases,
        'deaths': usTotalDeaths,
        'lastUpdate': updatedOn
    }

    UTILS.toJsonFile(topStateData, './pages/json/tops/', 'states.json')
    UTILS.toJsonFile(topCountyData, './pages/json/tops/', 'counties.json')
    UTILS.toJsonFile(top10StateData, './pages/json/tops/', 'states10.json')
    UTILS.toJsonFile(top10CountyData, './pages/json/tops/', 'counties10.json')
    UTILS.toJsonFile(totalData, './pages/json/', 'current.json')


def countyGroupByStatePersistence():
    stateWisePath = './pages/json/statewise/'
    statesUnique = usLiveCounty['state'].unique()
    tmpData = {}
    for state in statesUnique:
        tmpFrame = usLiveCounty[usLiveCounty['state'] == state].fillna(value=0)
        tmpData['countyX'] = tmpFrame['county'].tolist()
        tmpData['casesY'] = tmpFrame['cases'].astype(int).tolist()
        tmpData['deathsY'] = tmpFrame['deaths'].astype(int).tolist()
        statefips = str(tmpFrame['fips'].iloc[0])[:2]
        UTILS.toJsonFile(tmpData, '{}{}/'.format(stateWisePath, statefips), 'counties-under.json')


def lineDataPersistence():
    stateWisePath = './pages/json/statewise/'
    overviewPath = './pages/json/overview/'
    timeSplit = [7, 30, 365]
    for timeScale in timeSplit:
        fullDataWithinScale = gainDataWithinGivenDays(usFull, timeScale)
        dateSeries = list(np.array(fullDataWithinScale.index.unique()))
        dateSeries = UTILS.datetime64ToStr(dateSeries)
        tmpData = {}
        tmpData['dayX'] = dateSeries
        tmpData['casesY'] = fullDataWithinScale['cases'].tolist()
        tmpData['deathsY'] = fullDataWithinScale['deaths'].tolist()
        UTILS.toJsonFile(tmpData, overviewPath, '{}.json'.format(timeScale))

    for timeScale in timeSplit:
        stateDataWithinScale = gainDataWithinGivenDays(usState, timeScale)
        dateSeries = list(np.array(stateDataWithinScale.index.unique()))
        dateSeries = UTILS.datetime64ToStr(dateSeries)
        stateX, stateY = getCasesOrDeathsSeries(stateDataWithinScale, identifiedCol='fips', casesOrDeaths='both')
        if len(stateX) != len(stateY['cases']) or len(stateX) != len(stateY['deaths']):
            raise Exception('Index Must Match')
        for i in range(len(stateX)):
            tmpData = {}
            tmpData['dayX'] = dateSeries
            tmpData['casesY'] = stateY['cases'][i]
            tmpData['deathsY'] = stateY['deaths'][i]
            UTILS.toJsonFile(tmpData, '{}{}/'.format(stateWisePath, stateX[i]), '{}.json'.format(timeScale))


def mapDataPersistence():
    mapDataPath = './pages/json/mapdata/'
    tmp = [usLiveState, usLiveCounty]
    for idx in range(len(tmp)):
        df = tmp[idx]
        fipsX, seriesY = getCasesOrDeathsSeries(df, 'fips', 'both')
        if len(fipsX) != len(seriesY['cases']) or len(fipsX) != len(seriesY['deaths']):
            raise Exception('Index Must Match')
        tmpCaseData = []
        tmpDeathsData = []
        for i in range(len(fipsX)):
            tmpCaseEntry = {}
            tmpDeathEntry = {}
            tmpCaseEntry['fipsCode'] = fipsX[i]
            tmpDeathEntry['fipsCode'] = fipsX[i]
            tmpCaseEntry['value'] = seriesY['cases'][i][0]
            tmpDeathEntry['value'] = seriesY['deaths'][i][0]
            tmpCaseData.append(tmpCaseEntry)
            tmpDeathsData.append(tmpDeathEntry)
        if idx == 0:
            UTILS.toJsonFile(tmpCaseData, mapDataPath, 'states-cases.json')
            UTILS.toJsonFile(tmpDeathsData, mapDataPath, 'states-deaths.json')
        else:
            UTILS.toJsonFile(tmpCaseData, mapDataPath, 'counties-cases.json')
            UTILS.toJsonFile(tmpDeathsData, mapDataPath, 'counties-deaths.json')

if __name__ == '__main__':
    prepareUSData()
    # # df = gainDataWithinGivenDays(usState, 30)
    topDataPersistence()
    lineDataPersistence()
    mapDataPersistence()
    countyGroupByStatePersistence()