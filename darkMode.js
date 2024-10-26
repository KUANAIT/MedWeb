function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');

    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

function loadThemePreference() {
    const theme = localStorage.getItem('theme');

    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('theme-toggle').checked = true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const toggleCheckbox = document.createElement('input');
    toggleCheckbox.type = 'checkbox';
    toggleCheckbox.id = 'theme-toggle';

    const label = document.createElement('label');
    label.className = 'label';
    label.appendChild(toggleCheckbox);

    const switchDiv = document.createElement('div');
    switchDiv.className = 'switch';
    label.appendChild(switchDiv);

    document.body.appendChild(label);

    toggleCheckbox.addEventListener('change', toggleDarkMode);

    loadThemePreference();
});
console.log('Script loaded');


