// articleWorker.js
let article = '';
let index = 0;
let timerId = null;

self.onmessage = (event) => {
  // Initialize the article and reset the index
  article = event.data.article;
  index = 0;

  // Clear any existing timer
  clearTimeout(timerId);

  const revealText = () => {
    if (index < article.length) {
      self.postMessage(article.slice(0, index + 1)); // Send the current visible part of the article back to the main thread
      index++;
      timerId = setTimeout(revealText, 4); // Speed of typing
    } else {
      self.postMessage({ completed: true }); // Indicate completion
    }
  };

  revealText(); // Start the typing effect
};

// Clean up on worker termination
self.onclose = () => {
  clearTimeout(timerId);
};
