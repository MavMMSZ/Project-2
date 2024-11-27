// import React from "react";
// import { useState, useEffect, MouseEventHandler } from "react";
// import { Link } from "react-router-dom";
// import { WorkData } from "../interfaces/WorkData";
// import { deleteWork, retrieveWorks } from "../api/workAPI";


import Carousel from "../components/carosel";




const Homepage = () => {
  return (
    <div>
      <h1>
        Welcome to the homepage
      </h1>
      <Carousel />
    </div>
  );
};

export default Homepage;
