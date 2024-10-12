import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle, FaSearch, FaCog, FaBell, FaFileAlt, FaClipboardList, FaPaintBrush, FaExclamationCircle, FaBars, FaChartBar } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

export default function UploadPrograms() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [who, setWho] = useState(""); // Text area for WHO
  const [what, setWhat] = useState(""); // Text area for WHAT
  const [whenDate, setWhenDate] = useState(""); // Date selector for WHEN
  const [whenTime, setWhenTime] = useState(""); // Time selector for WHEN
  const [where, setWhere] = useState(""); // Dropdown menu for WHERE
  const [images, setImages] = useState([]); // Array to hold multiple images
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

  const handleWhoChange = (event) => {
    setWho(event.target.value);
  };

  const handleWhatChange = (event) => {
    setWhat(event.target.value);
  };

  const handleWhenDateChange = (event) => {
    const dateValue = event.target.value;
    
    // Regular expression to match valid date format (YYYY-MM-DD)
    const isValidDateFormat = /^\d{4}-\d{2}-\d{2}$/.test(dateValue);
    
    // Check if year is four digits
    const year = dateValue.split('-')[0]; // Get the year part
    if (isValidDateFormat && year.length === 4) {
      setWhenDate(dateValue);
    } else {
      // Optionally, you can display an error message or handle invalid input
      console.log("Please enter a valid year in YYYY-MM-DD format.");
    }
  };

  const handleWhenTimeChange = (event) => {
    setWhenTime(event.target.value);
  };

  const handleWhereChange = (event) => {
    setWhere(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowPostConfirmation(true); // Show post confirmation modal
  };

  const confirmPost = () => {
    // Logic to handle program submission goes here
    alert(`Program submitted with details: WHO - ${who}, WHAT - ${what}, WHEN - ${whenDate} ${whenTime}, WHERE - ${where}`);

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
    navigate('/dashboard'); // Redirect to dashboard
  };

  const cancelCancel = () => {
    setShowCancelConfirmation(false);
  };

  const resetForm = () => {
    setWho("");
    setWhat("");
    setWhenDate("");
    setWhenTime("");
    setWhere("");
    setImages([]); // Reset images
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index)); // Remove the image at the specified index
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
            <FaUserCircle className="w-5 h-5 text-white hover:text-yellow-400 cursor-pointer" />
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

        {/* Upload Program Form */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-500 flex-grow flex flex-col" style={{ height: '500px', overflowY: 'auto' }}>
          <h2 className="text-2xl font-bold text-maroon mb-4">Upload Program</h2>
          <form onSubmit={handleSubmit} className="space-y-4 flex-grow">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">WHO:</label>
              <textarea 
                className="border rounded-lg w-full p-2 text-sm flex-grow h-20 mb-2 border border-blue-300"
                value={who}
                onChange={handleWhoChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">WHAT:</label>
              <textarea 
                className="border rounded-lg w-full p-2 text-sm flex-grow h-20 mb-2 border border-blue-300"
                value={what}
                onChange={handleWhatChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">WHEN:</label>
              <div className="flex space-x-2">
                <input 
                  type="date"
                  value={whenDate}
                  onChange={handleWhenDateChange}
                  className="border rounded-lg p-2 w-full"
                  required
                />
                <input 
                  type="time"
                  value={whenTime}
                  onChange={handleWhenTimeChange}
                  className="border rounded-lg p-2 w-full"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">WHERE:</label>
              <select 
                className="border rounded-lg w-full border-gray-400 p-3 text-sm"
                value={where} 
                onChange={handleWhereChange}
                required
              >
                <option value="" disabled>Select Campus Area</option>
                <option value="main">Main Campus</option>
                <option value="north">Gymnasium</option>
                <option value="south">Basic Education Building</option>
                <option value="south">Library</option>
                <option value="south">St. Bonaventure Student Center</option>
                <option value="south">Student Lounge</option>
                <option value="south">AEC Little Theater</option>

                {/* Add more campus areas as needed */}
              </select>
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
            <div className="flex justify-between mt-2">
              <button 
                type="button" 
                onClick={handleCancel} 
                className="px-4 mt-2 py-4 bg-gray-400 text-white rounded hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className={`px-2 mt-2 py-2 bg-maroon text-white rounded-lg transition duration-300 ${who && what && whenDate && whenTime && where ? '' : 'bg-gray-400 text-gray-600 cursor-not-allowed'}`}
                disabled={!who || !what || !whenDate || !whenTime || !where} // Disable if requirements not met
              >
                Upload Program
              </button>
            </div>
          </form>
        </div>

        {/* Cancel Confirmation Modal */}
        {showCancelConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
              <p>Are you sure you want to cancel the program upload?</p>
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
              <p>Are you sure you want to post this program?</p>
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