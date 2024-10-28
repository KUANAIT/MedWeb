document.addEventListener('DOMContentLoaded', function () {
    const cardNumber = document.getElementById('card-number');
    const cardName = document.getElementById('card-name');
    const expiryDate = document.getElementById('expiry-date');
    const cvv = document.getElementById('cvv');
    const billingAddress = document.getElementById('billing-address');


    const errorModal = createModal();
    errorModal.modal.style.display = 'none';
    document.body.appendChild(errorModal.modal);

    function createModal() {
        const modal = document.createElement('div');
        modal.style.display = 'none';
        modal.style.position = 'fixed';
        modal.style.zIndex = '1000';
        modal.style.left = '0';
        modal.style.top = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.transition = 'opacity 0.3s ease';

        const modalContent = document.createElement('div');
        modalContent.style.background = 'white';
        modalContent.style.borderRadius = '8px';
        modalContent.style.padding = '20px';
        modalContent.style.width = '300px';
        modalContent.style.textAlign = 'center';
        modalContent.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';

        const modalMessage = document.createElement('p');
        modalMessage.style.margin = '20px 0';
        modalMessage.style.fontSize = '16px';
        modalMessage.style.color = '#333';

        const closeButton = document.createElement('button');
        closeButton.innerText = 'OK';
        closeButton.style.backgroundColor = '#19585a';
        closeButton.style.color = 'white';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '5px';
        closeButton.style.padding = '10px 15px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.fontSize = '16px';
        closeButton.style.transition = 'background-color 0.3s';

        modalContent.appendChild(modalMessage);
        modalContent.appendChild(closeButton);
        modal.appendChild(modalContent);

        closeButton.addEventListener('click', function () {
            modal.style.display = 'none';
        });

        return { modal, modalMessage };
    }

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

    cardNumber.addEventListener('input', function () {
        // Limit input to 16 digits
        if (cardNumber.value.length > 16) {
            cardNumber.value = cardNumber.value.slice(0, 16);
            showError(cardNumber, "Card number cannot exceed 16 digits.");
            cardNumber.style.animation = "shake 0.3s";
        } else {
            clearError(cardNumber);
        }
    });

    cardNumber.addEventListener('blur', function () {
        if (!/^\d{16}$/.test(cardNumber.value)) {
            showError(cardNumber, "Please enter a valid 16-digit card number.");
            cardNumber.style.animation = "shake 0.3s";
        } else {
            clearError(cardNumber);
        }
    });

    cardName.addEventListener('blur', function () {
        if (!/^[A-Za-z\s]+$/.test(cardName.value)) {
            showError(cardName, "Please enter a valid name with letters only.");
            cardName.style.animation = "shake 0.3s";
        } else {
            clearError(cardName);
        }
    });

    expiryDate.addEventListener('blur', function () {
        if (!/^\d{2}\/\d{2}$/.test(expiryDate.value)) {
            showError(expiryDate, "Please enter a valid expiry date in MM/YY format.");
            expiryDate.style.animation = "shake 0.3s";
        } else {
            clearError(expiryDate);
        }
    });

    cvv.type = 'password';

    cvv.addEventListener('blur', function () {
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

    billingAddress.addEventListener('blur', function () {
        if (billingAddress.value.length < 5) {
            showError(billingAddress, "Please enter a valid billing address.");
        } else {
            clearError(billingAddress);
        }
    });

    const paymentForm = document.querySelector('form[action="process-payment.html"]');
    paymentForm.onsubmit = function (event) {
        event.preventDefault();

        if (document.querySelector('.error-message') && document.querySelector('.error-message').textContent !== '') {

            errorModal.modalMessage.textContent = "Please fix the errors before submitting.";
            errorModal.modal.style.display = 'flex';
            return;
        }


        errorModal.modalMessage.textContent = "Payment was successful!";
        errorModal.modal.style.display = 'flex';
    };
});
