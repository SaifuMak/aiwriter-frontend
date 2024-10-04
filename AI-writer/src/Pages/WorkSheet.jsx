// src/WorkSheet.js

import React, { useState, useEffect } from 'react';

function WorkSheet() {
    const [numbers, setNumbers] = useState([]);

    // useEffect(() => {
    //     // Create a new web worker
    //     const worker = new Worker(new URL('./worker.js', import.meta.url));

    //     // Listen for messages from the worker
    //     worker.onmessage = (event) => {
    //         const newCount = event.data; // Get the count from the worker
    //         setNumbers((prevNumbers) => [...prevNumbers, newCount]); // Append the new number
    //     };

    //     // Terminate the worker when the component unmounts
    //     return () => {
    //         worker.terminate();
    //     };
    // }, []);

    return (
        <div className='flex items-center justify-center p-10'>
            {/* {numbers.map((number) => (
                <div className='p-10' key={number}>{number}</div>
            ))} */}
        </div>
    );
}

export default WorkSheet;
