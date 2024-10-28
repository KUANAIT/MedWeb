document.addEventListener("DOMContentLoaded", () => {
    const backToTopButton = document.createElement("button");
    backToTopButton.innerText = "↑ Top";
    backToTopButton.style.position = "fixed";
    backToTopButton.style.bottom = "20px";
    backToTopButton.style.right = "20px";
    backToTopButton.style.padding = "10px 20px";
    backToTopButton.style.fontSize = "16px";
    backToTopButton.style.display = "none";
    backToTopButton.style.cursor = "pointer";
    backToTopButton.style.backgroundColor = "#19585a";
    backToTopButton.style.color = "#fff";
    backToTopButton.style.border = "none";
    backToTopButton.style.borderRadius = "5px";
    backToTopButton.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.2)";

    document.body.appendChild(backToTopButton);

    function toggleBackToTopButton() {
        if (window.scrollY > 100) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    }

    window.addEventListener("scroll", toggleBackToTopButton);

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
