import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import { buidChartData } from '../../util';
import numeral from 'numeral';
import './countryWiseGraph.css'
function CountryWiseGraph({caseType, countryCode, borderColor, backgroundColor}) {

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
                    ticks:{
                        display:false,
                    },
                    
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    ticks:{
                        display:false,
                    },
                },
                
            ],
        },
    }


    useEffect(() => {
        const fetchData = async () => {
            if(countryCode == "worldwide"){
                await fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=20`)
                .then(response => response.json())
                .then((data) => {
                    
                    const chartdata = buidChartData(data, caseType)
                    setData(chartdata)
                })
            }
            else{
                await fetch(`https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=20`)
                .then(response => response.json())
                .then((data) => {
                    
                    const chartdata = buidChartData(data.timeline, caseType)
                    setData(chartdata)
                })
            }
            
        }
        fetchData()
        
    }, [countryCode, caseType])


 // Function to Build line Chart Format Data 


    return (
        <div className="country__linegraph">
            {
            data?.length > 0 && (
                <Line 
                options={options}
                data={{
                    datasets: [
                        {
                        backgroundColor: `${backgroundColor}`,
                        borderColor: `${borderColor}`,
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

export default CountryWiseGraph
