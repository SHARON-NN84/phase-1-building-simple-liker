// Add this class to hide the error modal on initial page load
document.addEventListener("DOMContentLoaded", () => {
  const errorModal = document.getElementById("modal");
  errorModal.classList.add("hidden");

  // Select all hearts
  const hearts = document.querySelectorAll(".like-glyph");

  hearts.forEach(heart => {
    heart.addEventListener("click", () => {
      // Make server call
      mimicServerCall()
        .then(() => {
          // Toggle heart state on successful server response
          if (heart.innerText === "♡") {
            heart.innerText = "♥";
            heart.classList.add("activated-heart");
          } else {
            heart.innerText = "♡";
            heart.classList.remove("activated-heart");
          }
        })
        .catch(error => {
          // Show error modal
          errorModal.classList.remove("hidden");
          errorModal.querySelector("#modal-message").innerText = error;

          // Hide modal after 3 seconds
          setTimeout(() => {
            errorModal.classList.add("hidden");
          }, 3000);
        });
    });
  });
});

// Mock server function - do not change
function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Randomly fail or succeed
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
