
document.addEventListener('DOMContentLoaded', function() {

    const cardNumber = document.getElementById('card-number');
    const cardName = document.getElementById('card-name');
    const expiryDate = document.getElementById('expiry-date');
    const cvv = document.getElementById('cvv');
    const billingAddress = document.getElementById('billing-address');

    function showError(input, message) {
        let error = input.nextElementSibling;
        if (!error || !error.classList.contains('error-message')) {
            error = document.createElement('div');
            error.className = 'error-message text-danger';
            input.parentNode.appendChild(error);
        }
        error.textContent = message;
    }

    function clearError(input) {
        const error = input.nextElementSibling;
        if (error && error.classList.contains('error-message')) {
            error.textContent = '';
        }
    }

    cardNumber.addEventListener('blur', function() {
        if (!/^\d{16}$/.test(cardNumber.value)) {
            showError(cardNumber, "Please enter a valid 16-digit card number.");
            cardNumber.style.animation = "shake 0.3s";
        } else {
            clearError(cardNumber);
        }
    });

    cardName.addEventListener('blur', function() {
        if (!/^[A-Za-z\s]+$/.test(cardName.value)) {
            showError(cardName, "Please enter a valid name with letters only.");
            cardName.style.animation = "shake 0.3s";
        } else {
            clearError(cardName);
        }
    });

    expiryDate.addEventListener('blur', function() {
        if (!/^\d{2}\/\d{2}$/.test(expiryDate.value)) {
            showError(expiryDate, "Please enter a valid expiry date in MM/YY format.");
            expiryDate.style.animation = "shake 0.3s";
        } else {
            clearError(expiryDate);
        }
    });

    cvv.addEventListener('blur', function() {
        if (!/^\d{3}$/.test(cvv.value)) {
            showError(cvv, "Please enter a valid 3-digit CVV.");
            cvv.style.animation = "shake 0.3s";
        } else {
            clearError(cvv);

        }

    });

    const animationStyles = `
        @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
        }
    `;
    const shakeStyleSheet = document.createElement("style");
    shakeStyleSheet.innerText = animationStyles;
    document.head.appendChild(shakeStyleSheet);



    billingAddress.addEventListener('blur', function() {
        if (billingAddress.value.length < 5) {
            showError(billingAddress, "Please enter a valid billing address.");
        } else {
            clearError(billingAddress);
        }
    });

    const paymentForm = document.querySelector('form[action="process-payment.html"]');
    paymentForm.onsubmit = function(event) {
        if (document.querySelector('.error-message') && document.querySelector('.error-message').textContent !== '') {
            event.preventDefault();
            alert("Please fix the errors before submitting.");
        }
    };
});

