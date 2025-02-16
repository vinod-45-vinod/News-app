import moment from "moment";
import React from "react";
import "./HomePage.css";
import "./fav.css";
import { useState } from "react";
import axios from "axios";
export const navbarBrand = "News App";
export const header = (category) => `News - Top ${category} Headlines`;
export const noFound = "No Results Found";
export const searching = "Searching...";
export const arrow = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
  </svg>
);

export const navs = [
  { nav: "Home", page: "/" },
  { nav: "General", page: "/categories/general" },
  { nav: "Business", page: "/categories/business" },
  { nav: "Sports", page: "/categories/sports" },
  { nav: "Science", page: "/categories/science" },
  { nav: "Health", page: "/categories/health" },
  { nav: "Entertainment", page: "/categories/entertainment" },
  { nav: "Technology", page: "/categories/technology" },  
  { nav: "fav", page: "/fav" },  
];

// Home component
const HomePage = () => {
  const [feedback, Setfeedback] = useState("");

  const handleChange = (e) => {
    Setfeedback(e.target.value);
  };

  async function send_feedback(e) {
    e.preventDefault();
    const response = await axios.get(
      `http://localhost:3000/feedback/?data=${feedback}`
    );
    console.log(response);
  }


  return (
    <>
      <div className="homepage-container">
        <h1 className="homepage-title">Welcome to Your News App</h1>
      </div>
      <div className="container-loader">
        <div class="loader">
          <div class="loader__circle"></div>
          <div class="loader__circle"></div>
          <div class="loader__circle"></div>
          <div class="loader__circle"></div>
          <div class="loader__circle"></div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section about">
            <p>
              NewsApp.io is a Global Media and Information Platform providing
              the latest news and job opportunities from fields related to
              Technology and Digital Marketing.
            </p>
          </div>

          <div className="feedback-form">
            <div className="feedback-lebel">Send Your Feedback</div>
            <form onSubmit={send_feedback} className="user-frm">
              <textarea
                cols="34"
                value={feedback}
                onChange={handleChange}
              ></textarea>
              <input
                className="feedback-submit"
                type="submit"
                value="send Feedback"
              />
            </form>

            {/* <button className="feedback-submit" onClick={}>Submit</button> */}
          </div>

          <div className="footer-section contact-info">
            <h2>Contact Info</h2>
            <p>Email: newsapp@gmail.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 NewsApp. All rights reserved.</p>
          <div className="footer-links">
            <a href="#terms">Terms</a>
            <a href="#privacy">Privacy</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
};

const Fav = () => {
  return(<>
        <div className="favv">Your favorite articles iijjjj will appear here.</div>
        <h1>hiii</h1>
  </>);
};


export const router = [
  {
    path: "/",
    key: "home",
    category: "home",
    country: "us",
    component: HomePage,
  },
  {
    path: "/fav",
    key: "fav",
    category: "fav",
    country: "us",
    component: Fav,
  },
  {
    path: "/categories/general",
    key: "general",
    category: "general",
    country: "us",
  },
  {
    path: "/categories/business",
    key: "business",
    category: "business",
    country: "us",
  },
  {
    path: "/categories/sports",
    key: "sports",
    category: "sports",
    country: "us",
  },
  {
    path: "/categories/science",
    key: "science",
    category: "science",
    country: "us",
  },
  {
    path: "/categories/health",
    key: "health",
    category: "health",
    country: "us",
  },
  {
    path: "/categories/entertainment",
    key: "entertainment",
    category: "entertainment",
    country: "us",
  },
  {
    path: "/categories/technology",
    key: "technology",
    category: "technology",
    country: "us",
  },
];

export const summary = "Channel and PublishedAt";
export const newsChannel = (channel) => `${channel}`;  // retrieve the channel name.
export const lastUpdate = (published) =>
  `${moment(published).format("ddd, DD MMM YYYY HH:mm:ss")}`; // Uses the moment library to format the date into the format: ddd, DD MMM YYYY HH:mm:ss.

export default HomePage;
