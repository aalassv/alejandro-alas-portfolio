document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateButtonStatus(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateButtonStatus(newTheme);
    });

    function updateButtonStatus(theme) {
        if (theme === 'dark') {
            themeToggleBtn.innerHTML = '<span class="icon">☀️</span> Day mode';
        } else {
            themeToggleBtn.innerHTML = '<span class="icon">🌙</span> Night mode';
        }
    }
});