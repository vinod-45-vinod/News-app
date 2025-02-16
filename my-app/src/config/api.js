const API_DOMAIN = "https://gnews.io/api/v4";
const API_KEY = "0554a6024f2cc02cc201ed510651f7f3"; // Updated API key api 2: "8d4efc0449b9b8f2c06c394a0d6f9de1" , 0554a6024f2cc02cc201ed510651f7f3

export const endpointPath = (country, category) =>
  `${API_DOMAIN}/top-headlines?country=${country}&lang=en&category=${category}&apikey=${API_KEY}`;

export const endpointSearch = (searchQuery) =>
  `${API_DOMAIN}/search?q=${searchQuery}&lang=en&apikey=${API_KEY}`;
