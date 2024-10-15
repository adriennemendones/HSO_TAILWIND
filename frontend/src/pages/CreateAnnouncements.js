import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle, FaSearch, FaCog, FaBell, FaFileAlt, FaClipboardList, FaPaintBrush, FaExclamationCircle, FaBars, FaChartBar } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

export default function CreateAnnouncements() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [images, setImages] = useState([]); // Changed to an array to hold multiple images
  const [selectedColor, setSelectedColor] = useState(""); // Default color is empty
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [showPostConfirmation, setShowPostConfirmation] = useState(false);
  const settingsMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsMenuRef.current && !settingsMenuRef.current.contains(event.target)) {
        setShowSettingsMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to array
    setImages((prevImages) => [...prevImages, ...files]); // Append new files to the images array
  };

  const handleAnnouncementChange = (event) => {
    setAnnouncement(event.target.value);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowPostConfirmation(true); // Show post confirmation modal
  };

  const confirmPost = () => {
    // Logic to handle announcement submission goes here
    alert(`Announcement submitted with color: ${selectedColor}`);

    // Clear the form fields after confirming post
    resetForm();
    setShowPostConfirmation(false); // Close the confirmation modal

    // Redirect to the dashboard after confirming post
    navigate('/dashboard'); 
  };

  const cancelPost = () => {
    setShowPostConfirmation(false);
  };

  const handleCancel = () => {
    setShowCancelConfirmation(true); // Show cancel confirmation modal
  };

  const confirmCancel = () => {
    resetForm(); // Clear the form fields when cancelling
    setShowCancelConfirmation(false);
    navigate('/dashboard'); // Redirect to dashboard or wherever you want
  };

  const cancelCancel = () => {
    setShowCancelConfirmation(false);
  };

  const resetForm = () => {
    setAnnouncement("");
    setImages([]); // Reset images
    setSelectedColor("");
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index)); // Remove the image at the specified index
  };

  // Map colors to text color classes
  const textColor = {
    red: 'text-red-600',
    orange: 'text-orange-600',
    yellow: 'text-yellow-600',
    green: 'text-green-600',
    blue: 'text-blue-600',
  };

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`shadow-md w-64 fixed top-0 left-0 h-full z-10 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        style={{
          background: 'linear-gradient(120deg, #4a0909, #4a0909, #fcd7d4, #610c0c)',
          backgroundSize: '200% 200%',
        }}
      >
        <div className="p-4 text-center border-b border-gray-300">
          <img 
            src="/images/BELL.png" 
            alt="Logo" 
            className="h-12 mx-auto" 
          />
        </div>
        <nav className="mt-6">
          <ul className="space-y-1">
            <li>
              <a href="/dashboard" className="flex items-center px-4 py-2 text-white hover:bg-gray-400 transition-colors duration-300 rounded">
                <FaChartBar className="w-5 h-5 mr-2" />
                Dashboard
              </a>
            </li>
            <li>
              <a href="/reports" className="flex items-center px-4 py-2 text-white hover:bg-gray-400 transition-colors duration-300 rounded">
                <FaExclamationCircle className="w-5 h-5 mr-2" />
                Incident Report
              </a>
            </li>
            <li>
              <a href="/create" className="flex items-center px-4 py-2 text-white hover:bg-gray-400 transition-colors duration-300 rounded">
                <FaFileAlt className="w-5 h-5 mr-2" />
                Create Announcements
              </a>
            </li>
            <li>
              <a href="/upload" className="flex items-center px-4 py-2 text-white hover:bg-gray-400 transition-colors duration-300 rounded">
                <FaClipboardList className="w-5 h-5 mr-2" />
                Upload Programs
              </a>
            </li>
            <li>
              <a href="/color" className="flex items-center px-4 py-2 text-white hover:bg-gray-400 transition-colors duration-300 rounded">
                <FaPaintBrush className="w-5 h-5 mr-2" />
                Color Wheel Legend
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:ml-64 flex flex-col">
        {/* Search bar and user settings */}
        <div className="flex justify-between items-center bg-maroon p-2 rounded-lg shadow mb-4">
          <div className="flex items-center">
            <FaSearch className="w-4 h-4 mr-1 text-white" />
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-100 border-0 p-1 rounded-lg flex-grow focus:outline-none focus:ring focus:ring-gray-200 text-sm"
            />
          </div>
          <div className="flex items-center space-x-2 relative">
            <FaBell className="w-5 h-5 text-white hover:text-yellow-400 cursor-pointer" />
            <FaUserCircle 
                className="w-5 h-5 text-white hover:text-yellow-400 cursor-pointer" 
                onClick={() => navigate('/profile')} // Navigate to profile on click
            />
            <div className="relative">
              <FaCog 
                className="w-5 h-5 text-white hover:text-yellow-400 cursor-pointer" 
                onClick={() => setShowSettingsMenu(!showSettingsMenu)} 
              />
              {showSettingsMenu && (
                <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg z-10" ref={settingsMenuRef}>
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer ">Settings</li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Help</li>
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleLogout()}>Logout</li>
                  </ul>
                </div>
              )}
            </div>
            <FaBars className="w-5 h-5 text-white hover:text-yellow-400 cursor-pointer md:hidden" onClick={() => setIsOpen(!isOpen)} />
          </div>
        </div>

        {/* Create Announcement Form */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-500 flex-grow flex flex-col" style={{ height: '500px', overflowY: 'auto' }}>
          <h2 className="text-2xl font-bold text-maroon mb-4">Create Announcement</h2>
          <form onSubmit={handleSubmit} className="space-y-4 flex-grow">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Announcement:</label>
              <textarea 
                className={`border rounded-lg w-full p-2 text-sm flex-grow h-64 mb-2 border border-blue-300 ${textColor[selectedColor]}`} // Use dynamic text color
                value={announcement}
                onChange={handleAnnouncementChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Image:</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="border rounded-lg w-full border-gray-400 p-4 text-sm" 
                multiple // Allow multiple file uploads
              />
              <div className="mt-2 text-sm text-gray-500">
                {images.length > 0 ? `${images.length} files selected` : 'No files chosen'}
              </div>
            </div>

            {/* Display uploaded images */}
            <div className="mt-4">
              {images.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Uploaded Images:</h3>
                  <ul className="list-disc pl-5">
                    {images.map((file, index) => (
                      <li key={index} className="flex justify-between items-center mb-2">
                        <span>{file.name}</span>
                        <button type="button" onClick={() => removeImage(index)} className="text-red-500 hover:underline">Remove</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex-grow">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Color Code:</label>
                <select 
                  className={`border rounded-lg w-full border-gray-400 p-3 text-sm ${textColor[selectedColor]}`} // Change text color based on selected color
                  value={selectedColor} 
                  onChange={handleColorChange}
                  required // Make selection mandatory
                >
                  <option value="" disabled>Select Color</option>
                  <option value="red" className="text-red-600">Red - Important</option>
                  <option value="orange" className="text-orange-600">Orange - Urgent</option>
                  <option value="yellow" className="text-yellow-600">Yellow - Warning</option>
                  <option value="green" className="text-green-600">Green - General Info</option>
                  <option value="blue" className="text-blue-600">Blue - Informational</option>
                </select>
              </div>
              <button 
                className="mt-8 px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-6"
                onClick={() => navigate('/color')} // Redirect to color wheel legend page
              >
                View Color Legend
              </button>
            </div>
            <div className="flex justify-between mt-2">
              <button 
                type="button" 
                onClick={handleCancel} 
                className="px-4 mt-4 py-4 bg-gray-400 text-white rounded hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className={`px-2 mt-4 py-2 bg-maroon text-white rounded-lg transition duration-300 ${selectedColor && announcement ? '' : 'bg-gray-400 text-gray-600 cursor-not-allowed'}`}
                disabled={!selectedColor || !announcement} // Disable if requirements not met
              >
                Post Announcement
              </button>
            </div>
          </form>
        </div>

        {/* Cancel Confirmation Modal */}
        {showCancelConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
              <p>Are you sure you want to cancel the announcement?</p>
              <div className="flex justify-end mt-4">
                <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2" onClick={cancelCancel}>No</button>
                <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={confirmCancel}>Yes</button>
              </div>
            </div>
          </div>
        )}

        {/* Post Confirmation Modal */}
        {showPostConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
              <p>Are you sure you want to post this announcement?</p>
              <div className="flex justify-end mt-4">
                <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2" onClick={cancelPost}>No</button>
                <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={confirmPost}>Yes</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

//