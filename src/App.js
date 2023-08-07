
import './App.css';
import {MenuItem, FormControl, Select, Card, CardContent} from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import InfoBox from './components/infobox/InfoBox';
import Map from './components/map/Map';
import Table from './components/table/Table';
import {sortData} from './util';
import LineGraph from './components/linegraph/LineGraph';
import "leaflet/dist/leaflet.css";


function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");


  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2,
              flag: country.countryInfo.flag,
            }
          ));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
          
           
      })
      
    };
    getCountriesData();
  },[]);
  
  const onCountryChange = async (event) => {
    const countryCode =  event.target.value;
    

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(response => response.json())
    .then((data) => {
        
        setCountry(countryCode);
        
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        setMapZoom(4)
    });
    
  };

  useEffect(() => {
      fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then((data) => {
        
        setCountryInfo(data);
    });
  }, [])


  
 
  

  return (
    <div className="App">
      <div className="app__left">
        <div className="app__header">
        <h1>Covid 19 Tracker</h1>
          <FormControl className="app__dropdown" >
            <Select variant="outlined" style={{color:"#6B747C", border:"1px solid white"}} onChange={onCountryChange} value={country}>
                <MenuItem  className="menuitem" value="worldwide">WorldWide</MenuItem>
                
                {
                  countries.map(country => (
                    <MenuItem value={country.value}> <img className="country__flag" src={`${country.flag}`} />{country.name}</MenuItem>
                  ))
                }
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
            <InfoBox onClick={e => setCasesType('cases')} title="Cases" caseType="cases" cases={countryInfo.todayCases}  color="textSecondary" total={countryInfo.cases} countryCode={country}  borderColor="#007BFE" backgroundColor="#66a5e9c0" />
            

            <InfoBox onClick={e => setCasesType('recovered')} title="Recovered" caseType="recovered" cases={countryInfo.todayRecovered} color="primary" total={countryInfo.recovered} countryCode={country}  borderColor="#28A645" backgroundColor="#77ee93a9"/>

            <InfoBox onClick={e => setCasesType('deaths')} title="Deaths" caseType="deaths" cases={countryInfo.todayDeaths} color="error" total={countryInfo.deaths} countryCode={country} borderColor="#A00D31" backgroundColor="#EB9FAE" />
            

            
        </div>
        <div>
          <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
        </div>
        
      </div>
      
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          <Table countries={tableData} />
          <h3>World Wide New Cases</h3>
          <LineGraph caseType="cases"/>
        </CardContent>
        {/* Table */}
        {/* Graph */}
      </Card>
      
    </div>
  );
}

export default App;
