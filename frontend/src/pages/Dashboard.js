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

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-white shadow-md w-64 fixed top-0 left-0 h-full z-10 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-4 text-center">
          <img 
            src="/images/BELL.png" 
            alt="Logo" 
            className={`h-12 mx-auto ${shake ? 'animate-shake' : ''}`} // Add shake effect to the logo
          />
        </div>
        <nav className="mt-6">
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center px-4 py-1 text-gray-600 hover:bg-maroon hover:text-white transition-colors duration-300">
                <FaChartBar className="w-5 h-5 mr-2" />
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-1 text-gray-600 hover:bg-maroon hover:text-white transition-colors duration-300">
                <FaExclamationCircle className="w-5 h-5 mr-2" />
                Incident Report
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-1 text-gray-600 hover:bg-maroon hover:text-white transition-colors duration-300">
                <FaFileAlt className="w-5 h-5 mr-2" />
                Create Announcements
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-1 text-gray-600 hover:bg-maroon hover:text-white transition-colors duration-300">
                <FaClipboardList className="w-5 h-5 mr-2" />
                Upload Programs
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-1 text-gray-600 hover:bg-maroon hover:text-white transition-colors duration-300">
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
          <div className="flex justify-between items-center bg-white p-2 rounded-lg shadow mb-4">
            <div className="flex items-center">
              <FaSearch className="w-4 h-4 mr-1 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-100 border-0 p-1 rounded-lg flex-grow focus:outline-none focus:ring focus:ring-gray-200 text-sm"
              />
            </div>
            <div className="flex items-center space-x-2 relative">
              <FaBell className="w-5 h-5 text-gray-600 hover:text-maroon cursor-pointer" />
              <FaUserCircle className="w-5 h-5 text-gray-600 hover:text-maroon cursor-pointer" />
              <div className="relative">
                <FaCog 
                  className="w-5 h-5 text-gray-600 hover:text-maroon cursor-pointer" 
                  onClick={() => setShowSettingsMenu(!showSettingsMenu)} 
                />
                {showSettingsMenu && (
                  <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg z-10" ref={settingsMenuRef}>
                    <ul className="py-2">
                      <li className="px-2 py-1 hover:bg-gray-200 cursor-pointer text-sm" onClick={() => handleLogout()}>Logout</li>
                      <li className="px-2 py-1 hover:bg-gray-200 cursor-pointer text-sm">Settings</li>
                      <li className="px-2 py-1 hover:bg-gray-200 cursor-pointer text-sm">Help</li>
                    </ul>
                  </div>
                )}
              </div>
              <FaBars className="w-5 h-5 text-gray-600 hover:text-maroon cursor-pointer md:hidden" onClick={() => setIsOpen(!isOpen)} />
            </div>
          </div>

          {/* Today's Money Card */}
          <div className="bg-white p-2 rounded-lg shadow-md mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-semibold text-gray-700">Today's Money</h3>
                <p className="text-xl font-bold text-green-500">$53k</p>
                <p className="text-xs text-green-400">+55% than last week</p>
              </div>
              <FaDollarSign className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Calendar Section on the right side */}
        <div className="md:w-1/3 bg-white shadow-md rounded-lg p-4 ml-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Calendar - {calendarYear}</h2>
          <div className="flex justify-between mb-2">
            <button onClick={() => handleMonthChange(-1)} className="text-gray-600 hover:text-gray-900">◀</button>
            <span className="font-bold">{new Date(calendarYear, currentMonth).toLocaleString('default', { month: 'long' })}</span>
            <button onClick={() => handleMonthChange(1)} className="text-gray-600 hover:text-gray-900">▶</button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-bold text-xs">{day}</div>
            ))}
            {[...Array(firstDayOfMonth)].map((_, index) => (
              <div key={index} className="border p-1 text-center"></div>
            ))}
            {[...Array(daysInMonth)].map((_, index) => {
              const day = index + 1;
              const isToday = today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === calendarYear;
              return (
                <div
                  key={index}
                  className={`border p-1 text-center cursor-pointer hover:bg-gray-200 ${isToday ? 'bg-yellow-300' : ''}`}
                  onClick={() => handleDateClick(day)}
                >
                  {day}
                </div>
              );
            })}
          </div>

          {/* Today's Activity Section inside Calendar */}
          <h2 className="text-lg font-semibold text-gray-700 mt-4">Today's Activity</h2>
          <ul className="mt-2">
            {todayEvents.length > 0 ? (
              todayEvents.map((event, index) => (
                <li key={index} className="text-gray-600 text-xs">✔️ {event.text}</li>
              ))
            ) : (
              <li className="text-gray-400 text-xs">No events for today.</li>
            )}
          </ul>
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