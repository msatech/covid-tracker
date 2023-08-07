import React from 'react'
import AnimatedNumber from "animated-number-react";
import './Table.css'

function Table({countries}) {

    const duration = "500"
    const formatValue = (value) => value.toFixed(0);

    return (
        <div className="table">
            {
                countries.map(({country, cases}) => (
                    <tr>
                        <td>{country}</td>
                        <td>
                            <strong>
                                <AnimatedNumber
                                    value={cases}
                                    duration={duration}
                                    formatValue={formatValue}
                                />
                            </strong>
                            
                            
                        </td>
                    </tr>
                ))
            }
        </div>
    )
}

export default Table
