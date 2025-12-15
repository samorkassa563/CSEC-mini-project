// 1. VISIT COUNTER
        let visitCount = localStorage.getItem('visitCount') || 0;
        visitCount++;
        localStorage.setItem('visitCount', visitCount);
        document.getElementById('visitCount').textContent = visitCount;
        
        // 2. THEME TOGGLE
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('i');
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            if (document.body.classList.contains('dark-theme')) {
                themeIcon.className = 'fas fa-sun';
                showMessage('Switched to Dark Theme', 'success');
            } else {
                themeIcon.className = 'fas fa-moon';
                showMessage('Switched to Light Theme', 'success');
            }
        });
        
        // 3. CHANGE PROFILE IMAGE
        const profileImg = document.getElementById('profileImg');
        const changeImgBtn = document.getElementById('changeImgBtn');
        
        const profileImages = [
            'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
        ];
        
        let currentImageIndex = 0;
        
        changeImgBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % profileImages.length;
            profileImg.src = profileImages[currentImageIndex];
            showMessage('Profile image changed!', 'success');
        });
        
        // 4. SKILLS INTERACTION
        const skillsContainer = document.getElementById('skillsContainer');
        const skills = [
            'HTML5', 'CSS3', 'JavaScript', 
            'Python', 'UI/UX Design', 'Responsive Design', 'Git'
        ];
        
        skills.forEach(skill => {
            const skillTag = document.createElement('div');
            skillTag.className = 'skill-tag';
            skillTag.textContent = skill;
            skillTag.addEventListener('click', () => {
                skillTag.style.background = '#764ba2';
                showMessage(`You clicked on: ${skill}`, 'success');
                
                // Reset color after 1 second
                setTimeout(() => {
                    skillTag.style.background = '#667eea';
                }, 1000);
            });
            skillsContainer.appendChild(skillTag);
        });
        
        // 5. FORM VALIDATION & SUBMISSION
        const contactForm = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation
            if (!name || !email || !message) {
                showMessage('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Save to localStorage (simulating database)
                const messages = JSON.parse(localStorage.getItem('messages') || '[]');
                messages.push({
                    name,
                    email,
                    message,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem('messages', JSON.stringify(messages));
                
                // Show success
                showMessage(`Thank you ${name}! Your message has been sent successfully.`, 'success');
                
                // Reset form
                contactForm.reset();
                
                // Update submit button
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Message Sent!';
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
        
        function isValidEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }
        
        // 6. FUN FACTS GENERATOR
        const funFactBtn = document.getElementById('funFactBtn');
        const funFactDiv = document.getElementById('funFact');
        
        const funFacts = [
            "when I made my first project,I was 15 years old",
            "I can solve a Rubik's cube in under 200 minutes.",
            "I once built a website while helping one person.",
            "My first website was about my profile.",
            "I can type 120 words per minute🙈.",
            "I speak 2 languages fluently.",
            "I've visited 15 different countries.",
            "I love combining technology with art."
        ];
        
        funFactBtn.addEventListener('click', () => {
            const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
            funFactDiv.textContent = randomFact;
            funFactDiv.style.display = 'block';
            
            // Add some animation
            funFactDiv.style.opacity = '0';
            funFactDiv.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                funFactDiv.style.transition = 'all 0.5s ease';
                funFactDiv.style.opacity = '1';
                funFactDiv.style.transform = 'translateY(0)';
            }, 10);
        });
        
        // 7. TYPING EFFECT FOR NAME
        const nameHeading = document.getElementById('nameHeading');
        const originalName = nameHeading.textContent;
        nameHeading.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalName.length) {
                nameHeading.textContent += originalName.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after page loads
        setTimeout(typeWriter, 500);
        
        // 8. UPDATE LAST UPDATED TIME
        const lastUpdated = document.getElementById('lastUpdated');
        const now = new Date();
        lastUpdated.textContent = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
        
        // 9. MESSAGE FUNCTION
        function showMessage(text, type) {
            const formMessage = document.getElementById('formMessage');
            formMessage.textContent = text;
            formMessage.className = `message ${type}`;
            formMessage.style.display = 'block';
            
            // Auto-hide after 4 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 4000);
        }
        
        // 10. SOCIAL ICONS HOVER EFFECTS
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', (e) => {
                const x = e.offsetX;
                const y = e.offsetY;
                const span = document.createElement('span');
                span.style.position = 'absolute';
                span.style.background = 'rgba(255,255,255,0.3)';
                span.style.borderRadius = '50%';
                span.style.transform = 'scale(0)';
                span.style.animation = 'ripple 0.6s linear';
                
                const size = Math.max(e.target.offsetWidth, e.target.offsetHeight);
                span.style.width = span.style.height = size + 'px';
                span.style.left = x - size/2 + 'px';
                span.style.top = y - size/2 + 'px';
                
                e.target.appendChild(span);
                
                setTimeout(() => span.remove(), 600);
            });
        });
        
        // Add ripple animation style
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // 11. TIME-BASED GREETING
        const tagline = document.getElementById('tagline');
        const hour = new Date().getHours();
        let greeting = 'CSEC COMMUNITY';
        
        if (hour < 12) {
            greeting = '🌅 Good Morning! Web CSEC COMMUNITY';
        } else if (hour < 18) {
            greeting = '☀️ Good Afternoon! CSEC COMMUNITY';
        } else {
            greeting = '🌙 Good Evening! CSEC COMMUNITY';
        }
        
        tagline.textContent = greeting;