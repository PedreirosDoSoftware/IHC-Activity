document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('techForm');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    // Elementos para mensagens de erro
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const techError = document.getElementById('techError');
    
    // Função para validar nome
    function validateName() {
        const nameInput = document.getElementById('name');
        const nameValue = nameInput.value.trim();
        
        if (nameValue === '') {
            nameError.textContent = 'Por favor, informe seu nome';
            return false;
        } else if (nameValue.length < 3) {
            nameError.textContent = 'O nome deve ter pelo menos 3 caracteres';
            return false;
        } else {
            nameError.textContent = '';
            return true;
        }
    }
    
    // Função para validar email
    function validateEmail() {
        const emailInput = document.getElementById('email');
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === '') {
            emailError.textContent = 'Por favor, informe seu e-mail';
            return false;
        } else if (!emailRegex.test(emailValue)) {
            emailError.textContent = 'Por favor, informe um e-mail válido';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }
    
    // Função para validar tecnologias selecionadas
    function validateTech() {
        const techCheckboxes = document.querySelectorAll('input[name="tech"]:checked');
        
        if (techCheckboxes.length === 0) {
            techError.textContent = 'Por favor, selecione pelo menos uma tecnologia';
            return false;
        } else {
            techError.textContent = '';
            return true;
        }
    }
    
    // Validação em tempo real
    document.getElementById('name').addEventListener('blur', validateName);
    document.getElementById('email').addEventListener('blur', validateEmail);
    
    const techCheckboxes = document.querySelectorAll('input[name="tech"]');
    techCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', validateTech);
    });
    
    // Envio do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar todos os campos
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isTechValid = validateTech();
        
        if (isNameValid && isEmailValid && isTechValid) {
            // Simular envio (em um caso real, aqui seria uma requisição AJAX)
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                form.classList.add('hidden');
                successMessage.classList.remove('hidden');
                successMessage.setAttribute('aria-live', 'polite');
            }, 1500);
        }
    });
    
    // Botão para preencher novo formulário
    resetBtn.addEventListener('click', function() {
        form.reset();
        successMessage.classList.add('hidden');
        form.classList.remove('hidden');
        submitBtn.textContent = 'Enviar formulário';
        submitBtn.disabled = false;
        
        // Limpar mensagens de erro
        nameError.textContent = '';
        emailError.textContent = '';
        techError.textContent = '';
    });
    
    // Feedback visual para campos preenchidos corretamente
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                this.classList.add('filled');
            } else {
                this.classList.remove('filled');
            }
        });
    });
});