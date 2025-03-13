import { useState, useContext } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CreateEventCard = () => {
  const [formData, setFormData] = useState({
      title: '',
      description: '',
      location: '',
      start_date: '',
      end_date: '',
      start_time: '',
      end_time: '',
      requirements: ''
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
  
      try {
        // const response = await axios.post('/api/organizations/create', formData);
        // console.log('Organization account created:', response.data);
        toast.success('Post created successfully!');
      } catch (err) {
        console.error('Error creating organization account:', err.response?.data || err.message);
        toast.error('Error creating post')
      }
    };

  return (
    <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">Hello there</h1>
        <form onSubmit={handleSubmit}>
                <fieldset className="fieldset">
                      <legend className="fieldset-legend">Title</legend>
                      <input
                        type="text"
                        name="title"
                        className="input"
                        placeholder="Title"
                        required
                        minLength="2"
                        value={formData.first_name}
                        onChange={handleChange}
                      />
                      <legend className="fieldset-legend">Description</legend>
                      <input
                        type="text"
                        name="description"
                        className="input"
                        placeholder="Last Name"
                        required
                        minLength="2"
                        value={formData.last_name}
                        onChange={handleChange}
                      />
                      <legend className="fieldset-legend">location</legend>
                      <input
                        required
                        type="text"
                        name="location"
                        placeholder="text@example.com"
                        value={formData.text}
                        onChange={handleChange}
                      />
                      <legend className="fieldset-legend">Start date</legend>
                      <input
                        required
                        type="text"
                        name="start_date"
                        placeholder="text@example.com"
                        value={formData.text}
                        onChange={handleChange}
                      />
                      <legend className="fieldset-legend">End date</legend>
                      <input
                        required
                        type="text"
                        name="end_date"
                        placeholder="text@example.com"
                        value={formData.text}
                        onChange={handleChange}
                      />
                      <legend className="fieldset-legend">Start time</legend>
                      <input
                        required
                        type="text"
                        name="start_time"
                        placeholder="text@example.com"
                        value={formData.text}
                        onChange={handleChange}
                      />
                      <legend className="fieldset-legend">End time</legend>
                      <input
                        required
                        type="text"
                        name="end_time"
                        placeholder="text@example.com"
                        value={formData.text}
                        onChange={handleChange}
                      />
                      <legend className="fieldset-legend">Requirements</legend>
                      <input
                        required
                        type="text"
                        name="requirements"
                        placeholder="text@example.com"
                        value={formData.text}
                        onChange={handleChange}
                      />
                </fieldset>
              </form>
        <button className="btn btn-primary">Get Started</button>
      </div>
    </div>
  </div>
  )
}

export default CreateEventCard;