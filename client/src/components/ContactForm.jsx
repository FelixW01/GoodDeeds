import { useState } from 'react';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !message) {
            setError('Please fill out all fields');
            setSuccess(false); // Ensure success alert is hidden
        } else {
            // Simulate form submission (replace with actual API call)
            console.log('Form submitted:', name, email, message);
            setError(null);
            setSuccess(true); // Show success alert

            // Reset form fields
            setName('');
            setEmail('');
            setMessage('');

            // Hide success alert after 1 second
            setTimeout(() => {
                setSuccess(false);
            }, 1000);
        }
    };

    return (
        <>
            <div className="hero bg-gradient-to-r from-[#F7F7F7] to-[#E5D8F5] xl:p-14 w-full xl:w-8/12 xl:mt-12 xl:rounded-lg">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Get in Touch</h1>
                        <p className="py-6">
                            We'd love to hear from you! Whether you have a question, a comment, or just want to say hello, we're here to listen. Fill out the form below to get in touch with us.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="input input-bordered w-full"
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input input-bordered w-full"
                                        placeholder="email@example.com"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Message</span>
                                    </label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="textarea textarea-bordered w-full"
                                        placeholder="Message"
                                    />
                                </div>
                                {error && (
                                    <div className="alert alert-error">
                                        <span>{error}</span>
                                    </div>
                                )}
                                {success && (
                                    <div className="alert alert-success">
                                        <span>Form submitted successfully!</span>
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    className="btn bg-[#5F477E] text-white hover:bg-[#7539C2] mt-4 w-full"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactForm;