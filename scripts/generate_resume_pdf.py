import os

def create_resume_pdf(output_path):
    # Dimensions for A4: 595.28 x 841.89 points
    # We will use Helvetica and Helvetica-Bold
    stream_lines = [
        "BT",
        # Title
        "/F1 22 Tf",
        "50 790 Td",
        "(GURU PRASATH M) Tj",
        "0 -18 Td",
        "/F2 10 Tf",
        "(Software Engineer & Independent Web Solutions Provider) Tj",
        "0 -14 Td",
        "(Email: mguruprasath01@gmail.com  |  GitHub: github.com/guru1301  |  LinkedIn: linkedin.com/in/guru-prasath-m130105) Tj",
        "0 -12 Td",
        "(Location: India  |  Status: Open to Full-Time Roles & Client Projects) Tj",
        
        # Horizontal rule 1
        "ET",
        "0.8 0.1 0.15 rg",
        "50 736 495 1.5 re f",
        "0 0 0 rg",
        "BT",
        
        # Professional Summary
        "50 718 Td",
        "/F1 12 Tf",
        "(PROFESSIONAL SUMMARY) Tj",
        "0 -14 Td",
        "/F2 9.5 Tf",
        "(Computer Science & Business Systems graduate building practical software systems, backend APIs, database-) Tj",
        "0 -12 Td",
        "(driven applications, and responsive client websites. Combines strong engineering fundamentals with verified) Tj",
        "0 -12 Td",
        "(delivery across full-stack applications and real client web solutions.) Tj",
        
        # Technical Competencies
        "0 -22 Td",
        "/F1 12 Tf",
        "(TECHNICAL COMPETENCIES) Tj",
        "0 -14 Td",
        "/F1 9.5 Tf",
        "(Programming Languages: ) Tj",
        "/F2 9.5 Tf",
        "(Python, Java, JavaScript, SQL) Tj",
        "0 -13 Td",
        "/F1 9.5 Tf",
        "(Backend & APIs: ) Tj",
        "/F2 9.5 Tf",
        "(FastAPI, Flask, Spring Boot, Node.js, Express, RESTful APIs, Postman) Tj",
        "0 -13 Td",
        "/F1 9.5 Tf",
        "(Frontend & Web: ) Tj",
        "/F2 9.5 Tf",
        "(React, HTML5, CSS3, Tailwind CSS, Responsive Design) Tj",
        "0 -13 Td",
        "/F1 9.5 Tf",
        "(Databases: ) Tj",
        "/F2 9.5 Tf",
        "(PostgreSQL, MySQL, MongoDB Atlas, SQLite, Schema Design) Tj",
        "0 -13 Td",
        "/F1 9.5 Tf",
        "(Data & Analytics: ) Tj",
        "/F2 9.5 Tf",
        "(Power BI, DAX, Power Query, Pandas, Dimensional Data Modeling) Tj",
        "0 -13 Td",
        "/F1 9.5 Tf",
        "(DevOps & Tools: ) Tj",
        "/F2 9.5 Tf",
        "(Git, GitHub, Docker, VS Code, Unit Testing, Code Review) Tj",
        
        # Independent Client Work
        "0 -22 Td",
        "/F1 12 Tf",
        "(INDEPENDENT CLIENT WORK & WEB SOLUTIONS) Tj",
        "0 -14 Td",
        "/F1 10 Tf",
        "(Client Website 01 - Business Digital Presence) Tj",
        "300 0 Td",
        "/F2 9 Tf",
        "(React, Tailwind CSS, JavaScript) Tj",
        "-300 -12 Td",
        "/F2 9 Tf",
        "(- Translated client business requirements into a responsive, modern digital presence.) Tj",
        "0 -11 Td",
        "(- Engineered modular component architecture with accessible navigation and optimized asset delivery.) Tj",
        
        "0 -16 Td",
        "/F1 10 Tf",
        "(Client Website 02 - Web Application & Portal Presentation) Tj",
        "300 0 Td",
        "/F2 9 Tf",
        "(React, Tailwind CSS, JavaScript) Tj",
        "-300 -12 Td",
        "/F2 9 Tf",
        "(- Developed client-focused website from requirements through implementation and responsive presentation.) Tj",
        "0 -11 Td",
        "(- Implemented structured service showcases and client inquiry workflows.) Tj",
        
        # Key Engineering Projects
        "0 -22 Td",
        "/F1 12 Tf",
        "(KEY ENGINEERING PROJECTS) Tj",
        
        "0 -14 Td",
        "/F1 10 Tf",
        "(RailGo - Online Railway Reservation Platform) Tj",
        "280 0 Td",
        "/F2 9 Tf",
        "(Node.js, Express, Spring Boot, MongoDB) Tj",
        "-280 -12 Td",
        "/F2 9 Tf",
        "(- Full-stack platform supporting train search, seat management, fare calculation, and Razorpay integration.) Tj",
        "0 -11 Td",
        "(- Implemented Google OAuth authentication via Passport.js and MongoDB-backed booking records.) Tj",
        
        "0 -16 Td",
        "/F1 10 Tf",
        "(FlowAI - Remote Work Telemetry & Digital Twin) Tj",
        "280 0 Td",
        "/F2 9 Tf",
        "(Spring Boot, PostgreSQL, MongoDB, React, Docker) Tj",
        "-280 -12 Td",
        "/F2 9 Tf",
        "(- Processed activity telemetry streams and generated productivity indicators without invasive tracking.) Tj",
        "0 -11 Td",
        "(- Architected dual-database layer with PostgreSQL for metadata and MongoDB for event streams.) Tj",
        
        "0 -16 Td",
        "/F1 10 Tf",
        "(The People's Ledger - Tamil Nadu Election Analytics) Tj",
        "280 0 Td",
        "/F2 9 Tf",
        "(Python, Pandas, SQL, Power BI, DAX) Tj",
        "-280 -12 Td",
        "/F2 9 Tf",
        "(- Analyzed 234 legislative assembly constituencies with vote-share, margin, and alliance modeling.) Tj",
        
        # Education & Training
        "0 -22 Td",
        "/F1 12 Tf",
        "(EDUCATION & PROFESSIONAL TRAINING) Tj",
        "0 -14 Td",
        "/F1 9.5 Tf",
        "(B.Tech - Computer Science & Business Systems) Tj",
        "/F2 9.5 Tf",
        "( | Saranathan College of Engineering (7.98 CGPA) | 2022 - 2026) Tj",
        "0 -13 Td",
        "/F1 9.5 Tf",
        "(Data Analytics & Technology Training) Tj",
        "/F2 9.5 Tf",
        "( | ICT Academy / Infosys Foundation (Power BI, DAX, SQL) | 2025 - 2026) Tj",
        "0 -13 Td",
        "/F1 9.5 Tf",
        "(Business Intelligence / CRM Intern) Tj",
        "/F2 9.5 Tf",
        "( | Dovyo Technologies (Workflows & Operational Data) | 2024) Tj",
        
        "ET"
    ]
    
    stream_content = "\n".join(stream_lines).encode("latin-1")
    stream_len = len(stream_content)
    
    objects = []
    
    # 1: Catalog
    objects.append(b"<< /Type /Catalog /Pages 2 0 R >>")
    # 2: Pages
    objects.append(b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>")
    # 3: Page
    objects.append(b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>")
    # 4: Contents Stream
    objects.append(f"<< /Length {stream_len} >>\nstream\n".encode("latin-1") + stream_content + b"\nendstream")
    # 5: Font F1 (Helvetica-Bold)
    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")
    # 6: Font F2 (Helvetica)
    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
    
    # Write PDF structure
    pdf_bytes = bytearray()
    pdf_bytes.extend(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    
    offsets = []
    for i, obj in enumerate(objects):
        offsets.append(len(pdf_bytes))
        pdf_bytes.extend(f"{i+1} 0 obj\n".encode("latin-1"))
        pdf_bytes.extend(obj)
        pdf_bytes.extend(b"\nendobj\n")
        
    xref_offset = len(pdf_bytes)
    pdf_bytes.extend(b"xref\n")
    pdf_bytes.extend(f"0 {len(objects) + 1}\n".encode("latin-1"))
    pdf_bytes.extend(b"0000000000 65535 f \n")
    for off in offsets:
        pdf_bytes.extend(f"{off:010d} 00000 n \n".encode("latin-1"))
        
    pdf_bytes.extend(b"trailer\n")
    pdf_bytes.extend(f"<< /Size {len(objects) + 1} /Root 1 0 R >>\n".encode("latin-1"))
    pdf_bytes.extend(b"startxref\n")
    pdf_bytes.extend(f"{xref_offset}\n".encode("latin-1"))
    pdf_bytes.extend(b"%%EOF\n")
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "wb") as f:
        f.write(pdf_bytes)
    print("Resume PDF successfully generated at:", output_path)

if __name__ == "__main__":
    create_resume_pdf(r"c:\Users\Asus-2025\Desktop\New folder (4)\public\assets\resume.pdf")
