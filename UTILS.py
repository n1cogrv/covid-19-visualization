#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: MijazzChan
# @Date: 2020-12-25, 9:20 PM

import json
import os
import numpy as np


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