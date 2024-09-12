import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularPercentage = ({ percentage, pathcolor, textcolor  }) => {
  return (
    <div style={{ width: "120px", height: "120px" }}>
      <CircularProgressbar
        value={percentage}
        strokeWidth={12}
        text={`${percentage}%`}
        // styles={{
        //     // Customize the root svg element
        //     root: {},
        //     // Customize the path, i.e. the "completed progress"
        //     path: {
        //       // Path color
        //       stroke: '#F20000',
        //       // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            
        //       // Customize transition animation
        //       transition: 'stroke-dashoffset 0.5s ease 0s',
        //       // Rotate the path
             
        //       transformOrigin: 'center center',
        //     },
        //     // Customize the circle behind the path, i.e. the "total progress"
        //     trail: {
        //       // Trail color
        //       stroke: '#DADADA',
              
         
        //     },
        //     // Customize the text
        //     text: {
        //       // Text color
        //       fill: '#FF0000',
        //       // Text size
        //       fontSize: '20px',
        //     },
        //     // Customize background - only used when the `background` prop is true
        //     background: {
        //       fill: '#3e98c7',
        //     },
        //   }}
       
        styles={buildStyles({

          textColor: textcolor,
          textSize: "20px",
          pathColor: pathcolor,
          trailColor: "#DADADA",
          
        }
    )}
      />
    </div>
  );
};




export default CircularPercentage;
