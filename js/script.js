document.addEventListener('DOMContentLoaded', function () {
  const currentYear = new Date().getFullYear();
  document.getElementById('copyright').textContent = `SecureAuth ©${currentYear} `;

  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Perform basic validation
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    //   const captcha = document.getElementById('captcha').value.trim();

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters.');
      return;
    }

    // Store email in sessionStorage
    sessionStorage.setItem('userEmail', email);

    // Redirect to home page
    window.location.href = 'home.html';

    // Simulate captcha check (replace with actual captcha validation)
    // Update this logic based on how you generate and verify captchas
    //   if (captcha === '') {
    //     alert('Please enter the captcha.');
    //   } else {
    //     alert('Incorrect captcha, please try again.');
    //   }
  });

  // Function to validate email format using correct regex pattern
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
});
