/**
 * Contact Component - Contact form
 * 
 * @param {function} onClose - Function to close the modal
 */
const Contact = ({ onClose }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        fetch('https://formspree.io/f/mvgvwwaq', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    alert('Message sent successfully!');
                    form.reset();
                    // Close the modal after successful send
                    if (onClose) {
                        setTimeout(() => {
                            onClose();
                        }, 500); // Small delay to allow user to see the success message
                    }
                } else {
                    alert('Failed to send message. Please try again.');
                }
            })
            .catch(() => {
                alert('Failed to send message. Please try again.');
            });
    };

    return (
        <div className="contact-container">
            <div className="contact-card">
                <h3 className="contact-title">
                    Get in touch
                </h3>

                <form onSubmit={handleSubmit} className="contact-form">
                    <div>
                        <label htmlFor="name" className="contact-label">
                            Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="contact-input"
                            placeholder="Your name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="contact-label">
                            Email *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="contact-input"
                            placeholder="email@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="contact-label">
                            Message *
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows="4"
                            className="contact-textarea"
                            placeholder="Your message here..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="contact-button"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
