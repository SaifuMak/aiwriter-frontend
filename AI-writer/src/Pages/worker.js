// src/worker.js

let count = 0;

// Function to increment count
function incrementCount() {
    if (count <= 50000) {
        postMessage(count); // Send the current count back to the main thread
        count++;
        setTimeout(incrementCount, 1); // Continue incrementing after 1ms
    }
}

// Start counting when the worker starts
incrementCount();
