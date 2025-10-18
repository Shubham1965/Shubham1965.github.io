/*
 * Portfolio Website Script
 *
 * Handles dynamic functionality such as dark/light theme toggling
 * and other interactive behaviours. Theme preferences are stored
 * in localStorage so your visitors' choice persists across sessions.
 */

/*
 * Immediately invoked function expression (IIFE) to initialise
 * interactive behaviours without relying on the DOMContentLoaded
 * event. When this script is loaded at the end of the body,
 * all DOM elements are already available.
 */
(function () {
    const body = document.body;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const yearSpan = document.getElementById('current-year');

    // Set current year in footer
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = currentYear;
    }

    // Initialise theme based on stored preference or system setting
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        if (savedTheme === 'dark') {
            body.classList.add('dark-theme');
        }
    } else {
        // Use system preference if available
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            body.classList.add('dark-theme');
        }
    }
    updateToggleIcon();

    // Listen for toggle button clicks
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = body.classList.toggle('dark-theme');
            // Save preference to localStorage
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateToggleIcon();
        });
    }

    /**
     * Update the icon inside the theme toggle button to reflect
     * the current theme. A moon icon indicates that clicking will
     * enable dark mode; a sun icon indicates light mode.
     */
    function updateToggleIcon() {
        if (!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        const isDark = body.classList.contains('dark-theme');
        if (isDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
})();