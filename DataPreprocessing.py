#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: MijazzChan
# @Date: 2020-12-25, 2:47 PM
import csv
import json
import re

import pandas as pd
import numpy as np

UPSTREAM = './covid-19-data/'
usFull = None
usState = None
usCounty = None


def prepareUSData():
    """
    Read all United State Covid-19 Data into memory.
    Access global variable to turn each into DataFrame.
    """
    global usFull, usState, usCounty
    usFull = pd.read_csv(UPSTREAM + 'us.csv')
    usState = pd.read_csv(UPSTREAM + 'us-states.csv')
    usCounty = pd.read_csv(UPSTREAM + 'us-states.csv')
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
    seriesX = np.array(identifiers).tolist()
    seriesY = []
    for identifier in identifiers:
        seriesY.append(df[df[identifiedCol] == identifier][casesOrDeaths].tolist())

    return seriesX, seriesY





if __name__ == '__main__':
    prepareUSData()
    # df = gainDataWithinGivenDays(usState, 30)
    topDataPersistence()
