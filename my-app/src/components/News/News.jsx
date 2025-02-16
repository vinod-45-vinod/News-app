import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import NullImage from "../../components/Images/nullImage.png";
import Loading from "../Loading/Loading";
import NewsItem from "../NewsItem/NewsItem";
import { Col, Row, Button } from "react-bootstrap";
import { header } from "../../config/config";
import { endpointPath } from "../../config/api";
import { Container, Header } from "./index";

dayjs.extend(utc);

function News({ newscategory = "general", country = "us", userData, fetchLikedNews }) {
  const [articles, setArticles] = useState([]);
  const [art, setArt] = useState([]); // State to store liked articles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const title = capitalize(newscategory);
  document.title = `${title} - News`;

  const updateNews = async (newPage = 1) => {
    try {
      setLoading(true);
      if (newscategory === "fav") {
        // Fetch liked news for "fav" category
        const likedNews = await fetchLikedNews();
        setArt(likedNews || []); // Update the art state with liked news
      } else {
        const response = await axios.get(endpointPath(country, newscategory, newPage));
        setArticles(newPage === 1 ? response.data.articles : [...articles, ...response.data.articles]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Failed to fetch articles.");
      console.error(error);
    }
  };

  useEffect(() => {
    updateNews(); // Fetch initial set of articles
  }, [newscategory, country]); // Re-fetch on category or country change

  const fetchPastWeekNews = async (newPage) => {
    try {
      setLoading(true);
      const fromDate = dayjs().utc().subtract(3, "day").format("YYYY-MM-DDTHH:mm:ss[Z]");
      const toDate = dayjs().utc().subtract(1, "day").format("YYYY-MM-DDTHH:mm:ss[Z]");
      const response = await axios.get(endpointPath(country, newscategory, newPage), {
        params: { from: fromDate, to: toDate },
      });

      if (newPage === 1) {
        setArticles(response.data.articles);
      } else {
        setArticles((prevArticles) => [...prevArticles, ...response.data.articles]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Failed to fetch articles.");
      console.error(error);
    }
  };

  const loadMoreArticles = () => {
    if (newscategory === "fav") return; // Do not fetch more articles for "fav"
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchPastWeekNews(nextPage);
      return nextPage;
    });
  };

  return (
    <>
      {loading && page === 1 ? (
        <Loading />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          {/* Conditionally render the header */}
          {newscategory !== "fav" && <Header>{header(title)}</Header>}

          <Container>
            {newscategory === "fav" ? (
              <>
                <h2>Your favorite articles will appear here.</h2>
                <Row>
                  {art.length === 0 ? (
                    <p>No favorite articles found.</p>
                  ) : (
                    art.map((element, index) => (
                      <Col sm={12} md={6} lg={4} xl={3} key={element._id || `${element.url}-${index}`}>
                        <NewsItem
                          title={element.title}
                          description={element.description}
                          published={element.published}
                          channel={element.channel}
                          alt="News image"
                          imageUrl={element.imageUrl === null ? NullImage : element.imageUrl}
                          urlNews={element.urlNews}
                          userData={userData}
                        />
                      </Col>
                    ))
                  )}
                </Row>
              </>
            ) : (
              <>
                <Row>
                  {articles.map((element, index) => (
                    <Col sm={12} md={6} lg={4} xl={3} key={element.url || `${element.title}-${index}`}>
                      <NewsItem
                        title={element.title}
                        description={element.description}
                        published={element.publishedAt}
                        channel={element.source.name}
                        alt="News image"
                        imageUrl={element.image === null ? NullImage : element.image}
                        urlNews={element.url}
                        userData={userData}
                      />
                    </Col>
                  ))}
                </Row>
                <div className="d-flex justify-content-center mt-4">
                  <Button onClick={loadMoreArticles}>Load More</Button>
                </div>
              </>
            )}
          </Container>
        </>
      )}
    </>
  );
}

News.propTypes = {
  country: PropTypes.string,
  newscategory: PropTypes.string,
  userData: PropTypes.object,
  fetchLikedNews: PropTypes.func,
};

export default News;
