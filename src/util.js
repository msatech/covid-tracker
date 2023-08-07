import { Circle, Popup } from 'react-leaflet';
import numeral from 'numeral';

const caseTypeColors = {
    cases:{
        
        hex: "#007BFE",
        rgb: "rgb(204, 16, 52)",
        half_op: "#7ebafaec",
        multiplier: 200
    },
    recovered:{
        hex: "#7dd71d",
        rgb: "rgb(125, 215, 29)",
        half_op: "rgba(125, 215, 29, 0.5)",
        multiplier: 350
    },
    deaths:{
        hex: "#CC1034",
        rgb: "rgb(251, 68, 67)",
        half_op: "rgba(251, 68, 67, 0.5)",
        multiplier: 1500
    },

};


export const sortData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
        if (a.cases > b.cases){
            return -1;
        }
        else{
            return 1;
        }
    })
    return sortedData;
} 



export const buidChartData = (data, caseType) => {
    const chartData = [];
    let lastDataPoint;

    for(let date in data.cases) {
        if (lastDataPoint){
            const newDataPoint = {
                x:date,
                y:data[caseType][date] - lastDataPoint
            }
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[caseType][date];
    }
    return chartData;

}


export const showDataOnMap = (data, casesType) => (
    data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={caseTypeColors[casesType].hex}
            fillColor={caseTypeColors[casesType].half_op}
            radius={
                Math.sqrt(country[casesType]) * caseTypeColors[casesType].multiplier
            }


        >
            <Popup>
                <div className="info-container">
                    <div className="info-flag" style={{backgroundImage: `url(${country.countryInfo.flag})`}}></div>
                    <div className="info-country">{country.country}</div>
                    <div className="info-cases">Cases: {numeral(country.cases).format("0,0")}</div>
                    <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                    <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ))
);
