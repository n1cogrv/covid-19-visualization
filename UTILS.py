#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: MijazzChan
# @Date: 2020-12-25, 9:20 PM

import json
import os
import pandas as pd
import numpy as np

selector = {'liveus': {
    'date': str,
    'cases': pd.Int64Dtype(),
    'deaths': pd.Int64Dtype(),
    'confirmed_cases': pd.Int64Dtype(),
    'confirmed_deaths': pd.Int64Dtype(),
    'probable_cases': pd.Int64Dtype(),
    'probable_deaths': pd.Int64Dtype()
}, 'liveusstate': {
    'state': str,
    'fips': str,
    'date': str,
    'cases': pd.Int64Dtype(),
    'deaths': pd.Int64Dtype(),
    'confirmed_cases': pd.Int64Dtype(),
    'confirmed_deaths': pd.Int64Dtype(),
    'probable_cases': pd.Int64Dtype(),
    'probable_deaths': pd.Int64Dtype()
}, 'liveuscounty': {
    'state': str,
    'fips': str,
    'date': str,
    'county': str,
    'cases': pd.Int64Dtype(),
    'deaths': pd.Int64Dtype(),
    'confirmed_cases': pd.Int64Dtype(),
    'confirmed_deaths': pd.Int64Dtype(),
    'probable_cases': pd.Int64Dtype(),
    'probable_deaths': pd.Int64Dtype()
}, 'us': {
    'date': str,
    'cases': pd.Int64Dtype(),
    'deaths': pd.Int64Dtype()
}, 'usstate': {
    'date': str,
    'cases': pd.Int64Dtype(),
    'deaths': pd.Int64Dtype(),
    'state': str,
    'fips': str
}, 'uscounty': {
    'date': str,
    'cases': pd.Int64Dtype(),
    'deaths': pd.Int64Dtype(),
    'state': str,
    'fips': str,
    'county': str
}
}


def toJsonFile(dataObj, filePath: str, fileName: str):
    if not os.path.exists(filePath):
        os.makedirs(filePath)
    with open(filePath + fileName, 'w', encoding='utf-8') as f:
        json.dump(dataObj, f, indent=4)


def datetime64ToStr(dateSeries: list, unit: str = 'D') -> list:
    for i in range(len(dateSeries)):
        dateSeries[i] = np.datetime_as_string(dateSeries[i], unit=unit)
    dateSeries.sort()
    return dateSeries


def dtypeDictOnRead(typeOfDataFrame: str) -> dict:
    global selector
    return selector[typeOfDataFrame]
