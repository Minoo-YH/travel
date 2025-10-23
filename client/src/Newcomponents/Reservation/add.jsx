import React, { useState } from 'react';
import './add.css';

const Add = () => {
  const [wifiChecked, setWifiChecked] = useState(false);
  const [parkingChecked, setParkingChecked] = useState(false);
  const [roomServiceChecked, setRoomServiceChecked] = useState(false);
  const [breakfastChecked, setBreakfastChecked] = useState(false);

  const handleCheckboxChange = (setState) => {
    setState((prevState) => !prevState);
  };

  const saveToLocalStorage = () => {
    const addsData = {
      wifiChecked,
      parkingChecked,
      roomServiceChecked,
      breakfastChecked,
      wifiPrice: wifiChecked ? 10 : 0,
      parkingPrice: parkingChecked ? 20 : 0,
      roomServicePrice: roomServiceChecked ? 5 : 0,
      breakfastPrice: breakfastChecked ? 6 : 0,
    };
    
    sessionStorage.setItem('addsData', JSON.stringify(addsData));
    alert("Your selections have been saved!");
    console.log(addsData)
  };
  

  return (
    <div>
    <div className="table-container">
    <table className="styled-table">
      <thead className="Adds">
        <tr>
          <th colSpan="2">Adds</th>
        </tr>
      </thead>
      <tbody>
     
        <tr>
          <td className="feature-name">Wifi <span className="price">($10)</span></td>
          <td>
            <input 
              type="checkbox" 
              checked={wifiChecked} 
              onChange={() => handleCheckboxChange(setWifiChecked)} 
            />
          </td>
        </tr>
        <tr>
          <td className="feature-name">Parking <span className="price">($20)</span></td>
          <td>
            <input 
              type="checkbox" 
              checked={parkingChecked} 
              onChange={() => handleCheckboxChange(setParkingChecked)} 
            />
          </td>
        </tr>
        <tr>
          <td className="feature-name">Room Service <span className="price">($5)</span></td>
          <td>
            <input 
              type="checkbox" 
              checked={roomServiceChecked} 
              onChange={() => handleCheckboxChange(setRoomServiceChecked)} 
            />
          </td>
        </tr>
        <tr>
          <td className="feature-name">Breakfast <span className="price">($6)</span></td>
          <td>
            <input 
              type="checkbox" 
              checked={breakfastChecked} 
              onChange={() => handleCheckboxChange(setBreakfastChecked)} 
            />
          </td>
        </tr>
      </tbody>
      
    </table>
    

  </div>
  <div className="nav-buttontable-container">
      <button
        className='nav-buttontable'
        onClick={saveToLocalStorage}
      >
        Adding
      </button>
    </div>
  </div>
  
  );
};

export default Add;


