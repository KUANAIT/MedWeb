
document.addEventListener("DOMContentLoaded", function () {
    const doctorCards = document.querySelectorAll(".card");

    const doctorReviews = JSON.parse(localStorage.getItem("doctorReviews")) || {};

    function renderReviews(doctorName, reviewsContainer) {
        const reviews = doctorReviews[doctorName] || [];

        reviewsContainer.innerHTML = '';

        const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);

        const avgRatingElem = document.createElement("p");
        avgRatingElem.innerText = `Average Rating: ${averageRating} ⭐`;
        avgRatingElem.style.fontWeight = "bold";
        avgRatingElem.style.marginBottom = "10px";
        reviewsContainer.appendChild(avgRatingElem);

        reviews.forEach(review => {
            const reviewItem = document.createElement("div");
            reviewItem.style.marginBottom = "10px";

            const reviewer = document.createElement("strong");
            reviewer.innerText = `${review.reviewer}: `;
            reviewer.style.display = "block";
            reviewer.style.color = "#333";

            const rating = document.createElement("span");
            rating.innerText = "⭐".repeat(review.rating);
            rating.style.color = "gold";

            const comment = document.createElement("p");
            comment.innerText = review.comment;
            comment.style.margin = "5px 0";
            comment.style.color = "#555";

            reviewItem.appendChild(reviewer);
            reviewItem.appendChild(rating);
            reviewItem.appendChild(comment);
            reviewsContainer.appendChild(reviewItem);
        });
    }

    function addReviewForm(doctorCard, doctorName) {
        const reviewsContainer = document.createElement("div");
        reviewsContainer.style.marginTop = "15px";
        reviewsContainer.style.padding = "10px";
        reviewsContainer.style.borderTop = "1px solid #ccc";
        doctorCard.appendChild(reviewsContainer);

        renderReviews(doctorName, reviewsContainer);

        const form = document.createElement("form");
        form.style.marginTop = "10px";

        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.placeholder = "Your name";
        nameInput.required = true;
        nameInput.style.marginRight = "5px";

        const ratingInput = document.createElement("input");
        ratingInput.type = "number";
        ratingInput.min = "1";
        ratingInput.max = "5";
        ratingInput.placeholder = "Rating (1-5)";
        ratingInput.required = true;
        ratingInput.style.marginRight = "5px";

        const commentInput = document.createElement("input");
        commentInput.type = "text";
        commentInput.placeholder = "Your review";
        commentInput.required = true;
        commentInput.style.marginRight = "5px";

        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.innerText = "Submit Review";
        submitButton.style.backgroundColor = "#90ee90";
        submitButton.style.color = "white";
        submitButton.style.border = "none";
        submitButton.style.borderRadius = "25px";
        submitButton.style.padding = "10px 20px";
        submitButton.style.fontSize = "16px";
        submitButton.style.cursor = "pointer";
        submitButton.style.transition = "background-color 0.3s";
        submitButton.style.display = "block";
        submitButton.style.margin = "20px auto";

        submitButton.addEventListener("mouseenter", () => {
            submitButton.style.backgroundColor = "#76c676";
            submitButton.style.transform = "scale(1.008)";
        });
        submitButton.addEventListener("mouseleave", () => {
            submitButton.style.backgroundColor = "#90ee90";
            submitButton.style.transform = "scale(1)";
        });

        form.appendChild(nameInput);
        form.appendChild(ratingInput);
        form.appendChild(commentInput);
        form.appendChild(submitButton);

        doctorCard.appendChild(form);

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const reviewer = nameInput.value;
            const rating = parseInt(ratingInput.value);
            const comment = commentInput.value;

            if (rating < 1 || rating > 5) {
                alert("Please enter a rating between 1 and 5.");
                return;
            }

            if (!doctorReviews[doctorName]) {
                doctorReviews[doctorName] = [];
            }
            doctorReviews[doctorName].push({ reviewer, rating, comment });

            localStorage.setItem("doctorReviews", JSON.stringify(doctorReviews));

            nameInput.value = '';
            ratingInput.value = '';
            commentInput.value = '';

            renderReviews(doctorName, reviewsContainer);
        });
    }

    doctorCards.forEach(card => {
        const doctorName = card.querySelector(".card-title").innerText;
        addReviewForm(card, doctorName);
    });
});


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
        } else {
            clearError(cardNumber);
        }
    });

    cardName.addEventListener('blur', function() {
        if (!/^[A-Za-z\s]+$/.test(cardName.value)) {
            showError(cardName, "Please enter a valid name with letters only.");
        } else {
            clearError(cardName);
        }
    });

    expiryDate.addEventListener('blur', function() {
        if (!/^\d{2}\/\d{2}$/.test(expiryDate.value)) {
            showError(expiryDate, "Please enter a valid expiry date in MM/YY format.");
        } else {
            clearError(expiryDate);
        }
    });

    cvv.addEventListener('blur', function() {
        if (!/^\d{3}$/.test(cvv.value)) {
            showError(cvv, "Please enter a valid 3-digit CVV.");
        } else {
            clearError(cvv);
        }
    });

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
