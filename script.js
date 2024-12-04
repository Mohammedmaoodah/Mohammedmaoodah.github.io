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

    // Mobile menu functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const downloadCV = document.getElementById('downloadCV');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });

    // CV Generation and Download
    downloadCV.addEventListener('click', generateCV);
});

function generateCV() {
    // Create a new div for CV content
    const cvContent = document.createElement('div');
    cvContent.className = 'cv-content';
    
    // Get all the necessary information from the website
    const name = document.querySelector('.display-4').textContent;
    const title = document.querySelector('#tagline').textContent;
    const about = document.querySelector('#about p').textContent;
    const skills = Array.from(document.querySelectorAll('#skills .skill-item')).map(skill => skill.textContent);
    const certifications = Array.from(document.querySelectorAll('#certifications .certification-item')).map(cert => cert.textContent);
    const contact = document.querySelector('#contact').textContent;

    // Create CV HTML structure
    cvContent.innerHTML = `
        <div style="padding: 40px; max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #2c3e50; margin-bottom: 10px;">${name}</h1>
                <h2 style="color: #34495e; font-size: 1.2em; margin-bottom: 20px;">${title}</h2>
            </div>

            <div style="margin-bottom: 30px;">
                <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Professional Summary</h3>
                <p style="line-height: 1.6;">${about}</p>
            </div>

            <div style="margin-bottom: 30px;">
                <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Skills</h3>
                <ul style="list-style-type: none; padding: 0;">
                    ${skills.map(skill => `<li style="margin-bottom: 5px;">• ${skill}</li>`).join('')}
                </ul>
            </div>

            <div style="margin-bottom: 30px;">
                <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Certifications</h3>
                <ul style="list-style-type: none; padding: 0;">
                    ${certifications.map(cert => `<li style="margin-bottom: 5px;">• ${cert}</li>`).join('')}
                </ul>
            </div>

            <div>
                <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Contact Information</h3>
                <p style="line-height: 1.6;">${contact}</p>
            </div>
        </div>
    `;

    // PDF options
    const opt = {
        margin: 1,
        filename: 'Mohammed_Maoodah_CV.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    // Generate PDF
    html2pdf().set(opt).from(cvContent).save();
}
