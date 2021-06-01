import React from 'react'
import { Line } from 'react-chartjs-2';

export default function LineSellersChart() {
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
                label: 'ORSERS IN 2021( M )',
                data: [1, 3, 6, 4, 4, 3, 1, 5, 6, 5, 3, 4],
                backgroundColor: ['rgba(220,200,60,.7)'],
                borderColor: [' rgba(20,200,280,.4)'],
                pointBackgroundColor: 'rgba(20,200,60,.7)',
                pointBorderColor: 'rgba(200,200,280,.4)',

            },
            {
                label: 'ORSERS IN 2020( M )',
                data: [2, 4, 1, 2, 4, 2, 1, 1, 7, 3, 2, 1],
                backgroundColor: ['rgba(20,200,260,.7)'],
                borderColor: [' rgba(20,200,180,.4)'],
                pointBackgroundColor: 'rgba(100,200,60,.7)',
                pointBorderColor: 'rgba(20,100,280,.4)',
            }
        ]
    }

    const options = {
        title: {
            display: true,
            text: 'Line Chart'
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
            <Line data={data} options={options} />
        </div>
    )
    }