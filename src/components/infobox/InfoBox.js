import React from 'react'
import { Card, CardContent, Typography } from  '@material-ui/core'
import './InfoBox.css'
import AnimatedNumber from "animated-number-react";
import CountryWiseGraph from '../linegraphcounty/countryWiseGraph';


function InfoBox({title, cases, total, color, caseType, countryCode, borderColor, backgroundColor, ...props}) {
   
    
    
    const duration = "300"
    const formatValue = (value) => value.toFixed(0);

    

    return (
        <Card onMouseEnter={props.onClick} className={`cases__card ${title}`}>
            <CardContent>
                <Typography className="infoBox__title" style={{color: `${borderColor}`}}>{title}</Typography>
                <h2 className="infoBox__cases" style={{color: `${borderColor}`}} >+ {cases}</h2>
                <Typography className="infoBox__total" style={{color: `${borderColor}`}}>
                    
                    <AnimatedNumber
                        value={total}
                        duration={duration}
                        formatValue={formatValue}
                    />
                </Typography>
                <div>
                <CountryWiseGraph caseType={caseType} countryCode={countryCode} borderColor={borderColor} backgroundColor={backgroundColor} />

                </div>
                
            </CardContent>
        </Card>
    )
}

export default InfoBox
