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
    
    // Get detailed information from the website
    const name = document.querySelector('.display-4').textContent;
    const title = document.querySelector('#tagline').textContent;
    const about = document.querySelector('#about p').textContent;
    
    // Get skills with categories
    const skillsSection = document.querySelector('#skills');
    const skillCategories = Array.from(skillsSection.querySelectorAll('h4')).map(category => ({
        name: category.textContent,
        skills: Array.from(category.nextElementSibling.querySelectorAll('li')).map(skill => skill.textContent)
    }));

    // Get detailed certifications
    const certifications = Array.from(document.querySelectorAll('#certifications .certification-item')).map(cert => ({
        name: cert.querySelector('h5').textContent,
        date: cert.querySelector('small').textContent,
        issuer: cert.querySelector('p').textContent
    }));

    // Get contact information
    const email = document.querySelector('.contact-email').textContent;
    const phone = document.querySelector('.contact-phone').textContent;
    const location = document.querySelector('.contact-location').textContent;
    const linkedin = document.querySelector('.contact-linkedin a').getAttribute('href');

    // Create professional CV HTML structure
    cvContent.innerHTML = `
        <div style="padding: 40px; max-width: 800px; margin: 0 auto; font-family: 'Calibri', sans-serif; color: #333;">
            <!-- Header -->
            <div style="text-align: left; margin-bottom: 30px; border-bottom: 3px solid #2c3e50; padding-bottom: 20px;">
                <h1 style="color: #2c3e50; margin: 0; font-size: 28px; text-transform: uppercase;">${name}</h1>
                <h2 style="color: #34495e; margin: 5px 0; font-size: 20px;">${title}</h2>
                <div style="margin-top: 15px; font-size: 14px;">
                    <p style="margin: 3px 0;"><strong>Email:</strong> ${email}</p>
                    <p style="margin: 3px 0;"><strong>Phone:</strong> ${phone}</p>
                    <p style="margin: 3px 0;"><strong>Location:</strong> ${location}</p>
                    <p style="margin: 3px 0;"><strong>LinkedIn:</strong> ${linkedin}</p>
                </div>
            </div>

            <!-- Professional Summary -->
            <div style="margin-bottom: 25px;">
                <h3 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 18px; text-transform: uppercase; border-bottom: 2px solid #3498db;">Professional Summary</h3>
                <p style="margin: 0; line-height: 1.6; text-align: justify;">${about}</p>
            </div>

            <!-- Skills -->
            <div style="margin-bottom: 25px;">
                <h3 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 18px; text-transform: uppercase; border-bottom: 2px solid #3498db;">Professional Skills</h3>
                ${skillCategories.map(category => `
                    <div style="margin-bottom: 15px;">
                        <h4 style="color: #34495e; margin: 10px 0 5px 0; font-size: 16px;">${category.name}</h4>
                        <p style="margin: 0; line-height: 1.4;">${category.skills.join(' • ')}</p>
                    </div>
                `).join('')}
            </div>

            <!-- Certifications -->
            <div style="margin-bottom: 25px;">
                <h3 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 18px; text-transform: uppercase; border-bottom: 2px solid #3498db;">Professional Certifications</h3>
                ${certifications.map(cert => `
                    <div style="margin-bottom: 12px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                            <strong style="color: #34495e;">${cert.name}</strong>
                            <span style="color: #666;">${cert.date}</span>
                        </div>
                        <p style="margin: 0; color: #666; font-style: italic;">${cert.issuer}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // PDF options for professional output
    const opt = {
        margin: [0.5, 0.75, 0.5, 0.75], // [top, right, bottom, left]
        filename: 'Mohammed_Maoodah_CV.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
            scale: 2,
            letterRendering: true,
            useCORS: true
        },
        jsPDF: { 
            unit: 'in', 
            format: 'a4', 
            orientation: 'portrait',
            compress: true
        }
    };

    // Generate high-quality PDF
    html2pdf().set(opt).from(cvContent).save();
}
