// Handle splash screen transition
document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splashScreen');
    const loginContainer = document.getElementById('loginContainer');
    const greetingContainer = document.getElementById('greetingContainer');
    
    // After 5 seconds, fade out splash screen and show greeting
    setTimeout(function() {
        splashScreen.classList.add('fade-out');
        
        // Wait for fade animation to complete, then show greeting
        setTimeout(function() {
            splashScreen.style.display = 'none';
            loginContainer.classList.add('show');
            greetingContainer.style.display = 'flex';
            document.body.style.overflow = 'auto';
            
            // Start the greeting sequence
            showGreeting();
        }, 500);
    }, 5000);
});

// Show greeting with voice and text
function showGreeting() {
    const greetingText = document.getElementById('greetingText');
    const loginCard = document.querySelector('.login-card');
    
    // Ensure login card is completely hidden initially
    loginCard.classList.remove('show');
    loginCard.style.opacity = '0';
    loginCard.style.transform = 'translateY(50px)';
    loginCard.style.display = 'none';
    
    // Show greeting text with typing effect
    const message = "Hey Sathya Happy birthday to you warmful greetings from Lagumesh";
    let i = 0;
    let isTypingComplete = false;
    let isVoiceComplete = false;
    
    function checkIfBothComplete() {
        if (isTypingComplete && isVoiceComplete) {
            // Both text and voice are complete, wait 2 seconds then show login card
            setTimeout(showLoginCard, 2000);
        }
    }
    
    function typeWriter() {
        if (i < message.length) {
            greetingText.innerHTML += message.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            // Typing is complete
            isTypingComplete = true;
            console.log('Text typing completed');
            checkIfBothComplete();
        }
    }
    
    // Enhanced voice synthesis with retry mechanism
    function playVoice() {
        if ('speechSynthesis' in window) {
            // Cancel any existing speech
            speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(message);
            // Siri-like voice parameters
            utterance.rate = 0.9;     // Slightly faster, more natural
            utterance.pitch = 1.0;    // Natural pitch like Siri
            utterance.volume = 1.0;   // Full volume
            
            // Wait for voices to load if needed
            function setVoiceAndSpeak() {
                const voices = speechSynthesis.getVoices();
                console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`));
                
                if (voices.length > 0) {
                    // Priority order for Siri-like voices
                    const siriLikeVoice = voices.find(voice => 
                        // Apple Siri voices (if available)
                        voice.name.toLowerCase().includes('samantha') ||
                        voice.name.toLowerCase().includes('alex') ||
                        voice.name.toLowerCase().includes('victoria') ||
                        voice.name.toLowerCase().includes('allison') ||
                        // Microsoft voices that sound similar to Siri
                        voice.name.toLowerCase().includes('zira') ||
                        voice.name.toLowerCase().includes('eva') ||
                        voice.name.toLowerCase().includes('aria') ||
                        // Google voices
                        voice.name.toLowerCase().includes('google us english') ||
                        // General female voices as fallback
                        (voice.name.toLowerCase().includes('female') && voice.lang.startsWith('en')) ||
                        voice.gender === 'female'
                    );
                    
                    if (siriLikeVoice) {
                        utterance.voice = siriLikeVoice;
                        console.log('Selected voice:', siriLikeVoice.name);
                    } else {
                        // Fallback to first English voice
                        const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
                        if (englishVoice) {
                            utterance.voice = englishVoice;
                            console.log('Fallback voice:', englishVoice.name);
                        }
                    }
                }
                
                utterance.onstart = function() {
                    console.log('Voice greeting started after splash screen');
                };
                
                utterance.onend = function() {
                    console.log('Voice greeting completed');
                    isVoiceComplete = true;
                    checkIfBothComplete();
                };
                
                utterance.onerror = function(event) {
                    console.log('Speech error:', event.error);
                    isVoiceComplete = true; // Consider it complete even on error
                    checkIfBothComplete();
                };
                
                speechSynthesis.speak(utterance);
            }
            
            // Check if voices are already loaded
            if (speechSynthesis.getVoices().length > 0) {
                setVoiceAndSpeak();
            } else {
                // Wait for voices to load
                speechSynthesis.onvoiceschanged = setVoiceAndSpeak;
                // Fallback timeout
                setTimeout(setVoiceAndSpeak, 1000);
            }
        } else {
            // No speech synthesis available
            isVoiceComplete = true;
            checkIfBothComplete();
        }
    }
    
    // Start voice only after splash screen ends (with small delay to ensure smooth transition)
    setTimeout(playVoice, 300);
    
    // Start typing animation immediately
    typeWriter();
}

// Show login card after greeting
function showLoginCard() {
    const greetingContainer = document.getElementById('greetingContainer');
    const loginCard = document.querySelector('.login-card');
    
    // Fade out greeting
    greetingContainer.style.opacity = '0';
    
    setTimeout(function() {
        greetingContainer.style.display = 'none';
        
        // Show login card with animation
        loginCard.style.display = 'block';
        loginCard.classList.add('show');
    }, 500);
}

// Handle form submission and date input
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure the form exists
    setTimeout(function() {
        const loginForm = document.getElementById('loginForm');
        const dateInput = document.getElementById('dateOfBirth');
        
        // Enhance date input functionality
        if (dateInput) {
            // Ensure the date input shows calendar on click
            dateInput.addEventListener('click', function() {
                this.showPicker && this.showPicker();
            });
            
            // Add focus event to ensure calendar opens
            dateInput.addEventListener('focus', function() {
                this.showPicker && this.showPicker();
            });
            
            // Set max date to today (can't select future dates for birth date)
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('max', today);
            
            // Set a reasonable min date (e.g., 100 years ago)
            const minDate = new Date();
            minDate.setFullYear(minDate.getFullYear() - 100);
            dateInput.setAttribute('min', minDate.toISOString().split('T')[0]);
        }
        
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('name').value;
                const dateOfBirth = document.getElementById('dateOfBirth').value;
                
                if (name && dateOfBirth) {
                    // Hide login container and show celebration page
                    showCelebrationPage(name, dateOfBirth);
                }
            });
        }
    }, 100);
});

// Show celebration page with slider and music
function showCelebrationPage(name, dateOfBirth) {
    const loginContainer = document.getElementById('loginContainer');
    const celebrationContainer = document.getElementById('celebrationContainer');
    const birthdayTitle = document.getElementById('birthdayTitle');
    const birthdayWish = document.getElementById('birthdayWish');
    
    // Update birthday message with user's name
    birthdayTitle.textContent = `🎉 Happy Birthday ${name}! 🎉`;
    birthdayWish.textContent = `Wishing you a wonderful year ahead filled with joy and happiness!`;
    
    // Hide login page
    loginContainer.style.display = 'none';
    
    // Show celebration page
    celebrationContainer.classList.add('show');
    
    // Start 3D hearts animation
    create3DHearts();
    
    // Start image slider
    startImageSlider();
    
    // Play background music
    playBirthdayMusic();
}

// Create 3D floating hearts
function create3DHearts() {
    const heartsContainer = document.querySelector('.hearts-3d');
    const heartEmojis = ['💖', '💕', '💗', '💝', '❤️', '💜', '💙', '💚'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart-3d';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 10000);
    }
    
    // Create hearts continuously
    setInterval(createHeart, 800);
    
    // Create initial batch
    for (let i = 0; i < 10; i++) {
        setTimeout(createHeart, i * 200);
    }
}

// Image slider functionality
function startImageSlider() {
    const slides = document.querySelectorAll('.slide');
    const navDots = document.querySelectorAll('.nav-dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        navDots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        navDots[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Auto-advance slides every 3 seconds
    setInterval(nextSlide, 3000);
    
    // Add click handlers to navigation dots
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
}

// Background music functionality
function playBirthdayMusic() {
    const music = document.getElementById('birthdayMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;
    
    // Try to play music (may be blocked by browser autoplay policy)
    music.play().then(() => {
        isPlaying = true;
        musicToggle.textContent = '🔊';
    }).catch(() => {
        // Autoplay blocked, user needs to interact first
        isPlaying = false;
        musicToggle.textContent = '🔇';
    });
    
    // Music toggle button
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            musicToggle.textContent = '🔇';
            isPlaying = false;
        } else {
            music.play().then(() => {
                musicToggle.textContent = '🔊';
                isPlaying = true;
            }).catch(() => {
                console.log('Could not play music');
            });
        }
    });
}
