document.addEventListener("DOMContentLoaded", function () {
    const doctorCards = document.querySelectorAll(".card");
    const doctorReviews = JSON.parse(localStorage.getItem("doctorReviews")) || {};

    function renderReviews(doctorName, reviewsContainer) {
        const reviews = doctorReviews[doctorName] || [];
        reviewsContainer.innerHTML = '';

        const averageRating = reviews.length
            ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
            : "No reviews yet";

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

    function showModal(message) {
        const modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        modal.style.display = "flex";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";
        modal.style.zIndex = "1000";


        const modalContent = document.createElement("div");
        modalContent.style.backgroundColor = "#fff";
        modalContent.style.padding = "20px";
        modalContent.style.borderRadius = "8px";
        modalContent.style.width = "300px";
        modalContent.style.textAlign = "center";


        const messageText = document.createElement("p");
        messageText.innerText = message;
        modalContent.appendChild(messageText);


        const closeButton = document.createElement("button");
        closeButton.innerText = "Close";
        closeButton.style.marginTop = "10px";
        closeButton.style.padding = "8px 12px";
        closeButton.style.border = "none";
        closeButton.style.backgroundColor = "#19585a";
        closeButton.style.color = "#fff";
        closeButton.style.cursor = "pointer";
        closeButton.style.borderRadius = "5px";

        closeButton.addEventListener("click", function () {
            document.body.removeChild(modal);
        });

        modalContent.appendChild(closeButton);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        modal.addEventListener("click", function (e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }


    function addReviewForm(doctorCard, doctorName) {
        const reviewsContainer = document.createElement("div");
        reviewsContainer.style.display = "none";
        reviewsContainer.style.marginTop = "15px";
        reviewsContainer.style.padding = "10px";
        reviewsContainer.style.borderTop = "1px solid #ccc";

        doctorCard.appendChild(reviewsContainer);
        renderReviews(doctorName, reviewsContainer);

        const toggleButton = document.createElement("button");
        toggleButton.innerText = "Show Reviews";
        toggleButton.style.backgroundColor = "#19585a";
        toggleButton.style.color = "white";
        toggleButton.style.border = "none";
        toggleButton.style.borderRadius = "5px";
        toggleButton.style.padding = "8px 12px";
        toggleButton.style.cursor = "pointer";
        toggleButton.style.marginTop = "10px";

        doctorCard.appendChild(toggleButton);

        toggleButton.addEventListener("click", () => {
            if (reviewsContainer.style.display === "none") {
                reviewsContainer.style.display = "block";
                toggleButton.innerText = "Hide Reviews";
            } else {
                reviewsContainer.style.display = "none";
                toggleButton.innerText = "Show Reviews";
            }
        });

        const form = document.createElement("form");
        form.style.marginTop = "10px";

        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.placeholder = "Your name";
        nameInput.required = true;
        nameInput.style.marginLeft = "20px";

        const ratingInput = document.createElement("input");
        ratingInput.type = "number";
        ratingInput.min = "1";
        ratingInput.max = "5";
        ratingInput.placeholder = "Rating (1-5)";
        ratingInput.required = true;
        ratingInput.style.marginLeft = "10px";

        const commentInput = document.createElement("input");
        commentInput.type = "text";
        commentInput.placeholder = "Your review";
        commentInput.required = true;
        commentInput.style.marginLeft = "20px";

        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.innerText = "Submit Review";
        submitButton.style.backgroundColor = "green";
        submitButton.style.color = "white";
        submitButton.style.border = "none";
        submitButton.style.borderRadius = "25px";
        submitButton.style.padding = "10px 20px";
        submitButton.style.fontSize = "16px";
        submitButton.style.cursor = "pointer";
        submitButton.style.display = "block";
        submitButton.style.margin = "20px auto";




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


            showModal("Thank you for your review!");
        });
    }

    doctorCards.forEach(card => {
        const doctorName = card.querySelector(".card-title").innerText;
        addReviewForm(card, doctorName);

    });



});



