import React from 'react'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import RadialComponent from './RadialComponent';

function RadialSeperators() {
  
  return (
    <div style={{ width: "35px", height: "35px" }}>
    <CircularProgressbarWithChildren
    value={25}
    strokeWidth={10}
    styles={buildStyles({
      strokeLinecap: "butt",
      pathColor: '#FB923C',
    })}
  >
    <RadialComponent
      count={20}
      style={{
        background: "#fff",
        width: "2px",
        // This needs to be equal to props.strokeWidth
        height: `${10}%`
      }}
    />
  </CircularProgressbarWithChildren>
  </div>

  )
}

export default RadialSeperators