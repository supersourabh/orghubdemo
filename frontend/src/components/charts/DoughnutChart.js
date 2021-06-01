import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export default function DoughnutChart() {

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
                data: [3, 5, 7, 1, 9, 8, 3, 1, 4, 6, 5, 2],
                backgroundColor: [
                    'rgba(145, 61, 136, .6)',
                    'rgba(246, 36, 89, .6)',
                    'hsla(137, 100%, 45%,.6)',
                    'hsla(173, 46%, 59%,.6)',
                    'rgba(148, 124, 176, .6)',
                    'rgba(240, 255, 0, .6)',
                    'rgba(249, 105, 14, .6)',
                    'rgba(171, 183, 183, .6)',
                    'rgba(34, 167, 240, .6)',
                    'rgba(171, 183, 183, .6)',
                    'rgba(115, 101, 152, .6)'
                ],
                pointBackgroundColor: 'rgba(20,200,60,.7)',
                ppointBorderColor: 'rgba(241, 231, 254, 1)',

            }
            
        ]
    }

    const options = {
        title: {
            display: true,
            text: 'Doughnut Chart'
        }
    }

    return (
        <div>
            <Doughnut data={data} options={options} />
        </div>
    )
}
