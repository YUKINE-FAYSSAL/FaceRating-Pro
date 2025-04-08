document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const elements = {
    photoInput: document.getElementById('photoInput'),
    submitPhotoBtn: document.getElementById('submitPhotoBtn'),
    landing: document.getElementById('landing'),
    loaderContainer: document.getElementById('loaderContainer'),
    lockerModal: document.getElementById('lockerModal'),
    unlockTouchBtn: document.getElementById('unlockTouchBtn'),
    ageVerification: document.getElementById('ageVerification'),
    resultContainer: document.getElementById('resultContainer'),
    ratingScore: document.getElementById('ratingScore'),
    countdownNumber: document.querySelector('.countdown-number')
  };

  // Enable submit button when photo is selected
  elements.photoInput.addEventListener('change', function() {
    elements.submitPhotoBtn.disabled = !elements.photoInput.files.length;
    
    if (elements.photoInput.files.length) {
      // Add visual feedback when file is selected
      const uploadBtn = document.querySelector('.upload-btn');
      uploadBtn.innerHTML = `<i class="fas fa-check-circle"></i> Photo Selected`;
      uploadBtn.style.background = 'rgba(0, 206, 255, 0.2)';
      uploadBtn.style.borderColor = 'var(--highlight)';
    }
  });

  // Submit photo handler
  elements.submitPhotoBtn.addEventListener('click', function() {
    elements.landing.classList.add('hidden');
    elements.loaderContainer.classList.remove('hidden');
    
    // Simulate processing time
    setTimeout(() => {
      elements.loaderContainer.classList.add('hidden');
      showModal(elements.lockerModal);
    }, 5000);
  });

  // Unlock button handler
  elements.unlockTouchBtn.addEventListener('click', function() {
    // Open URL in new tab
    window.open('https://installchecker.com/cl/i/7d97wk', '_blank');
    
    // Show age verification
    hideModal(elements.lockerModal);
    showModal(elements.ageVerification);
    
    // Start 30-second countdown
    startCountdown(15);
  });

  // Show modal with animation
  function showModal(modal) {
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('active'), 10);
  }

  // Hide modal with animation
  function hideModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }


function startCountdown(seconds) {
  elements.countdownNumber.textContent = seconds;
  
  const countdownInterval = setInterval(() => {
    seconds--;
    elements.countdownNumber.textContent = seconds;
    
    if (seconds <= 0) {
      clearInterval(countdownInterval);
      hideModal(elements.ageVerification);
      showRating();
    }
  }, 1000);
}

  // Show rating with random score
  function showRating() {
    elements.resultContainer.classList.remove('hidden');
    
    // Animate rating display
    let rating = 0;
    const targetRating = (Math.random() * 1.5 + 8.5).toFixed(1);
    const ratingInterval = setInterval(() => {
      rating += 0.1;
      elements.ratingScore.textContent = rating.toFixed(1);
      
      if (rating >= targetRating) {
        clearInterval(ratingInterval);
        elements.ratingScore.textContent = targetRating;
        
        // Add celebration effects
        document.querySelector('.trophy i').classList.add('pulse');
        setTimeout(() => {
          document.querySelector('.trophy i').classList.remove('pulse');
        }, 2000);
      }
    }, 50);
  }

  // Add click effect to buttons
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
      this.classList.add('clicked');
      setTimeout(() => this.classList.remove('clicked'), 300);
    });
  });
});