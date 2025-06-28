import os
import logging
from flask import Flask, render_template, request, flash, redirect, url_for
from flask_mail import Mail, Message

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key-change-in-production")

# Configure Flask-Mail
app.config['MAIL_SERVER'] = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.environ.get('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME', '')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD', '')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_DEFAULT_SENDER', 'vinit.portfolio@example.com')

mail = Mail(app)

@app.route('/')
def index():
    """Main portfolio page"""
    return render_template('index.html')

@app.route('/contact', methods=['POST'])
def contact():
    """Handle contact form submission"""
    try:
        name = request.form.get('name')
        email = request.form.get('email')
        subject = request.form.get('subject')
        message = request.form.get('message')
        
        if not all([name, email, subject, message]):
            flash('Please fill in all fields.', 'error')
            return redirect(url_for('index') + '#contact')
        
        # Create and send email
        msg = Message(
            subject=f"Portfolio Contact: {subject}",
            recipients=[app.config['MAIL_DEFAULT_SENDER']],
            body=f"""
New contact form submission:

Name: {name}
Email: {email}
Subject: {subject}

Message:
{message}
            """,
            reply_to=email
        )
        
        mail.send(msg)
        flash('Thank you for your message! I will get back to you soon.', 'success')
        
    except Exception as e:
        app.logger.error(f"Error sending email: {e}")
        flash('Sorry, there was an error sending your message. Please try again later.', 'error')
    
    return redirect(url_for('index') + '#contact')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
