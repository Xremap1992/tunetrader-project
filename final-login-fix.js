// FINAL WORKING LOGIN FIX
console.log('Final login fix loaded');

// Wait for page to load
window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up login fix');
    
    // Override login function
    window.handleLogin = async function(email, password) {
        console.log('Login attempt:', email);
        
        try {
            const response = await fetch('https://5000-ifiw4vb9aejz3sovjdosf-09647d20.manusvm.computer/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                mode: 'cors'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Login response:', data);
            
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data));
                console.log('Login successful, token saved');
                
                // Show success message
                alert('Успешен вход! Добре дошли в TuneTrader!');
                
                // Redirect based on user role
                if (data.role === 'admin') {
                    window.location.href = '/dashboard';
                } else if (data.role === 'client') {
                    window.location.href = '/client-dashboard';
                } else if (data.role === 'tuner') {
                    window.location.href = '/tuner-dashboard';
                } else {
                    window.location.href = '/dashboard';
                }
                return true;
            } else {
                throw new Error('No token received');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Грешка при влизане: ' + error.message);
            return false;
        }
    };
    
    // Set up form handling
    setTimeout(() => {
        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                console.log('Form submitted');
                
                const emailInput = document.querySelector('input[type="email"], input[placeholder*="email"]');
                const passwordInput = document.querySelector('input[type="password"]');
                
                if (emailInput && passwordInput) {
                    const email = emailInput.value.trim();
                    const password = passwordInput.value;
                    
                    if (email && password) {
                        await window.handleLogin(email, password);
                    } else {
                        alert('Моля въведете email и парола');
                    }
                }
            });
        }
        
        // Also handle button clicks
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            if (button.textContent.includes('Sign In') || button.type === 'submit') {
                button.addEventListener('click', async function(e) {
                    e.preventDefault();
                    console.log('Login button clicked');
                    
                    const emailInput = document.querySelector('input[type="email"], input[placeholder*="email"]');
                    const passwordInput = document.querySelector('input[type="password"]');
                    
                    if (emailInput && passwordInput) {
                        const email = emailInput.value.trim();
                        const password = passwordInput.value;
                        
                        if (email && password) {
                            await window.handleLogin(email, password);
                        } else {
                            alert('Моля въведете email и парола');
                        }
                    }
                });
            }
        });
    }, 1000);
});

