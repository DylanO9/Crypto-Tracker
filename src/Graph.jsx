/* eslint-disable react/prop-types */
import {Chart as ChartJS} from 'chart.js/auto';
import React from "react";
import { Line } from "react-chartjs-2";

function Graph({ chartData }) {
    return (
        <div className='graph-data'>
            <Line data={chartData} />
        </div>
    )
    
}

export default Graph;