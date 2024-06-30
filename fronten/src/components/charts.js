import React, { useState, useEffect} from "react";
import axios from 'axios';
import { ResponsiveBar } from '@nivo/bar'


const ChartsComponent = ({ data: dataProp }) => {  // Rename the prop to dataProp to avoid naming conflict
    const [data, setData] = useState(dataProp);  // Initialize the state with dataProp

    
    useEffect(() => {
        setData(dataProp);
    }, [dataProp]);

    useEffect(() => {
        // Only fetch data if dataProp is not provided
        if (!dataProp) {
            const url = `${process.env.REACT_APP_API_URL}/api/fruitfly/`;

            axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
        }
    }, [dataProp]);

    if (!data) {
        return <div>Loading...</div>;
      }

    return (
        
        <ResponsiveBar
        data={data}
        theme={{
            axis: {
                domain: {
                    line: {
                        stroke: 'grey'
                    }
                }, legend: {
                    text: { fill: 'grey' }
                }, ticks: {
                    line: {
                        stroke: 'grey',
                        strokeWidth: 1
                    },
                    text: { fill: 'grey' }
                }
            }, legends: {
                text: { fill: 'grey' }
            }
        }}
        keys={[
            'avg_count'
        ]}
        indexBy="date"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'paired' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'Fruit Fly'
                },
                id: 'dots'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'date',
            legendPosition: 'middle',
            legendOffset: 32,
            format: d => new Date(d).toLocaleDateString('en-US')
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Fruitfly',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
           
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in date: "+e.indexValue}
    />

    );
};

export default ChartsComponent