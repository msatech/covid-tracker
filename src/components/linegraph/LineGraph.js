import React, { useState, useEffect } from 'react'
import './LineGraph.css'
import { Line } from 'react-chartjs-2';
import { buidChartData } from '../../util';
import numeral from 'numeral';

function LineGraph({caseType}) {

    const [data, setData] = useState({});
    
    const options = {
        legend: {
            display: false,
        },
        elements: {
            point:{
                radius: 0,
            },
        },
        maintainAspectRatio: false,
        tooltips: {
            mode: "index",
            intersects: false,
            callbacks:{
                label: function(tooltipItem, data){
                    return numeral(tooltipItem.value).format("+0,0");
                }
            },
        },
        
        scales:{
            xAxes:[
                {   gridLines: {
                    display: false,
                    },
                    type: "time",
                    time: {
                        format: "MM/DD/YY",
                        tooltipFormat: "ll",
                    },
                    
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    ticks:{
                        callback: function(value, index, values){
                            return numeral(value).format("0a");
                        },
                    },
                },
                
            ],
        },
    }


    useEffect(() => {
        const fetchData = async () => {
            await fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=30`)
            .then(response => response.json())
            .then((data) => {
                
                const chartdata = buidChartData(data, caseType)
                setData(chartdata)
        })
        }
        fetchData()
        
    }, [caseType])


 // Function to Build line Chart Format Data 


    return (
        <div className="linegraph">
            {
            data?.length > 0 && (
                <Line 
                options={options}
                data={{
                    datasets: [
                        {
                        backgroundColor: "rgba(204, 16, 52, 0.4)",
                        borderColor: "#CC1034",
                        data:data
                    }
                ],
                }}
            />
            )
            }
            
        </div>
    )
}

export default LineGraph
