function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

function animateOnScroll() {
    const elements = document.querySelectorAll('h1, h2, h3, a, img');
    elements.forEach((element) => {
        if (isInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('DOMContentLoaded', animateOnScroll);

