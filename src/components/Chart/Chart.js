import React from 'react';
import ChartBar from './ChartBar';
import './Chart.css'
const Chart = props =>{
    const dataPointValues = props.dataPoints.map(datapoint=>datapoint.value);
    console.log(dataPointValues);
    const totalmax = Math.max(...dataPointValues);
return (
<div className="chart">
{props.dataPoints.map((dataPoint) =>
<ChartBar
key={dataPoint.label}
value={dataPoint.value}
maxValue={totalmax}
label={dataPoint.label}
/> )}
</div>
)
}
export default Chart;