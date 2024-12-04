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

    // Get the navbar toggler and collapse element
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Add click event listener to all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            // Check if navbar is expanded (mobile view)
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                // Close the navbar
                navbarCollapse.classList.remove('show');
            }
        });
    });

    // CV generation functionality
    async function generateCV() {
        try {
            // Show loading state
            const btn = document.querySelector('.btn-cv');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Generating...';
            btn.disabled = true;

            // Fetch the CV template
            const response = await fetch('cv-template.html');
            let cvHTML = await response.text();

            // Get data from the main page
            const name = document.querySelector('h1.display-4').textContent;
            const title = document.querySelector('#tagline').textContent;
            
            // Get experience items
            const experienceItems = Array.from(document.querySelectorAll('#experience .experience-item')).map(item => ({
                title: item.querySelector('h4').textContent,
                date: item.querySelector('.date').textContent,
                description: item.querySelector('p:not(.date)').textContent
            }));

            // Get education items
            const educationItems = Array.from(document.querySelectorAll('#education .education-item')).map(item => ({
                degree: item.querySelector('h4').textContent,
                school: item.querySelector('.institution').textContent,
                date: item.querySelector('.date').textContent
            }));

            // Get skills
            const skills = Array.from(document.querySelectorAll('#skills .skill-item')).map(item => 
                item.textContent.trim()
            );

            // Get certifications
            const certifications = Array.from(document.querySelectorAll('#certifications .certification-item')).map(item => ({
                name: item.querySelector('h4').textContent,
                date: item.querySelector('.date').textContent
            }));

            // Replace template placeholders with actual data
            cvHTML = cvHTML.replace('Mohammed Maoodah', name)
                          .replace('Logistics Officer at World Food Programme', title);

            // Generate PDF
            const element = document.createElement('div');
            element.innerHTML = cvHTML;
            document.body.appendChild(element);

            const opt = {
                margin: 1,
                filename: 'Mohammed_Maoodah_CV.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
            };

            await html2pdf().set(opt).from(element).save();

            // Cleanup
            document.body.removeChild(element);
            
            // Reset button
            btn.innerHTML = originalText;
            btn.disabled = false;
        } catch (error) {
            console.error('Error generating CV:', error);
            alert('Error generating CV. Please try again.');
            
            // Reset button on error
            const btn = document.querySelector('.btn-cv');
            btn.innerHTML = '<i class="fas fa-download me-2"></i>Download CV';
            btn.disabled = false;
        }
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const navbar = document.querySelector('.navbar-collapse');
        const toggleButton = document.querySelector('.navbar-toggler');
        
        if (navbar.classList.contains('show') && 
            !navbar.contains(event.target) && 
            !toggleButton.contains(event.target)) {
            navbar.classList.remove('show');
        }
    });
});
