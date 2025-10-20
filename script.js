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
    const themeToggleLabel = themeToggleBtn ? themeToggleBtn.querySelector('.theme-toggle-label') : null;
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
    updateToggleAppearance();

    // Listen for toggle button clicks
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = body.classList.toggle('dark-theme');
            // Save preference to localStorage
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateToggleAppearance();
        });
    }

    /**
     * Update the icon, text and accessible labels inside the theme toggle
     * button to reflect the next available mode. When the interface is in
     * dark mode the button invites the user to switch back to light mode,
     * and vice versa.
     */
    function updateToggleAppearance() {
        if (!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        if (!icon) return;
        const isDark = body.classList.contains('dark-theme');
        if (isDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            if (themeToggleLabel) {
                themeToggleLabel.textContent = 'Light mode';
            }
            themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
            themeToggleBtn.setAttribute('title', 'Switch to light mode');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            if (themeToggleLabel) {
                themeToggleLabel.textContent = 'Dark mode';
            }
            themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
            themeToggleBtn.setAttribute('title', 'Switch to dark mode');
        }
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        const menuIcon = menuToggle.querySelector('i');

        menuToggle.addEventListener('click', () => {
            const isOpen = navLinks.dataset.open === 'true';
            navLinks.dataset.open = (!isOpen).toString();
            menuToggle.setAttribute('aria-expanded', (!isOpen).toString());
            if (menuIcon) {
                menuIcon.classList.toggle('fa-bars', isOpen);
                menuIcon.classList.toggle('fa-xmark', !isOpen);
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.dataset.open = 'false';
                menuToggle.setAttribute('aria-expanded', 'false');
                if (menuIcon) {
                    menuIcon.classList.add('fa-bars');
                    menuIcon.classList.remove('fa-xmark');
                }
            });
        });
    }

})();
