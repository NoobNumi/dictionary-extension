document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const logo = document.getElementById('logo');
    const lightSvg = document.getElementById('light');
    const darkSvg = document.getElementById('dark');

    // Function to toggle dark mode
    function toggleDarkMode() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light'); // Save theme preference
            lightSvg.classList.remove('hidden'); // Show light mode SVG
            darkSvg.classList.add('hidden'); // Hide dark mode SVG
            logo.src = "images/logo96.png";
        } else {
            document.documentElement.classList.add('dark');

            localStorage.setItem('color-theme', 'dark'); // Save theme preference
            lightSvg.classList.add('hidden'); // Hide light mode SVG
            darkSvg.classList.remove('hidden'); // Show dark mode SVG
            logo.src = "images/logo96-light.png";
        }
    }

    // Set initial theme based on localStorage
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        themeToggle.checked = true;
        lightSvg.classList.add('hidden'); // Hide light mode SVG
        darkSvg.classList.remove('hidden') // Show dark mode SVG
    } else {
        lightSvg.classList.remove('hidden');
        darkSvg.classList.add('hidden');
    }

    // Toggle dark mode when the checkbox is clicked
    themeToggle.addEventListener('change', toggleDarkMode);
});