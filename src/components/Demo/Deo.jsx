import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Demo = () => {
 

  // const handleSubmit=(e)=>{
  //   e.preventDefault();
  //   const formData = new FormData();
  //       formData.append('entry.866813023', "field1");
  //       console.log("nb")
  //   axios.post("https://docs.google.com/forms/d/e/1FAIpQLScHIRgeIIlQn9nJx2svuRfHt6oPRdPiuE0sSHAol_kCb0FBtA/formResponse",formData)
  // }
  // https://docs.google.com/forms/d/e/1FAIpQLScHIRgeIIlQn9nJx2svuRfHt6oPRdPiuE0sSHAol_kCb0FBtA/viewform?usp=pp_url&entry.866813023=rr


  return (
    <>
    <div>
      <h1>User Location</h1>
      {location.lat && <p>Latitude: {location.lat}</p>}
      {location.lng && <p>Longitude: {location.lng}</p>}
      {address ? <p>Address: {address}</p> : <p>{error}</p>}
    </div>
    <form action="https://docs.google.com/forms/d/e/1FAIpQLScHIRgeIIlQn9nJx2svuRfHt6oPRdPiuE0sSHAol_kCb0FBtA/formResponse" method='post' onsubmit="submitted=true;">
      <label>Name</label>
      <input type="text" placeholder="name" name="entry.866813023"/>
	  
      
      <button type="submit">Send</button>
    </form>
    </>
  );
};

export default Demo;
