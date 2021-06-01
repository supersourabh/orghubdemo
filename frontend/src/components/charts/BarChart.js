import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function BarChart() {

    const data = {
        labels: [
            'jan',
            'feb',
            'mar',
            'apr',
            'may',
            'June',
            'July',
            'Aug',
            'Sept',
            'Oct',
            'Nov',
            'Dec'
        ],
        datasets: [
            {
                label: 'ORDERS IN 2021( M )',
                data: [3, 5, 7, 1, 9, 8, 3, 1, 4, 6, 5, 2],
                backgroundColor: [
                    'rgba(220,200,60,.7)',
                    'rgba(220,200,60,.7)',
                    'rgba(220,200,60,.7)',
                    'rgba(220,200,60,.7)',
                    'rgba(220,200,60,.7)',
                    'rgba(220,200,60,.7)',
                    'rgba(220,200,60,.7)',
                    'rgba(220,200,60,.7)',
                    'rgba(220,200,60,.7)',
                    'rgba(220,200,60,.7)',
                    'rgba(220,200,60,.7)',
                    'rgba(220,200,60,.7)',
                ],
                borderColor: [
                    ' rgba(20,200,280,.4)',
                    ' rgba(20,200,280,.4)',
                    ' rgba(20,200,280,.4)',
                    ' rgba(20,200,280,.4)',
                    ' rgba(20,200,280,.4)',
                    ' rgba(20,200,280,.4)',
                    ' rgba(20,200,280,.4)',
                    ' rgba(20,200,280,.4)',
                    ' rgba(20,200,280,.4)',
                    ' rgba(20,200,280,.4)',
                    ' rgba(20,200,280,.4)',
                    ' rgba(20,200,280,.4)',
                ],
                pointBackgroundColor: 'rgba(20,200,60,.7)',
                ppointBorderColor: 'rgba(200,200,280,.4)',

            },
            {
                label: 'ORSERS IN 2020( M )',
                data: [1, 6, 10, 2, 5, 8, 7, 4, 6, 9, 6, 9],
                backgroundColor: [
                    'rgba(22,0,220,.3)',
                    'rgba(22,0,220,.3)',
                    'rgba(22,0,220,.3)',
                    'rgba(22,0,220,.3)',
                    'rgba(22,0,220,.3)',
                    'rgba(22,0,220,.3)',
                    'rgba(22,0,220,.3)',
                    'rgba(22,0,220,.3)',
                    'rgba(22,0,220,.3)',
                    'rgba(22,0,220,.3)',
                    'rgba(22,0,220,.3)',
                    'rgba(22,0,220,.3)',
                ],
                borderColor: [
                    ' rgba(200,20,280,.6)',
                    ' rgba(200,20,280,.6)',
                    ' rgba(200,20,280,.6)',
                    ' rgba(200,20,280,.6)',
                    ' rgba(200,20,280,.6)',
                    ' rgba(200,20,280,.6)',
                    ' rgba(200,20,280,.6)',
                    ' rgba(200,20,280,.6)',
                    ' rgba(200,20,280,.6)',
                    ' rgba(200,20,280,.6)',
                    ' rgba(200,20,280,.6)',
                    ' rgba(200,20,280,.6)',
                ],
            }
        ]
    }

    const options = {
        title: {
            display: true,
            text: 'Bar Chart'
        },
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 15,
                    stepSize: 1
                }
            }]
        }
    }

    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    )
}
