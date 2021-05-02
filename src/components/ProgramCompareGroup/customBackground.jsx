import React, { Component } from 'react';

export function customBackground(dataPoint) {
    if (dataPoint.isActiveProgram) {
        return <rect key={dataPoint.key}
            fill='#a09c9c'
            x={dataPoint.x} y={dataPoint.y}
            width={dataPoint.width} height={dataPoint.height} >
        </rect>
    }
}

export function customBackgroundBorder(dataPoint) {
    if (dataPoint.isActiveProgram) {
        return <rect key={dataPoint.key}
            stroke='#6f6f6f'
            fill='none'
            strokeWidth='7.5px'
            x={dataPoint.x} y={dataPoint.y}
            width={dataPoint.width} height={dataPoint.height} >
        </rect>
    }
}