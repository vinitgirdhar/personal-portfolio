# Vinit Girdhar Portfolio Website

## Overview

This is a modern, responsive portfolio website for Vinit Girdhar, a Full Stack Web Developer currently in his third year of B.Tech at St. Francis Institute of Technology (SFIT), Mumbai. The website showcases his skills, projects, and serves as a professional online presence to attract potential clients and employers.

The application is built as a single-page Flask web application with a focus on modern UI/UX design, featuring animated backgrounds, smooth scrolling, and a contact form with email functionality.

## System Architecture

### Frontend Architecture
- **Single Page Application (SPA)**: The website uses a single HTML template with JavaScript-driven navigation between sections
- **Responsive Design**: Built with Tailwind CSS for mobile-first responsive design
- **Modern UI/UX**: Features animated 3D cube backgrounds, smooth scrolling, and gradient styling
- **Component-based Structure**: Organized into distinct sections (Home, About, Projects, Skills, Contact)

### Backend Architecture
- **Flask Framework**: Lightweight Python web framework serving the portfolio content
- **Template Engine**: Uses Jinja2 templating for dynamic content rendering
- **Email Service Integration**: Flask-Mail for handling contact form submissions
- **Environment Configuration**: Uses environment variables for sensitive configuration

### Technology Stack
- **Backend**: Python 3.x with Flask
- **Frontend**: HTML5, CSS3 (Tailwind CSS), JavaScript (ES6+)
- **Email**: Flask-Mail with SMTP integration
- **Icons**: Font Awesome 6.4.0
- **Fonts**: Google Fonts (Inter family)
- **Deployment**: Configured for Replit hosting

## Key Components

### 1. Flask Application (`app.py`)
- **Route Handlers**: Main portfolio page and contact form processing
- **Email Configuration**: SMTP settings for Gmail integration
- **Error Handling**: Flash messages for user feedback
- **Security**: Session secret key configuration

### 2. Template System (`templates/index.html`)
- **Responsive Layout**: Mobile-first design with Tailwind CSS
- **Navigation**: Fixed header with smooth scrolling navigation
- **Content Sections**: Home, About, Projects, Skills, Contact
- **Interactive Elements**: Animated backgrounds and hover effects

### 3. Static Assets
- **CSS (`static/css/style.css`)**: Custom animations, button styles, and component styling
- **JavaScript (`static/js/script.js`)**: Interactive functionality including mobile menu, smooth scrolling, and form handling

### 4. Entry Point (`main.py`)
- **Development Server**: Runs Flask application with debug mode enabled
- **Host Configuration**: Set up for Replit hosting (0.0.0.0:5000)

## Data Flow

### Contact Form Workflow
1. User fills out contact form on the website
2. Form data is submitted via POST to `/contact` endpoint
3. Flask validates all required fields are present
4. Email message is composed using Flask-Mail
5. Email is sent via configured SMTP server
6. User receives feedback via flash messages
7. User is redirected back to contact section

### Page Rendering
1. User navigates to root URL (`/`)
2. Flask renders `index.html` template
3. Static assets (CSS, JS) are served
4. JavaScript initializes interactive components
5. Page sections are dynamically activated based on user navigation

## External Dependencies

### Core Dependencies
- **Flask**: Web framework for Python
- **Flask-Mail**: Email sending functionality
- **Tailwind CSS**: Utility-first CSS framework (CDN)
- **Font Awesome**: Icon library (CDN)
- **Google Fonts**: Typography (CDN)

### SMTP Configuration
- **Default Provider**: Gmail SMTP (smtp.gmail.com:587)
- **Authentication**: Username/password via environment variables
- **Security**: TLS encryption enabled

### Environment Variables Required
- `SESSION_SECRET`: Flask session security key
- `MAIL_USERNAME`: SMTP authentication username
- `MAIL_PASSWORD`: SMTP authentication password
- `MAIL_DEFAULT_SENDER`: Default sender email address
- `MAIL_SERVER`: SMTP server address (optional, defaults to Gmail)
- `MAIL_PORT`: SMTP server port (optional, defaults to 587)

## Deployment Strategy

### Replit Configuration
- **Host**: 0.0.0.0 (accessible from external connections)
- **Port**: 5000 (standard Flask development port)
- **Debug Mode**: Enabled for development environment
- **Static Files**: Served via Flask's built-in static file handler

### Production Considerations
- Session secret should be changed from development default
- Debug mode should be disabled
- SMTP credentials should be properly secured
- Consider using a production WSGI server (Gunicorn, uWSGI)

### File Structure
```
/
├── app.py                 # Main Flask application
├── main.py               # Entry point
├── templates/
│   └── index.html        # Main template
├── static/
│   ├── css/
│   │   └── style.css     # Custom styles
│   └── js/
│       └── script.js     # Interactive functionality
└── attached_assets/      # Project documentation
```

## Changelog
- June 28, 2025. Initial setup
- June 28, 2025. Updated layout: moved "Transform Ideas" to left, intro to right, removed profile photo from About section
- June 28, 2025. Added comprehensive Certificates section with interactive gallery featuring hover zoom, horizontal scrolling, and modal view
- June 28, 2025. Updated branding to "VG.dev", added real contact links (LinkedIn: www.linkedin.com/in/vinit-girdhar, GitHub: https://github.com/vinitgirdhar, Email: girdharvinit786@gmail.com)
- June 28, 2025. Removed contact form, simplified contact section to display information only, removed Flask/Tailwind CSS footer attribution
- June 28, 2025. Updated "Get In Touch" button to "My Resume" with download icon (link to be added later)
- June 28, 2025. Implemented comprehensive mobile responsiveness: optimized typography, spacing, touch targets, and layouts for mobile/tablet devices. Added responsive breakpoints for small (480px), medium (768px), and large screens

## User Preferences

Preferred communication style: Simple, everyday language.