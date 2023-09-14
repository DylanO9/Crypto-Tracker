/* eslint-disable react/prop-types */
import {Chart as ChartJS} from 'chart.js/auto';
import React from "react";
import { Line } from "react-chartjs-2";

function Graph(props) {
    const options = {
        pointRadius: props.point,
        borderWidth: props.border,
        responsive: props.response,
        maintainAspectRatio: props.aspectRatio,
        fill: true,
        scales: {
            x: {
                display: props.dis
            },
            y: {
                display: props.dis
            },
        },
        plugins: {
            legend: {
                display: props.dis
            }
        }
    }
    return (
        <div className='graph-data'>
            <Line data={props.chartData} options={options}> </Line>
        </div>
    )
}

export default Graph;