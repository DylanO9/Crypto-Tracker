/* eslint-disable react/prop-types */
import {Chart as ChartJS} from 'chart.js/auto';
import React from "react";
import { Line } from "react-chartjs-2";

function Graph({ chartData }) {
    const options = {
        pointRadius: 0,
        borderWidth: 2,
        responsive: true,
        maintainAspectRatio: false,
    };
    return (
        <div className='graph-data'>
            <Line data={chartData} options={options}> </Line>
        </div>
    )
}

export default Graph;