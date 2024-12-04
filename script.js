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
    
    // Get education details
    const education = Array.from(document.querySelectorAll('#education .education-item')).map(edu => ({
        degree: edu.querySelector('h5').textContent,
        institution: edu.querySelector('h6').textContent,
        date: edu.querySelector('small').textContent,
        details: edu.querySelector('p') ? edu.querySelector('p').textContent : ''
    }));

    // Get skills with categories
    const skillCategories = Array.from(document.querySelectorAll('#skills .skill-category')).map(category => ({
        name: category.querySelector('h4').textContent,
        skills: Array.from(category.querySelectorAll('li')).map(skill => skill.textContent.trim())
    }));

    // Get detailed certifications
    const certifications = Array.from(document.querySelectorAll('#certifications .certification-item')).map(cert => ({
        name: cert.querySelector('h5').textContent,
        issuer: cert.querySelector('p').textContent,
        date: cert.querySelector('small').textContent
    }));

    // Get contact information
    const email = document.querySelector('.contact-email').textContent;
    const phone = document.querySelector('.contact-phone').textContent;
    const location = document.querySelector('.contact-location').textContent;
    const linkedin = document.querySelector('.contact-linkedin a').getAttribute('href');

    // Create professional CV HTML structure
    cvContent.innerHTML = `
        <div style="padding: 40px 50px; max-width: 850px; margin: 0 auto; font-family: 'Calibri', sans-serif; color: #333; line-height: 1.6;">
            <!-- Header -->
            <div style="border-bottom: 2px solid #2c3e50; padding-bottom: 20px; margin-bottom: 25px;">
                <h1 style="color: #2c3e50; margin: 0; font-size: 32px; text-transform: uppercase; letter-spacing: 2px;">${name}</h1>
                <h2 style="color: #34495e; margin: 8px 0; font-size: 22px; font-weight: normal;">${title}</h2>
                <div style="margin-top: 15px; font-size: 15px; display: flex; flex-wrap: wrap; gap: 15px;">
                    <span><i class="fas fa-envelope"></i> ${email}</span>
                    <span><i class="fas fa-phone"></i> ${phone}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${location}</span>
                    <span><i class="fab fa-linkedin"></i> ${linkedin}</span>
                </div>
            </div>

            <!-- Professional Summary -->
            <div style="margin-bottom: 25px;">
                <h3 style="color: #2c3e50; margin: 0 0 12px 0; font-size: 20px; text-transform: uppercase; border-bottom: 2px solid #3498db; padding-bottom: 5px;">
                    Professional Summary
                </h3>
                <p style="margin: 0; line-height: 1.6; text-align: justify;">${about}</p>
            </div>

            <!-- Education -->
            <div style="margin-bottom: 25px;">
                <h3 style="color: #2c3e50; margin: 0 0 12px 0; font-size: 20px; text-transform: uppercase; border-bottom: 2px solid #3498db; padding-bottom: 5px;">
                    Education
                </h3>
                ${education.map(edu => `
                    <div style="margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <div>
                                <h4 style="color: #2c3e50; margin: 0; font-size: 17px;">${edu.degree}</h4>
                                <h5 style="color: #34495e; margin: 5px 0; font-size: 16px; font-weight: normal;">${edu.institution}</h5>
                            </div>
                            <span style="color: #666; font-size: 15px;">${edu.date}</span>
                        </div>
                        ${edu.details ? `<p style="margin: 5px 0 0 0; color: #555;">${edu.details}</p>` : ''}
                    </div>
                `).join('')}
            </div>

            <!-- Professional Skills -->
            <div style="margin-bottom: 25px;">
                <h3 style="color: #2c3e50; margin: 0 0 12px 0; font-size: 20px; text-transform: uppercase; border-bottom: 2px solid #3498db; padding-bottom: 5px;">
                    Professional Skills
                </h3>
                ${skillCategories.map(category => `
                    <div style="margin-bottom: 15px;">
                        <h4 style="color: #34495e; margin: 0 0 8px 0; font-size: 17px;">${category.name}</h4>
                        <p style="margin: 0; color: #555; line-height: 1.4;">
                            ${category.skills.join(' • ')}
                        </p>
                    </div>
                `).join('')}
            </div>

            <!-- Professional Certifications -->
            <div style="margin-bottom: 25px;">
                <h3 style="color: #2c3e50; margin: 0 0 12px 0; font-size: 20px; text-transform: uppercase; border-bottom: 2px solid #3498db; padding-bottom: 5px;">
                    Professional Certifications
                </h3>
                ${certifications.map(cert => `
                    <div style="margin-bottom: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <h4 style="color: #2c3e50; margin: 0; font-size: 17px;">${cert.name}</h4>
                            <span style="color: #666; font-size: 15px;">${cert.date}</span>
                        </div>
                        <p style="margin: 5px 0 0 0; color: #555; font-style: italic;">${cert.issuer}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // PDF options for professional output
    const opt = {
        margin: [0.6, 0.8, 0.6, 0.8],
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
