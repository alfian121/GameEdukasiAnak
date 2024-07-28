document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');

    dropdownToggle.addEventListener('click', function() {
        this.nextElementSibling.classList.toggle('active');
    });
});