const loginForm = document.getElementById('login-form');
const emailinput = document.getElementById('email');
const passwordInput = document.getElementById('password');

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailinput.value.trim();
    const password = passwordInput.value.trim();
   
    try {
      const response = await fetch('https://onlybackend-wgcr.onrender.com/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const { token, role, user_id } = await response.json();
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user_id', user_id);
      
      if (role === 'worker') {
        window.location.href = 'cv.html';  
      } else {
        window.location.href = 'desktophomepage.html'; 
      }
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('login-error').textContent = 'Login failed. Please try again.';
    }
  });
  
  