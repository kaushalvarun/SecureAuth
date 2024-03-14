document.addEventListener('DOMContentLoaded', function () {
  const currentYear = new Date().getFullYear();
  document.getElementById('copyright').textContent = `SecureAuth ©${currentYear} `;

  const loginForm = document.getElementById('loginForm');
  let captchaString = generateCaptchaString(); // Initial captcha generation
  // Display captcha on page load
  createCaptchaImage(captchaString);

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Perform basic validation
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const enteredCaptcha = document.getElementById('captchaInput').value.trim();

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters.');
      return;
    }

    if (enteredCaptcha !== captchaString) {
      alert('Captcha does not match!');
      captchaString = generateCaptchaString();
      createCaptchaImage(captchaString);
      return;
    }

    // Store email in sessionStorage
    sessionStorage.setItem('userEmail', email);

    // Redirect to home page
    window.location.href = 'home.html';
  });

  // Function to validate email format using correct regex pattern
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  // Generate random captcha string
  function generateCaptchaString() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var captchaString = '';
    for (var i = 0; i < 7; i++) {
      captchaString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captchaString;
  }

  // Create captcha image
  function createCaptchaImage(captchaString) {
    var canvas = document.getElementById('captchaCanvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate max font size based on canvas dimensions
    var fontSize = Math.min(canvas.width / (captchaString.length * 0.5), canvas.height * 0.4);
    ctx.font = 'italic bold ' + fontSize + 'px Arial';
    ctx.fillStyle = 'darkblue';

    // Calculate text width and position
    var textWidth = ctx.measureText(captchaString).width;
    var xPosition = (canvas.width - textWidth) / 2;
    var yPosition = canvas.height / 2 + fontSize / 4;

    // Apply rotation within limited range (-5,5)
    var rotationAngle = Math.random() * 10 - 5;
    ctx.rotate(rotationAngle * Math.PI / 180);

    // making wave-like motion
    // Draw each character with alternating up and down positions
    for (var i = 0; i < captchaString.length; i++) {
      var char = captchaString.charAt(i);
      if (i % 2 === 0) {
        ctx.fillText(char, xPosition, yPosition - fontSize / 6);
      } else {
        ctx.fillText(char, xPosition, yPosition + fontSize / 6);
      }
      xPosition += ctx.measureText(char).width;
    }

    // Reset rotation
    ctx.rotate(-rotationAngle * Math.PI / 180);

    // Apply noise (lines and dots)
    for (var i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fill();
    }
  }
});
