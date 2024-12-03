import React,{useState} from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the default styles

function Calender({setDate,minDate}) {

    const handleDateChange = (date) => {
        console.log(date,'date')
        console.log(date.toDateString(), 'date string')
        console.log(new Date(date),'date new ')

        setDate(date.toDateString()); // Update the displayed date
        // setDate(new Date(date))
        // setIsFromCalender(false); // Close the calendar
        // setIsFromCalender(false); // Close the calendar
        console.log('Selected Date:', date);
    };


    return (
       
            <Calendar
                onChange={handleDateChange}
               minDate = {minDate ? new Date(minDate) : undefined}
                className="rounded-md"
            />
          
    );
}


export default Calender