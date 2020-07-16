import React, { Component } from 'react'

// ChartJS
import { Bar } from 'react-chartjs-2'

export default class ResultsChart extends Component {



    render() {
        const { results, userId } = this.props;

        let labels = [];
        let labelsMap = new Map();
        let userPoints = -1;

        results.forEach(result => {
            if (result.userId === userId) 
                userPoints = Math.max(userPoints, result.points);
            if (!labelsMap.get(result.points)) {
                labelsMap.set(result.points, 1);
                labels.push(result.points);
            } else {
                let el = labelsMap.get(result.points);
                labelsMap.set(result.points, el + 1);
            }
        })

        labels.sort();

        let barColor = 'rgba(0, 0, 0, .05)';
        let borderColor = 'rgba(0, 0, 0, .3)';
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            barColor = 'rgba(255, 255, 255, .05)';
            borderColor = 'rgba(255, 255, 255, 1)';
        } 

        let pointsData = [];
        let barColors = [];
        console.log(userPoints)
        labels.forEach(label => {
            let points = labelsMap.get(label);
            pointsData.push(points);
            console.log(label)
            if (+label === userPoints) {
                barColors.push('rgba(42, 150, 71, .2)'); 
                console.log('object')
            }
            else 
            barColors.push(barColor);
        })

        const options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function(value) {if (value % 1 === 0) {return value;}}
                    }
                }]
            },
            legend: {
                display: false
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
                        backgroundColor: barColors,
                        borderColor: borderColor,
                        maxBarThickness: 60,
                        borderWidth: 1,
                    },
                ],
            }
        }        

        return (
            <div className="chart-container">
                <Bar data={ data } options={ options } />
            </div>
        )
    }
}
