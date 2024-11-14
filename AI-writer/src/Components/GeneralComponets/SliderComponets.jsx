import React from 'react'
import Slider from '@mui/material/Slider';



function SliderComponets({Handlefunction,WordsCount,Step=5000, MinimumValue=10000}) {
  return (
    
    <Slider
    aria-labelledby="slider-label"
    value={WordsCount} // Controlled value from state
    onChange={Handlefunction} // Update state on change
    valueLabelDisplay="auto" // Show value label when dragging
    // color="success" // Change slider color
    step={Step} // Step increment
    min={MinimumValue} // Minimum value
    max={300000} // Maximum value
    sx={{
        color: 'success.main', // Change the color of the slider
        '& .MuiSlider-thumb': {
          backgroundColor: '#FB923C', // Color of the thumb
          border: '3px solid #000000', // Thumb border color
        },
        '& .MuiSlider-track': {
          backgroundColor: '#FB923C', // Color of the track
          border: '0px ', // Thumb border color

        },
        '& .MuiSlider-rail': {
          backgroundColor: '#E3E3E3', // Color of the rail
        },
      }}
/>
  )
}

export default SliderComponets