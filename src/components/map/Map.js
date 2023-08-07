import React from 'react';
import {TileLayer, Map as LeafletMap } from 'react-leaflet';
import './map.css';
import { showDataOnMap } from '../../util';



function Map({countries, casesType, center, zoom}) {
    
    return (
        <div className="map">
           <LeafletMap center={center} zoom={zoom}>
               
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {showDataOnMap(countries, casesType=casesType)}
                
                
            </LeafletMap>     
        </div>
    )
}

export default Map
