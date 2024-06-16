import React, { useEffect, useState } from "react";
import "./Form.css";;
import axios from "axios";


function Form() {
  let arr = ["rohit", "mayur", "saurabh", "aditya", "harsh"];
  const [names, setNames] = useState(arr);
  const [showNames, setShowNames] = useState(false);
  const [selectedName, setSelectedname] = useState();
  const [search, setSearch] = useState("");
  const [addressError, setAddressError] = useState("");
 
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, handleError);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const success = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    setLocation(currentPosition);
    fetchAddress(currentPosition);
  };

  const handleError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setError("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setError("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        setError("An unknown error occurred.");
        break;
      default:
        setError("An unknown error occurred.");
    }
  };

  const fetchAddress = async (position) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.lat}&lon=${position.lng}`;

    try {
      const response = await axios.get(url);
      if (response.data) {
        setAddress(response.data.display_name);
      } else {
        setError("No address found.");
      }
    } catch (error) {
      setError("Error fetching the address.");
      console.error("Error fetching the address: ", error);
    }
  };
  
  const onSubmit = async(data) => {
    console.log(data);
    // const url = 'https://docs.google.com/forms/d/e/1FAIpQLScHIRgeIIlQn9nJx2svuRfHt6oPRdPiuE0sSHAol_kCb0FBtA/formResponse';
    // const formData = new FormData();
    // formData.append('entry.866813023',data.name);
    // formData.append('entry.447811769',data.rollno);
    // formData.append('entry.1048469525',data.subject);
    // formData.append('entry.4142451',data.batch);
    // await axios.post(url, formData);
    
}

  function handleShowNames() {
    setShowNames(!showNames);
  }

  function handleSearch(e) {
    setSearch(e.target.value);
    setNames(
      arr.filter((item) =>
        item.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  }
  return (
    <div
      className="form"
      onClick={(e) => {
        if (showNames) handleShowNames();
      }}
    >
      <form  action={import.meta.env.VITE_APP_GFORM} method="post" onSubmit="submitted=true;">
        
        <div className="formFields">
          <div className="formHeader">FORM</div>

          <div className="nameField">
            <label htmlFor="temp">
              Name<span>*</span>
            </label>
            <div>
              <input
                id="name"
                readOnly="true"
                value={selectedName}
                onClick={handleShowNames}
                placeholder="Choose"
                name="entry.866813023"
              />
            </div>
            {showNames && (
              <div className="searchNameDiv">
                <input
                  onChange={handleSearch}
                  value={search}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Type your name..."
                />
                <div className="nameListContainer">
                  {names.map((item) => {
                    return (
                      <div
                        className="nameList"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedname(item);
                          handleShowNames();
                        }}
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="rollnoField">
            <label htmlFor="rollno">
              Roll No<span>*</span>
            </label>
            <div>
              <input
                type="number"
                id="rollno"
                name="entry.439167434"
                placeholder="Your Answer...."
                onWheel={(e) => e.target.blur()}
              />
            </div>
          </div>

          <div className="standardField">
            <label htmlFor="subject">
              Subject<span>*</span>
            </label>
            <div className="radio">
              <label>
                <input
                  id="subject"
                  type="radio"
                  value="option1"
                  name="entry.712707281"
                />
                Option 1
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  id="subject"
                  type="radio"
                  value="subject"
                  name="entry.712707281"
                />
                Option 2
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  id="subject"
                  type="radio"
                  value="option3"
                  name="entry.712707281"
                />
                Option 3
              </label>
            </div>
          </div>

          <div className="batchField">
            <label htmlFor="batch">
              Batch<span>*</span>
            </label>
            <div className="batch">
              <label>
                <input
                  id="batch"
                  type="radio"
                  value="batch1"
                  name="entry.1047819579"
                />
                Batch 1
              </label>
            </div>
            <div className="batch">
              <label>
                <input
                  id="batch"
                  type="radio"
                  value="batch2"
                  name="entry.1047819579"
                />
                Batch 2
              </label>
            </div>
          </div>
          <div style={{display:"none"}}>
            <input name="entry.1130053215" type="text" value={address} readOnly/>
          </div>

          <div className="btns">
            <button id="submit" type="submit">
              Submit
            </button>
            <button id="clear" type="clear" onClick={() => reset()}>
              Clear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
