document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const form = document.getElementById('techForm');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const resetBtn = document.getElementById('resetBtn');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    // Error elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const techError = document.getElementById('techError');
    
    // Input elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const commentsInput = document.getElementById('comments');
    const techCards = document.querySelectorAll('.tech-card');
    const commentCount = document.getElementById('commentCount');

    // State
    let currentStep = 1;
    let formData = {
        name: '',
        email: '',
        technologies: [],
        comments: ''
    };

    // Initialize
    updateProgress();
    setupEventListeners();

    function setupEventListeners() {
        // Input validation
        nameInput.addEventListener('input', handleNameInput);
        nameInput.addEventListener('blur', validateName);
        
        emailInput.addEventListener('input', handleEmailInput);
        emailInput.addEventListener('blur', validateEmail);
        
        commentsInput.addEventListener('input', handleCommentsInput);
        
        // Tech card selection
        techCards.forEach(card => {
            card.addEventListener('click', toggleTechCard);
            const checkbox = card.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', function() {
                validateTech();
                updateProgress();
            });
        });
        
        // Form submission
        form.addEventListener('submit', handleSubmit);
        
        // Reset button
        resetBtn.addEventListener('click', resetForm);
        
        // Keyboard navigation for tech cards
        techCards.forEach(card => {
            card.addEventListener('keydown', handleCardKeydown);
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'checkbox');
        });
    }

    function handleNameInput() {
        formData.name = nameInput.value.trim();
        updateProgress();
        if (nameInput.value.length > 0) {
            validateName();
        }
    }

    function handleEmailInput() {
        formData.email = emailInput.value.trim();
        updateProgress();
        if (emailInput.value.length > 0) {
            validateEmail();
        }
    }

    function handleCommentsInput() {
        const value = commentsInput.value;
        const length = value.length;
        const maxLength = 1000;
        
        formData.comments = value;
        commentCount.textContent = `${length}/${maxLength} caracteres`;
        
        if (length > maxLength * 0.8) {
            commentCount.className = 'character-count warning';
        } else if (length >= maxLength) {
            commentCount.className = 'character-count error';
        } else {
            commentCount.className = 'character-count';
        }
        
        updateProgress();
    }

    function validateName() {
        const name = nameInput.value.trim();
        const nameIcon = document.getElementById('nameIcon');
        
        if (name === '') {
            showError('nameError', 'Por favor, informe seu nome completo');
            setInputState(nameInput, 'invalid');
            nameIcon.innerHTML = '❌';
            nameIcon.className = 'validation-icon invalid';
            return false;
        } else if (name.length < 3) {
            showError('nameError', 'Nome deve ter pelo menos 3 caracteres');
            setInputState(nameInput, 'invalid');
            nameIcon.innerHTML = '❌';
            nameIcon.className = 'validation-icon invalid';
            return false;
        } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(name)) {
            showError('nameError', 'Nome deve conter apenas letras');
            setInputState(nameInput, 'invalid');
            nameIcon.innerHTML = '❌';
            nameIcon.className = 'validation-icon invalid';
            return false;
        } else {
            hideError('nameError');
            setInputState(nameInput, 'valid');
            nameIcon.innerHTML = '✅';
            nameIcon.className = 'validation-icon valid';
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailIcon = document.getElementById('emailIcon');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            showError('emailError', 'Por favor, informe seu e-mail');
            setInputState(emailInput, 'invalid');
            emailIcon.innerHTML = '❌';
            emailIcon.className = 'validation-icon invalid';
            return false;
        } else if (!emailRegex.test(email)) {
            showError('emailError', 'Por favor, informe um e-mail válido');
            setInputState(emailInput, 'invalid');
            emailIcon.innerHTML = '❌';
            emailIcon.className = 'validation-icon invalid';
            return false;
        } else {
            hideError('emailError');
            setInputState(emailInput, 'valid');
            emailIcon.innerHTML = '✅';
            emailIcon.className = 'validation-icon valid';
            return true;
        }
    }

    function validateTech() {
        const selectedTechs = document.querySelectorAll('input[name="tech"]:checked');
        
        if (selectedTechs.length === 0) {
            showError('techError', 'Por favor, selecione pelo menos uma tecnologia de interesse');
            return false;
        } else {
            hideError('techError');
            return true;
        }
    }

    function toggleTechCard(event) {
        const card = event.currentTarget;
        const checkbox = card.querySelector('input[type="checkbox"]');
        const tech = card.dataset.tech;
        
        // Prevent double-clicking on checkbox
        if (event.target === checkbox) return;
        
        checkbox.checked = !checkbox.checked;
        updateTechCard(card, checkbox.checked);
        updateTechArray();
        updateProgress();
        validateTech(); // Valida imediatamente após a seleção
    }

    function handleCardKeydown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleTechCard(event);
        }
    }

    function updateTechCard(card, isSelected) {
        if (isSelected) {
            card.classList.add('selected');
            card.setAttribute('aria-checked', 'true');
        } else {
            card.classList.remove('selected');
            card.setAttribute('aria-checked', 'false');
        }
    }

    function updateTechArray() {
        const selectedTechs = document.querySelectorAll('input[name="tech"]:checked');
        formData.technologies = Array.from(selectedTechs).map(cb => cb.value);
    }

    function updateProgress() {
        let progress = 0;
        let completed = 0;
        
        // Name validation (25%)
        if (formData.name && formData.name.length >= 3) {
            progress += 25;
            completed++;
        }
        
        // Email validation (25%)
        if (formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            progress += 25;
            completed++;
        }
        
        // Technology selection (25%)
        if (formData.technologies.length > 0) {
            progress += 25;
            completed++;
        }
        
        // Comments (25% - optional but adds to progress)
        if (formData.comments && formData.comments.trim().length > 0) {
            progress += 25;
        }
        
        progressFill.style.width = progress + '%';
        progressText.textContent = `${Math.round(progress)}% concluído`;
        
        // Update step indicators
        updateStepIndicators(completed);
    }

    function updateStepIndicators(completed) {
        const steps = document.querySelectorAll('.step');
        
        steps.forEach((step, index) => {
            const stepNum = index + 1;
            if (stepNum <= completed) {
                step.classList.remove('active');
                step.classList.add('completed');
            } else if (stepNum === completed + 1) {
                step.classList.remove('completed');
                step.classList.add('active');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
    }

    function setInputState(input, state) {
        input.classList.remove('input-valid', 'input-invalid');
        if (state === 'valid') {
            input.classList.add('input-valid');
        } else if (state === 'invalid') {
            input.classList.add('input-invalid');
        }
    }

    function showError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        errorElement.textContent = message;
        errorElement.classList.add('show');
        
        // Add gentle shake animation to the form group
        const formGroup = errorElement.closest('.form-group');
        if (formGroup) {
            formGroup.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                formGroup.style.animation = '';
            }, 500);
        }
    }

    function hideError(errorId) {
        const errorElement = document.getElementById(errorId);
        errorElement.classList.remove('show');
    }

    function handleSubmit(event) {
        event.preventDefault();
        
        // Validate all required fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isTechValid = validateTech();
        
        if (isNameValid && isEmailValid && isTechValid) {
            // Show loading state
            submitBtn.disabled = true;
            submitText.innerHTML = '<div class="loading"></div>Enviando...';
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                form.classList.add('hidden');
                successMessage.classList.remove('hidden');
                
                // Add feedback survey link
                const feedbackHtml = `
                    <div class="feedback-section">
                        <h3>Ajude-nos a melhorar!</h3>
                        <p>Gostaríamos de saber sua opinião sobre este formulário.</p>
                        <a href="https://forms.google.com/SEU_LINK_AQUI" target="_blank" class="btn btn-secondary">
                            Participar da pesquisa de satisfação
                        </a>
                    </div>
                `;
                successMessage.innerHTML += feedbackHtml;
                
                // Announce success to screen readers
                announceToScreenReader('Formulário enviado com sucesso!');
                
                // Reset progress
                progressFill.style.width = '100%';
                progressText.textContent = '100% concluído - Obrigado!';
                
                // Focus on success message for accessibility
                successMessage.focus();
                
                // Log form data (in real app, this would be sent to server)
                console.log('Form data submitted:', formData);
                
            }, 2000);
        } else {
            // Focus on first invalid field
            if (!isNameValid) {
                nameInput.focus();
            } else if (!isEmailValid) {
                emailInput.focus();
            } else if (!isTechValid) {
                const firstTechCard = document.querySelector('.tech-card');
                firstTechCard.focus();
            }
            
            // Shake animation for submit button
            submitBtn.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                submitBtn.style.animation = '';
            }, 500);
        }
    }

    function resetForm() {
        // Reset form
        form.reset();
        
        // Reset state
        formData = {
            name: '',
            email: '',
            technologies: [],
            comments: ''
        };
        
        // Reset UI
        form.classList.remove('hidden');
        successMessage.classList.add('hidden');
        
        // Reset validation states
        document.querySelectorAll('.input-valid, .input-invalid').forEach(input => {
            input.classList.remove('input-valid', 'input-invalid');
        });
        
        // Reset tech cards
        techCards.forEach(card => {
            card.classList.remove('selected');
            card.setAttribute('aria-checked', 'false');
        });
        
        // Reset validation icons
        document.querySelectorAll('.validation-icon').forEach(icon => {
            icon.innerHTML = '';
            icon.className = 'validation-icon';
        });
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(error => {
            error.classList.remove('show');
        });
        
        // Reset submit button
        submitBtn.disabled = false;
        submitText.textContent = 'Enviar Pesquisa';
        
        // Reset progress
        updateProgress();
        
        // Reset character count
        commentCount.textContent = '0/1000 caracteres';
        commentCount.className = 'character-count';
        
        // Focus on first input
        nameInput.focus();
    }

    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.textContent = message;
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.classList.add('sr-only');
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            if (document.body.contains(announcement)) {
                document.body.removeChild(announcement);
            }
        }, 1000);
    }

    // Initialize tech cards accessibility
    techCards.forEach(card => {
        card.setAttribute('aria-checked', 'false');
    });

    // Keyboard navigation improvements
    document.addEventListener('keydown', function(event) {
        // ESC key to clear focus
        if (event.key === 'Escape') {
            document.activeElement.blur();
        }
        
        // Tab navigation enhancement for tech cards
        if (event.key === 'Tab') {
            const focusedCard = document.activeElement;
            if (focusedCard.classList.contains('tech-card')) {
                // Add visual focus indicator
                focusedCard.style.outline = '3px solid var(--primary-color)';
                focusedCard.addEventListener('blur', function() {
                    this.style.outline = '';
                }, { once: true });
            }
        }
    });

    // Enhanced form sections interaction
    const formSections = document.querySelectorAll('.form-section');
    
    // Add intersection observer for better UX
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px',
        threshold: 0
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all sections
                formSections.forEach(section => section.classList.remove('active'));
                // Add active class to current section
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    formSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Add progress announcements
    let lastProgress = 0;
    const progressUpdate = function() {
        const currentProgress = Math.round(parseFloat(progressFill.style.width));
        if (currentProgress > lastProgress && currentProgress % 25 === 0) {
            announceToScreenReader(`Progresso: ${currentProgress}% concluído`);
            lastProgress = currentProgress;
        }
    };
    
    // Override the updateProgress function to include announcements
    const originalUpdateProgress = updateProgress;
    updateProgress = function() {
        originalUpdateProgress();
        progressUpdate();
    };
});