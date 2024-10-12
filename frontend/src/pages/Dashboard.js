import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle, FaSearch, FaCog, FaDollarSign, FaBell, FaFileAlt, FaClipboardList, FaPaintBrush, FaExclamationCircle, FaBars, FaChartBar } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [eventInput, setEventInput] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [shake, setShake] = useState(false);
  const settingsMenuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search term for global search

  // Sample data that can be used across multiple sections
  const announcements = [
    "Announcement content goes here...",
    "Another announcement content...",
    "More announcements...",
    "Even more announcements...",
    "Keep adding announcements...",
    "Don't forget to scroll!",
    "Announcement content goes here...",
    "Another announcement content...",
    "More announcements...",
    "Even more announcements...",
    "Keep adding announcements...",
    "Don't forget to scroll!",
    "Announcement content goes here...",
    "Another announcement content...",
    "More announcements...",
    "Even more announcements...",
    "Keep adding announcements...",
    "Don't forget to scroll!",
  ];

  useEffect(() => {
    const shakeInterval = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }, 10000);

    return () => clearInterval(shakeInterval);
  }, []);

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

  const handleDateClick = (day) => {
    const newDate = new Date(calendarYear, currentMonth, day);
    setSelectedDate(newDate);
    setEventInput("");
  };

  const todayEvents = events.filter(event => event.date === new Date().toDateString());
  const today = new Date();
  const daysInMonth = new Date(calendarYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(calendarYear, currentMonth, 1).getDay();

  const handleMonthChange = (increment) => {
    let newMonth = currentMonth + increment;
    let newYear = calendarYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    setCurrentMonth(newMonth);
    setCalendarYear(newYear);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  // Function to highlight matching keywords
  const highlightText = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi'); // Create a regex for highlighting
    return text.split(regex).map((part, index) => 
      regex.test(part) ? <span key={index} className="bg-yellow-300">{part}</span> : part
    );
  };

  // Filtered announcements based on the search term
  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            className={`h-12 mx-auto ${shake ? 'animate-shake' : ''}`} // Add shake effect to the logo
          />
        </div>
        <nav className="mt-6">
          <ul className="space-y-1">
            <li>
              <a onClick={() => navigate('/dashboard')}className="flex items-center px-4 py-2 text-white hover:bg-gray-400 transition-colors duration-300 rounded">
                <FaChartBar className="w-5 h-5 mr-2" />
                Dashboard
              </a>
            </li>
            <li>
              <a onClick={() => navigate('/reports')} className="flex items-center px-4 py-2 text-white hover:bg-gray-400 transition-colors duration-300 rounded">
                <FaExclamationCircle className="w-5 h-5 mr-2" />
                Incident Report
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 text-white hover:bg-gray-400 transition-colors duration-300 rounded">
                <FaFileAlt className="w-5 h-5 mr-2" />
                Create Announcements
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 text-white hover:bg-gray-400 transition-colors duration-300 rounded">
                <FaClipboardList className="w-5 h-5 mr-2" />
                Upload Programs
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 text-white hover:bg-gray-400 transition-colors duration-300 rounded">
                <FaPaintBrush className="w-5 h-5 mr-2" />
                Color Wheel Legend
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:ml-64 flex flex-col md:flex-row">
        <div className="flex-1">
          {/* Search bar and user settings */}
          <div className="flex justify-between items-center bg-maroon p-2 rounded-lg shadow mb-4">
            <div className="flex items-center">
              <FaSearch className="w-4 h-4 mr-1 text-white" /> {/* Changed color to white */}
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-100 border-0 p-1 rounded-lg flex-grow focus:outline-none focus:ring focus:ring-gray-200 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              />
            </div>
            <div className="flex items-center space-x-2 relative">
              <FaBell className="w-5 h-5 text-white hover:text-yellow-400  cursor-pointer" /> {/* Changed color to white */}
              <FaUserCircle className="w-5 h-5 text-white hover:text-yellow-400 cursor-pointer" /> {/* Changed color to white */}
              <div className="relative">
                <FaCog 
                  className="w-5 h-5 text-white hover:text-yellow-400 cursor-pointer" // Changed color to white 
                  onClick={() => setShowSettingsMenu(!showSettingsMenu)} 
                />
                {showSettingsMenu && (
                  <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg z-10" ref={settingsMenuRef}>
                    <ul className="py-2">

                      <li className="px-2 py-1 hover:bg-gray-200 cursor-pointer text-sm">Settings</li>
                      <li className="px-2 py-1 hover:bg-gray-200 cursor-pointer text-sm">Help</li>
                      <li className="px-2 py-1 hover:bg-gray-200 cursor-pointer text-sm" onClick={() => handleLogout()}>Logout</li>
                    </ul>
                  </div>
                )}
              </div>
              <FaBars className="w-5 h-5 text-white hover:text-yellow-400 cursor-pointer md:hidden" onClick={() => setIsOpen(!isOpen)} /> {/* Changed color to white */}
            </div>
          </div>

          {/* Announcements Card */}
          <div className="bg-white p-2 rounded-lg shadow-md mb-4 flex-1 overflow-hidden h-96">
            <h3 className="text-lg font-bold text-maroon text-center uppercase">ANNOUNCEMENTS</h3>
            <div className="mt-2 h-64 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              {filteredAnnouncements.length > 0 ? (
                filteredAnnouncements.map((announcement, index) => (
                  <p key={index} className="text-sm text-gray-600">
                    {highlightText(announcement)} {/* Highlight matching text */}
                  </p>
                ))
              ) : (
                <p className="text-sm text-gray-600">Nothing found.</p>
              )}
            </div>
          </div>

          {/* Calendar Section below Announcements */}
          <div className="bg-white shadow-md rounded-lg p-2 w-full">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Calendar - {calendarYear}</h2>
            <div className="flex justify-between mb-1">
              <button onClick={() => handleMonthChange(-1)} className="text-gray-600 hover:text-gray-900 text-xs">◀</button>
              <span className="font-bold text-xs">{new Date(calendarYear, currentMonth).toLocaleString('default', { month: 'long' })}</span>
              <button onClick={() => handleMonthChange(1)} className="text-gray-600 hover:text-gray-900 text-xs">▶</button>
            </div>
            <div className="grid grid-cols-7 gap-0.5">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center font-bold text-xs">{day}</div>
              ))}
              {[...Array(firstDayOfMonth)].map((_, index) => (
                <div key={index} className="border p-0 text-center h-8"></div>
              ))}
              {[...Array(daysInMonth)].map((_, index) => {
                const day = index + 1;
                const isToday = today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === calendarYear;
                return (
                  <div
                    key={index}
                    className={`border p-0 text-center cursor-pointer hover:bg-gray-200 h-8 ${isToday ? 'bg-yellow-300' : ''}`}
                    onClick={() => handleDateClick(day)}
                  >
                    <span className="text-xs">{day}</span>
                  </div>
                );
              })}
            </div>

            {/* Today's Activity Section inside Calendar */}
            <h2 className="text-lg font-semibold text-gray-700 mt-2">Today's Activity</h2>
            <ul className="mt-1 text-xs">
              {todayEvents.length > 0 ? (
                todayEvents.map((event, index) => (
                  <li key={index} className="text-gray-600">✔️ {event.text}</li>
                ))
              ) : (
                <li className="text-gray-400">No events for today.</li>
              )}
            </ul>
          </div>

        </div>
      </main>

      <style jsx>{`
        .animate-shake {
          animation: shake 0.5s;
        }

        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
      `}</style>
    </div>
  );
}
//