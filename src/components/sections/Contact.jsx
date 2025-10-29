/**
 * Contact Component - Contact form
 * Designed to accept data props and be backend-ready
 */
const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        // Submit to 3rd party form service (replace with your actual endpoint)
        fetch('https://formspree.io/f/your-form-id', {
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
            } else {
                alert('Failed to send message. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to send message. Please try again.');
        });
    };

    return (
        <div className="h-full flex items-center justify-center">
            <div className="card w-full">
                <h3 className="text-xl md:text-2xl font-bold text-space-purple mb-6 text-center">
                    Get In Touch
                </h3>
                <p className="text-gray-300 mb-6 text-center text-sm md:text-base">
                    Have a question or want to work together? Send me a message!
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                            Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-3 py-2 bg-space-dark border border-space-purple/30 rounded-lg focus:outline-none focus:border-space-purple text-white placeholder-gray-500"
                            placeholder="Your name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-3 py-2 bg-space-dark border border-space-purple/30 rounded-lg focus:outline-none focus:border-space-purple text-white placeholder-gray-500"
                            placeholder="your.email@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                            Message *
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows="4"
                            className="w-full px-3 py-2 bg-space-dark border border-space-purple/30 rounded-lg focus:outline-none focus:border-space-purple text-white placeholder-gray-500 resize-none"
                            placeholder="Your message here..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-space-purple hover:bg-space-purple/80 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-space-purple focus:ring-offset-2 focus:ring-offset-space-darker"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
