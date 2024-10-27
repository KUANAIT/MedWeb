document.addEventListener("DOMContentLoaded", () => {
    const burgerIcon = document.createElement('div');
    burgerIcon.classList.add('burger-icon');
    burgerIcon.innerHTML = `
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
    `;
    document.querySelector('nav').prepend(burgerIcon);

    burgerIcon.addEventListener('click', () => {
        const nav = document.querySelector('.nav');
        nav.classList.toggle('active');
        burgerIcon.classList.toggle('open');
    });
});