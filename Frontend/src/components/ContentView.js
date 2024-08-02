// // src/components/ContentView.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './ContentView.css';

// const ContentView = ({ cities }) => {
//   const [selectedService, setSelectedService] = useState("");
//   const [selectedCity, setSelectedCity] = useState("Portland, ME");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");
//   const navigate = useNavigate();

//   const handleServiceChange = (event) => {
//     setSelectedService(event.target.value);
//   };

//   const handleCityChange = (event) => {
//     setSelectedCity(event.target.value);
//   };

//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value);
//   };

//   const handleTimeChange = (event) => {
//     setSelectedTime(event.target.value);
//   };

//   const handleNextClick = async () => {
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/service-requests`, {
//         service: selectedService,
//         location: selectedCity,
//         date: selectedDate,
//         time: selectedTime,
//       }, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('googleToken')}` // Make sure to set the token properly
//         }
//       });
//       console.log('Service request created:', response.data);
//       navigate('/details');
//     } catch (error) {
//       console.error('Error creating service request:', error);
//     }
//   };

//   return (
//     <div className="content-view">
//       <h1>Request a Service</h1>
//       <div className="service-selection">
//         <div className="service-options">
//           <label><input type="radio" name="service" value="Home Cleaner" onChange={handleServiceChange} /> Home Cleaner</label>
//           <label><input type="radio" name="service" value="Plumber" onChange={handleServiceChange} /> Plumber</label>
//           <label><input type="radio" name="service" value="Day Caretaker" onChange={handleServiceChange} /> Day Caretaker</label>
//           <label><input type="radio" name="service" value="Plower" onChange={handleServiceChange} /> Plower</label>
//           <label><input type="radio" name="service" value="Mechanic" onChange={handleServiceChange} /> Mechanic</label>
//         </div>
//       </div>
//       <div className="location-selection">
//         <h2>Location</h2>
//         <select value={selectedCity} onChange={handleCityChange}>
//           {Object.entries(cities).map(([state, cityList]) => (
//             <optgroup key={state} label={state}>
//               {cityList.map(city => (
//                 <option key={city} value={`${city}, ${state}`}>{city}</option>
//               ))}
//             </optgroup>
//           ))}
//         </select>
//       </div>
//       <div className="datetime-selection">
//         <h2>Date & Time</h2>
//         <input type="date" value={selectedDate} onChange={handleDateChange} />
//         <input type="time" value={selectedTime} onChange={handleTimeChange} />
//       </div>
//       <button className="next-button" onClick={handleNextClick}>Next</button>
//     </div>
//   );
// };

// export default ContentView;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContentView.css';
import axios from 'axios';
import DetailsView from './DetailsView';

const ContentView = ({ cities }) => {
  const [selectedService, setSelectedService] = useState("");
  const [selectedCity, setSelectedCity] = useState("Portland, ME");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleNextClick = async () => {
    if (!user) {
      console.error('User not defined');
      return;
    }
    try {
      await axios.post('/api/service-requests', {
        service: selectedService,
        city: selectedCity,
        date: selectedDate,
        time: selectedTime,
        userId: user ? user.googleId : 'guest',  // Replace with actual user ID
      });
      navigate('/DetailsView');
    } catch (error) {
      console.error('Error submitting service request:', error);
    }
  };

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  return (
    <div className="content-view">
      <h1 className="title">Request a Service</h1>
      <div className="service-selection">
        <div className="service-options">
          <label><input type="radio" name="service" value="Home Cleaner" onChange={handleServiceChange} /> Home Cleaner</label>
          <label><input type="radio" name="service" value="Plumber" onChange={handleServiceChange} /> Plumber</label>
          <label><input type="radio" name="service" value="Day Caretaker" onChange={handleServiceChange} /> Day Caretaker</label>
          <label><input type="radio" name="service" value="Plower" onChange={handleServiceChange} /> Plower</label>
          <label><input type="radio" name="service" value="Mechanic" onChange={handleServiceChange} /> Mechanic</label>
        </div>
      </div>
      <div className="location-selection">
        <h2>Location</h2>
        <select value={selectedCity} onChange={handleCityChange}>
          {Object.entries(cities).map(([state, cityList]) => (
            <optgroup key={state} label={state}>
              {cityList.map(city => (
                <option key={city} value={`${city}, ${state}`}>{city}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
      <div className="datetime-selection">
        <h2>Date & Time</h2>
        <div className="datetime-inputs">
          <input type="date" value={selectedDate} onChange={handleDateChange} />
          <input type="time" value={selectedTime} onChange={handleTimeChange} />
        </div>
      </div>
      <button className="next-button" onClick={handleNextClick}>Next</button>
    </div>
  );
};

export default ContentView;
 