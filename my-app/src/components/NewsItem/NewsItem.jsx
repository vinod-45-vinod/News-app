import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import Details from "./Details/Details";
import ArrowIcon from "../Images/ArrowIcon.svg"; 
import "./NewsItem.css";
import copy from "../Images/copy.svg";
import likedEmpty from "../Images/liked-empty.svg";  // hollow icon
import likedFilled from "../Images/liked-filled.svg";  // filled icon
import axios from 'axios';

function NewsItem(props) {
  const { imageUrl, alt, description, title, channel, published, urlNews, userData } = props;
  const [isLiked, setIsLiked] = useState(false); // Track liked state
    // console.log(userData);

  const handleLikeClick = async () => {
    setIsLiked(!isLiked); // Toggle the liked state
    if (!isLiked) {
      try {
        const newsItemData = {
          title,
          description,
          imageUrl,
          alt,
          channel,
          published,
          urlNews,
          user: userData.name,
          email: userData.email
        };
        
        // Send data to backend to save it
        const response = await axios.post("http://localhost:3000/saveLikedNews", { newsItem: newsItemData });
        console.log("News item saved", response);
      } catch (error) {
        console.error("Error saving liked news item", error);
      }
    }
  };

  const handleCopyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(urlNews).then(
        () => {
          alert("URL copied to clipboard!");
        },
        (err) => {
          alert("Failed to copy URL. Please try again.");
          console.error("Clipboard error:", err);
        }
      );
    } else {
      alert("Clipboard API not supported in this browser.");
    }
  };

  return (
    <Card className="card">
      <Card.Img className="card-img" variant="top" src={imageUrl} alt={alt} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className="card-description">{description}</Card.Text>
        <Details channel={channel} published={published} />
        <div className="card-actions">
          <Button className="card-btn" href={urlNews} target="_blank">
            Read more <img src={ArrowIcon} alt="Arrow" className="arrow-icon" />
          </Button>
          <Button className="copy-btn" onClick={handleCopyToClipboard}>
            <img src={copy} alt="Copy" className="copy-icon" />
          </Button>
          <div onClick={handleLikeClick}>
            <img
              src={isLiked ? likedFilled : likedEmpty}
              alt="like"
              className="liked-icon"
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

NewsItem.propTypes = {
  imageUrl: PropTypes.string,
  alt: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  channel: PropTypes.string,
  published: PropTypes.string,
  urlNews: PropTypes.string,
  userData: PropTypes.object.isRequired // Pass user data (name, email) to NewsItem
};

export default NewsItem;
