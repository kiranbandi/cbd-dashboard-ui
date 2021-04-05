import React, { Component } from 'react';

export function customBackground(dataPoint) {
    if (dataPoint.isActiveProgram) {
        return <rect key={dataPoint.key}
            fill='#ccc'
            x={dataPoint.x} y={dataPoint.y}
            width={dataPoint.width} height={dataPoint.height} >
        </rect>
    }
}

export function customBackgroundBorder(dataPoint) {
    if (dataPoint.isActiveProgram) {
        return <rect key={dataPoint.key}
            stroke='#ccc'
            fill='none'
            strokeWidth='4px'
            x={dataPoint.x} y={dataPoint.y}
            width={dataPoint.width} height={dataPoint.height} >
        </rect>
    }
}