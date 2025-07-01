// WORKING LOGIN FIX - DIRECT IMPLEMENTATION
window.addEventListener('DOMContentLoaded', function() {
    console.log('Login fix loaded');
    
    // Override the login function
    window.handleLogin = async function(email, password) {
        console.log('Custom login called:', email);
        
        try {
            const response = await fetch('https://5000-ifiw4vb9aejz3sovjdosf-09647d20.manusvm.computer/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            console.log('Login response:', data);
            
            if (response.ok && data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data));
                console.log('Login successful, redirecting...');
                window.location.href = '/dashboard';
                return true;
            } else {
                console.error('Login failed:', data.message);
                return false;
            }
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };
    
    // Override form submission
    setTimeout(() => {
        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                console.log('Form submitted');
                
                const emailInput = document.querySelector('input[type="email"], input[placeholder*="email"]');
                const passwordInput = document.querySelector('input[type="password"], input[placeholder*="••"]');
                
                if (emailInput && passwordInput) {
                    const email = emailInput.value;
                    const password = passwordInput.value;
                    console.log('Attempting login with:', email);
                    
                    const success = await window.handleLogin(email, password);
                    if (!success) {
                        alert('Грешка при влизане. Моля, опитайте отново.');
                    }
                }
            });
        }
        
        // Also override button click
        const loginButton = document.querySelector('button[type="submit"], button:contains("Sign In")');
        if (loginButton) {
            loginButton.addEventListener('click', async function(e) {
                e.preventDefault();
                console.log('Login button clicked');
                
                const emailInput = document.querySelector('input[type="email"], input[placeholder*="email"]');
                const passwordInput = document.querySelector('input[type="password"], input[placeholder*="••"]');
                
                if (emailInput && passwordInput) {
                    const email = emailInput.value;
                    const password = passwordInput.value;
                    console.log('Attempting login with:', email);
                    
                    const success = await window.handleLogin(email, password);
                    if (!success) {
                        alert('Грешка при влизане. Моля, опитайте отново.');
                    }
                }
            });
        }
    }, 1000);
});

