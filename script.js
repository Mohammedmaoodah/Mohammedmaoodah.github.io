// Dynamic content for personal website
document.addEventListener('DOMContentLoaded', () => {
    // Update tagline dynamically
    const tagline = document.getElementById('tagline');
    const taglines = [
        'Logistics Officer at World Food Programme',
        'Supply Chain Management Expert',
        'Humanitarian Operations Specialist',
        'Information Systems Professional'
    ];
    let currentTagline = 0;
    
    setInterval(() => {
        tagline.style.opacity = 0;
        setTimeout(() => {
            tagline.textContent = taglines[currentTagline];
            tagline.style.opacity = 1;
            currentTagline = (currentTagline + 1) % taglines.length;
        }, 500);
    }, 4000);

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate elements on scroll
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1
    });

    // Observe all cards and sections
    document.querySelectorAll('.card, .skill-category, .contact-item').forEach((element) => {
        observer.observe(element);
    });

    // Add hover effect to skill items
    document.querySelectorAll('.skill-list li').forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.color = '#1a237e';
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = '';
        });
    });
});
