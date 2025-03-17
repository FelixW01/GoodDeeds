import React, { useState, useRef, useContext, useEffect } from 'react';
import { UserContext } from '../../context/userContext';

const ProfilePage = () => {
  // User context and state
  const { user, capitalize, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Form state for editing mode
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    profile_picture: '',
  });

  // Initialize form data when user is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        profile_picture: user.profile_picture || '',
      });
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [user]);

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Check file type
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setError('Please upload a JPG or PNG image only.');
      return;
    }
    
    // Check file size (8MB = 8 * 1024 * 1024 bytes)
    if (file.size > 8 * 1024 * 1024) {
      setError('File size must be less than 8MB.');
      return;
    }
    
    setError('');
    setSelectedFile(file);
    
    // Create an object URL for the avatar preview
    const objectUrl = URL.createObjectURL(file);
    setFormData({...formData, profile_picture: objectUrl});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  const saveProfileChanges = async () => {
    setSaveStatus('saving');
    try {
      // Create a FormData object to handle file upload
      const submitData = new FormData();
      
      // Add user fields to the form data
      submitData.append('first_name', formData.first_name);
      submitData.append('last_name', formData.last_name);
      submitData.append('email', formData.email);
      
      // Only append the file if a new one was selected
      if (selectedFile) {
        submitData.append('profile_picture', selectedFile);
      }
      
      // Submit to API
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        body: submitData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      const result = await response.json();
      console.log('Profile updated:', result);

      if (result) {
        setUser({
            ...formData,
            total_hours_worked: Number(user.total_hours_worked), 
            total_events_attended: Number(user.total_events_attended)
        });
        }
     
      setSaveStatus('success');
      // Exit edit mode after successful save
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
      setSaveStatus('error');
    }
  };

  const toggleEditMode = () => {
    if (isEditing) {
      // Save changes
      saveProfileChanges();
    } else {
      // Enter edit mode - reset form data from user
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        profile_picture: user.profile_picture || ''
      });
      setSelectedFile(null);
      setError('');
      setSaveStatus(null);
      setIsEditing(true);
    }
  };
  
  // Cleanup object URL when component unmounts to avoid memory leaks
  useEffect(() => {
    return () => {
        if (selectedFile) {
        URL.revokeObjectURL(formData.profile_picture);
        }
      };
    }, [selectedFile]);
    user ? console.log('User:', user): null;
  return (
    <>
    {!isLoading ? 
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with toggle edit button */}
        <div className="flex justify-between items-center mb-6 px-4">
          <h1 className="text-2xl font-bold">Profile</h1>
          <div className="flex items-center gap-2">
            {saveStatus === 'success' && (
              <div className="alert alert-success py-2 px-4">
                <span>Profile updated successfully!</span>
              </div>
            )}
            <button 
              className={`btn ${isEditing ? 'btn-success' : 'btn-primary'}`}
              onClick={toggleEditMode}
              disabled={saveStatus === 'saving'}
            >
              {isEditing 
                ? (saveStatus === 'saving' ? 'Saving...' : 'Save Changes') 
                : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Avatar and basic info */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              {/* Hidden file input */}
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg"
                className="hidden"
              />
              
              {/* Avatar */}
              <div 
                className={`avatar ${isEditing ? 'cursor-pointer' : ''}`} 
                onClick={handleAvatarClick}
                title={isEditing ? "Click to upload avatar" : ""}
              >
                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img 
                    src={isEditing 
                        ? formData.profile_picture || '/img/volunteer-event.jpg' 
                        : (user.profile_picture && user.profile_picture !== "" ? user.profile_picture : '/img/volunteer-event.jpg')
                    } 
                        alt="Avatar" 
                    />
                </div>
              </div>
              
              {/* Error Message */}
              {error && (
                <div className="alert alert-error mt-2 text-sm">
                  <span>{error}</span>
                </div>
              )}
              
              {isEditing ? (
                <>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">First Name</span>
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      className="input input-bordered w-full"
                      value={formData.first_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Last Name</span>
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      className="input input-bordered w-full"
                      value={formData.last_name}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold mt-2">{capitalize(user.first_name)} {capitalize(user.last_name)}</h2>
                  <div className="flex items-center mt-1">
                    <i className="fa-solid fa-star mr-1"></i>
                    <span className="text-sm opacity-70">{parseInt(user.total_hours_worked)} hours of Good Deeds!</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right column - Contact */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl mb-6">
              <div className="card-body">
                <h2 className="card-title text-xl">Contact Information</h2>
                {isEditing ? (
                  <>
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="input input-bordered w-full"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{user.email}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Achievements/Stats Card */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-xl">Your Impact</h2>
                <div className="stats shadow">
                  <div className="stat">
                    <div className="stat-figure text-primary">
                      <i className="fa-solid fa-clock text-2xl"></i>
                    </div>
                    <div className="stat-title">Hours Volunteered</div>
                    <div className="stat-value text-primary">{parseInt(user.total_hours_worked)}</div>
                  </div>
                  
                  <div className="stat">
                    <div className="stat-figure text-secondary">
                      <i className="fa-solid fa-handshake-angle text-2xl"></i>
                    </div>
                    <div className="stat-title">Events Joined</div>
                    <div className="stat-value text-secondary">{user.total_events_attended || 0}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> : 
    <div className="min-h-screen flex justify-center items-center">
      <div className="loading loading-spinner loading-lg text-primary"></div>
    </div>}
    </>
  );
};

export default ProfilePage;