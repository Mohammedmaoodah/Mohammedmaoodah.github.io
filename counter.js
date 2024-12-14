// Initialize visitor counter
document.addEventListener('DOMContentLoaded', function() {
    // Create counter element
    const counterDiv = document.createElement('div');
    counterDiv.className = 'bg-light py-4';
    counterDiv.innerHTML = `
        <div class="container text-center">
            <h5 class="mb-3">Website Visitors</h5>
            <div id="visitor-count" class="h4"></div>
        </div>
    `;

    // Insert before footer
    const footer = document.querySelector('footer');
    footer.parentNode.insertBefore(counterDiv, footer);

    // Initialize count from localStorage or start at 0
    let count = localStorage.getItem('visitorCount') || 0;
    count = parseInt(count) + 1;
    localStorage.setItem('visitorCount', count);
    
    // Display count
    document.getElementById('visitor-count').textContent = count;
});
