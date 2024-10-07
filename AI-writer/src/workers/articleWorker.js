// src/articleWorker.js

self.onmessage = (e) => {
  const { article, index } = e.data;
  const dat = e.data
  console.log(dat,'recieved the data , iam the worker ')
  let newIndex = index;

  // Simulate typing effect
  const interval = setInterval(() => {
    newIndex++;
    
    // Post progressively updated HTML back to the main thread
    self.postMessage({
      visibleHTML: article.slice(0, newIndex),
      newIndex,
    });

    // Stop when the article is fully rendered
    if (newIndex >= article.length) {
      clearInterval(interval);
      self.postMessage({visibleHTML: article, // Ensure the final message has the full article
        newIndex,  done: true });
    }
  }, 10); // Adjust the speed of typing effect (10ms per character)
};
