import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import NavBar from "./components/NavBar/NavBar";
import News from "./components/News/News";
import HomePage from "./config/config"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { router } from "./config/config";
import Search from "./components/Search/Search";
import UserForm from "./UserForm"; 
import axios from "axios";


function App() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [userData, setUserData] = useState(null);
  const [likedNews, setLikedNews] = useState([]); // Store liked news from server

  const handleFormSubmit = (data) => {
    setUserData(data);
    setIsFormSubmitted(true);
    console.log("User data submitted:", data);
  };

  // Fetch liked news for the user
  const fetchLikedNews = async () => {
    if (userData?.email) {
      try {
        const response = await axios.get("http://localhost:3000/getLikedNews", {
          params: { email: userData.email },
        });
        console.log("Fetched liked news:", response.data); // Debug log to verify the data
        return response.data; // Return the JSON response
      } catch (error) {
        console.error("Error fetching liked news:", error);
        return []; // Return an empty array on error to handle gracefully
      }
    } else {
      console.warn("User email is missing.");
      return []; // Return an empty array if email is not provided
    }
  };
  

  
  useEffect(() => {
    if (isFormSubmitted) {
      fetchLikedNews();
    }
  }, [isFormSubmitted, userData]); // Fetch when form is submitted and userData is updated

  const updatedRouter = router.map((path) => ({
    ...path,
    country: userData ? userData.country : 'us', // Default to 'us'
    userData: userData, // Pass userData as part of the route's props
  }));

  return (
    <Router>
      {isFormSubmitted ? (
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            {updatedRouter.map((path) => (
              <Route
                key={uuidv4()}
                path={path.path}
                element={
                  <News
                    newscategory={path.category}
                    country={path.country}
                    userData={path.userData} // Pass userData
                    likedNews={likedNews} // Pass liked news data
                    fetchLikedNews={fetchLikedNews} // Pass fetch function
                  />
                }
              />
            ))}
            <Route path="/search/:query" element={<Search />} />
          </Routes>
        </>
      ) : (
        <UserForm onSubmit={handleFormSubmit} />
      )}
    </Router>
  );
}

export default App;

/*
import React from "react";
import { v4 as uuidv4 } from "uuid";
import NavBar from "./components/NavBar/NavBar";
import News from "./components/News/News";
import HomePage from "./config/config"; // Import HomePage from config
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { router } from "./config/config";
import Search from "./components/Search/Search";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {router.map((path) => (
          <Route
            key={uuidv4()}
            path={path.path}
            element={
              <News
                newscategory={path.category}
                country={path.country}
              />
            }
          />
        ))}
        <Route path="/search/:query" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;*/

