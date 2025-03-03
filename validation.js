document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    const formErrorsField = document.getElementById('form-errors');
    let formErrors = [];

    const patterns = {
        name: /^[A-Za-z\s]+$/,
        phone: /^\d{0,3}-?\d{0,3}-?\d{0,4}$/
    };

    nameInput.addEventListener('input', () => {
        validateInput(nameInput, 'Name must only contain letters and spaces.', patterns.name);
    });

    phoneInput.addEventListener('input', () => {
        validateInput(phoneInput, 'Phone must match the format 123-456-7890.', patterns.phone, true);
    });

    messageInput.addEventListener('input', () => {
        const remaining = 500 - messageInput.value.length;
        charCount.textContent = `${remaining} characters remaining`;
        charCount.style.color = remaining < 50 ? 'red' : '';
        if (remaining < 0) {
            messageInput.setCustomValidity('Character limit exceeded.');
            messageInput.reportValidity();
        } else {
            messageInput.setCustomValidity('');
        }
    });

    form.addEventListener('submit', (e) => {
        formErrors = [];
        Array.from(form.elements).forEach(input => {
            if (!input.validity.valid) {
                formErrors.push({
                    field: input.name,
                    message: input.validationMessage
                });
                console.log(`Error in ${input.name}: ${input.validationMessage}`);
            }
        });
        formErrorsField.value = JSON.stringify(formErrors);
        console.log('Form Errors: ', formErrors);
    });

    function validateInput(input, errorMessage, pattern, format = false) {
        if (!pattern.test(input.value)) {
            input.setCustomValidity(errorMessage);
            input.reportValidity();
            input.classList.add('invalid');
            setTimeout(() => input.classList.remove('invalid'), 1000);
            formErrors.push({ field: input.name, message: errorMessage });
        } else {
            input.setCustomValidity('');
        }
        formErrorsField.value = JSON.stringify(formErrors);
    }
});