function generateCV() {
    // CV content template
    const cvTemplate = `
        <div class="cv-container" style="font-family: 'Arial', sans-serif; max-width: 800px; margin: 0 auto; padding: 40px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #2c3e50; margin-bottom: 10px;">Mohammed Maoodah</h1>
                <p style="color: #34495e; font-size: 18px;">Logistics Officer at World Food Programme</p>
            </div>

            <div style="margin-bottom: 30px;">
                <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Professional Summary</h2>
                <p style="color: #333; line-height: 1.6;">
                    Experienced Logistics Officer with expertise in supply chain management, warehouse operations, and IT systems integration.
                    Proven track record in optimizing logistics processes and implementing technological solutions for improved efficiency.
                </p>
            </div>

            <div style="margin-bottom: 30px;">
                <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Professional Experience</h2>
                <div style="margin-bottom: 20px;">
                    <h3 style="color: #2c3e50;">Logistics Officer</h3>
                    <p style="color: #666; margin: 5px 0;">World Food Programme | 2021 - Present</p>
                    <ul style="color: #333; line-height: 1.6;">
                        <li>Managing end-to-end supply chain operations</li>
                        <li>Coordinating with multiple stakeholders for efficient delivery</li>
                        <li>Implementing and maintaining logistics management systems</li>
                    </ul>
                </div>
            </div>

            <div style="margin-bottom: 30px;">
                <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Skills</h2>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                    <ul style="color: #333; line-height: 1.6;">
                        <li>Supply Chain Management</li>
                        <li>Warehouse Operations</li>
                        <li>Logistics Planning</li>
                        <li>Team Leadership</li>
                    </ul>
                    <ul style="color: #333; line-height: 1.6;">
                        <li>IT Systems Integration</li>
                        <li>Project Management</li>
                        <li>Process Optimization</li>
                        <li>Data Analysis</li>
                    </ul>
                </div>
            </div>

            <div style="margin-bottom: 30px;">
                <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Education & Certifications</h2>
                <ul style="color: #333; line-height: 1.6;">
                    <li>Bachelor's Degree in Logistics Management</li>
                    <li>CILT - Chartered Institute of Logistics and Transport</li>
                    <li>Project Management Professional (PMP)</li>
                    <li>Supply Chain Operations Professional (SCOP)</li>
                </ul>
            </div>

            <div style="text-align: center; margin-top: 40px; color: #666;">
                <p>Contact: mohammed.maoodah@example.com | LinkedIn: /in/mohammedmaoodah</p>
            </div>
        </div>
    `;

    // PDF generation options
    const opt = {
        margin: 1,
        filename: 'Mohammed_Maoodah_CV.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
    };

    // Create a temporary container
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = cvTemplate;
    document.body.appendChild(tempDiv);

    // Generate PDF
    html2pdf().set(opt).from(tempDiv).save().then(() => {
        document.body.removeChild(tempDiv);
    });
}

// Add click event listener when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.getElementById('downloadCV');
    if (downloadButton) {
        downloadButton.addEventListener('click', generateCV);
    }
});
