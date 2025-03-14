import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CreateEventCard = () => {
  const [formData, setFormData] = useState({
      title: "",
      description: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      start_date: "",
      end_date: "",
      start_time: "",
      end_time: "",
      requirements: "",
    });
    const [errors, setErrors] = useState({});

    const states = [
      { value: "AL", label: "AL" },
      { value: "AK", label: "AK" },
      { value: "AZ", label: "AZ" },
      { value: "AR", label: "AR" },
      { value: "CA", label: "CA" },
      { value: "CO", label: "CO" },
      { value: "CT", label: "CT" },
      { value: "DE", label: "DE" },
      { value: "FL", label: "FL" },
      { value: "GA", label: "GA" },
      { value: "HI", label: "HI" },
      { value: "ID", label: "ID" },
      { value: "IL", label: "IL" },
      { value: "IN", label: "IN" },
      { value: "IA", label: "IA" },
      { value: "KS", label: "KS" },
      { value: "KY", label: "KY" },
      { value: "LA", label: "LA" },
      { value: "ME", label: "ME" },
      { value: "MD", label: "MD" },
      { value: "MA", label: "MA" },
      { value: "MI", label: "MI" },
      { value: "MN", label: "MN" },
      { value: "MS", label: "MS" },
      { value: "MO", label: "MO" },
      { value: "MT", label: "MT" },
      { value: "NE", label: "NE" },
      { value: "NV", label: "NV" },
      { value: "NH", label: "NH" },
      { value: "NJ", label: "NJ" },
      { value: "NM", label: "NM" },
      { value: "NY", label: "NY" },
      { value: "NC", label: "NC" },
      { value: "ND", label: "ND" },
      { value: "OH", label: "OH" },
      { value: "OK", label: "OK" },
      { value: "OR", label: "OR" },
      { value: "PA", label: "PA" },
      { value: "RI", label: "RI" },
      { value: "SC", label: "SC" },
      { value: "SD", label: "SD" },
      { value: "TN", label: "TN" },
      { value: "TX", label: "TX" },
      { value: "UT", label: "UT" },
      { value: "VT", label: "VT" },
      { value: "VA", label: "VA" },
      { value: "WA", label: "WA" },
      { value: "WV", label: "WV" },
      { value: "WI", label: "WI" },
      { value: "WY", label: "WY" }
    ];



     // Ensures a 5-digit ZIP code
    const zipPattern = /^\d{5}$/;
     // Ensures a 2-letter state abbreviation
    const statePattern = /^[A-Z]{2}$/;
    
    const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (name === "zip") {
        setErrors((prev) => ({
          ...prev,
          zip: zipPattern.test(value) ? "" : "ZIP code must be 5 digits",
        }));
      }

      if (name === "state") {
        setErrors((prev) => ({
          ...prev,
          state: statePattern.test(value) ? "" : "Use 2-letter state code (e.g., NC)",
        }));
      }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate state and zip before submitting
    if (!zipPattern.test(formData.zip)) {
      toast.error("Please enter zip code before submitting.");
      return;
    }

    // Combine address fields into one for backend
    const fullAddress = `${formData.street}, ${formData.city}, ${formData.state} ${formData.zip}`;

    const eventData = {
      ...formData,
      location: fullAddress,
    };

    try {
      const response = await axios.post('/api/events/create', eventData);
      console.log("Event created:", response.data);
      toast.success("Event created successfully!");
    } catch (err) {
      console.error("Error creating event:", err.response?.data || err.message);
      toast.error("Error creating event");
    }
  };

  return (
    <div className="card lg:card-side bg-base-100 flex-col gap-10 justify-center items-center">
      <div className="max-w-md card body">
        <h1 className="card-title mb-10">Create Event</h1>
        <form onSubmit={handleSubmit}>
                <fieldset className="fieldset">
                      <legend className="fieldset-legend text-left">Event title</legend>
                      <input
                        type="text"
                        name="title"
                        className="input input-bordered w-full"
                        placeholder="Title"
                        required
                        minLength="5"
                        value={formData.title}
                        onChange={handleChange}
                      />
                      <legend className="fieldset-legend">Event description</legend>
                      <input
                        type="text"
                        name="description"
                        className="input input-bordered w-full"
                        placeholder="Description"
                        required
                        minLength="2"
                        value={formData.description}
                        onChange={handleChange}
                      />
                      <legend className="fieldset-legend">Event location</legend>
                        <div className="flex flex-wrap gap-[19px]">
                          <input
                            required
                            type="text"
                            className="input input-bordered lg:w-1/3 md:w-1/2 w-full"
                            name="street"
                            placeholder="123 Main St"
                            value={formData.street}
                            onChange={handleChange}
                          />

                          <input
                            required
                            type="text"
                            className="input input-bordered lg:w-1/5 md:w-1/3 w-full"
                            name="city"
                            placeholder="Charlotte"
                            value={formData.city}
                            onChange={handleChange}
                          />

                          <select
                            name="state"
                            className="select select-bordered lg:w-1/6 md:w-1/2 w-full"
                            required
                            value={formData.state}
                            onChange={handleChange}
                          >
                            <option value="">Select a state</option>
                            {states.map((state) => (
                              <option key={state.value} value={state.value}>
                                {state.label}
                              </option>
                            ))}
                          </select>

                          <input
                            required
                            type="text"
                            className={`input input-bordered md:w-1/3 lg:w-1/6 w-full ${errors.zip ? "border-red-500" : ""}`}
                            name="zip"
                            placeholder="28202"
                            value={formData.zip}
                            maxLength="5"
                            onChange={handleChange}
                          />
                        </div>
                        {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
                      
                      <div className="flex gap-4 lg:flex-nowrap flex-wrap">
                        <div className="flex flex-col lg:w-1/2 w-full">
                          <legend className="fieldset-legend">Start date</legend>
                          <input
                            required
                            type="date"
                            className="input input-bordered w-full"
                            name="start_date"
                            placeholder="text@example.com"
                            value={formData.start_date}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col lg:w-1/2 w-full">
                          <legend className="fieldset-legend">End date</legend>
                          <input
                            required
                            type="date"
                            className="input input-bordered w-full"
                            name="end_date"
                            placeholder="text@example.com"
                            value={formData.end_date}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex flex-col w-1/2">
                          <legend className="fieldset-legend">Start time</legend>
                          <input
                            required
                            type="time"
                            className="input input-bordered w-full"
                            name="start_time"
                            value={formData.start_time}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col w-1/2">
                          <legend className="fieldset-legend">End time</legend>
                          <input
                            required
                            type="time"
                            className="input input-bordered w-full"
                            name="end_time"
                            value={formData.end_time}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <legend className="fieldset-legend">Event requirements</legend>
                      <input
                        required
                        type="text"
                        className="input input-bordered w-full"
                        name="requirements"
                        placeholder="Must be 18+ years old"
                        value={formData.requirements}
                        onChange={handleChange}
                      />
                      <button className="btn bg-[#7539C2] text-white mt-4">Sign Up</button>
                </fieldset>
              </form>
          </div>
          <figure className="hidden lg:block max-h-[605px] lg:max-w-[35%] card-image">
            <img
              src="img/volunteer-event.jpg"
              alt="Album" 
              className="rounded-lg hidden lg:block"
              />
          </figure>
    </div>
  )
}

export default CreateEventCard;