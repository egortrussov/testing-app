import React, { Component } from 'react'

// ChartJS
import { Bar } from 'react-chartjs-2'

export default class ResultsChart extends Component {



    render() {
        const { results } = this.props;

        let labels = [];
        let labelsMap = new Map();

        results.forEach(result => {
            if (!labelsMap.get(result.points)) {
                labelsMap.set(result.points, 1);
                labels.push(result.points);
            } else {
                let el = labelsMap.get(result.points);
                labelsMap.set(result.points, el + 1);
            }
        })

        labels.sort();

        let pointsData = [];
        labels.forEach(label => {
            pointsData.push(labelsMap.get(label));
        })

        const options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        };

        const data = (canvas) => {
            const ctx = canvas.getContext("2d")
            const gradient = ctx.createLinearGradient(0,0,100,0);
            return {
                labels,
                datasets: [
                    {
                        data: pointsData,
                        fill: false,
                        backgroundColor: 'rgba(255, 255, 255, .05)',
                        borderColor: 'rgb(255, 255, 255)',
                        maxBarThickness: 60,
                        borderWidth: 1,
                    },
                ],
            }
        }        

        return (
            <div>
                <Bar data={ data } options={ options } />
            </div>
        )
    }
}
