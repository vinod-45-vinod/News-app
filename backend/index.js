const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
var Schema = mongoose.Schema
mongoose.connect('mongodb://localhost:27017/my-app')
const MyModel = mongoose.model('Login', new Schema({ country: String, dob: String, email: String, name: String }))
const MyModel2 = mongoose.model('feedback', new Schema({feedback: String}))

app.post('/forminfo', async (req, res) => {
    console.log(req.body)
    var new_user = new MyModel(req.body.frmdata)
    const sav_res = await new_user.save(new_user)
    res.send(sav_res)
})

app.get("/feedback", async(req, res) => {

  console.log(req.query)
  var fdback = new MyModel2({feedback: req.query.data})
  const save = await fdback.save()
  res.status(200).send(save)


})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})


const LikedNewsSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  alt: String,
  channel: String,
  published: String,
  urlNews: String,
  user: String, // Name of the user who liked the item
  email: String // Email of the user
});

const LikedNews = mongoose.model('LikedNews', LikedNewsSchema);


app.post('/saveLikedNews', async (req, res) => {
  try {
    const { newsItem } = req.body; // Extract news item data
    const newLikedNews = new LikedNews(newsItem); // Assuming LikedNews is the model for storing liked news
    const savedNews = await newLikedNews.save();
    res.status(200).send(savedNews);
  } catch (error) {
    console.error("Error saving liked news:", error);
    res.status(500).send("Error saving liked news");
  }
});

app.get('/getLikedNews', async (req, res) => {
  try {
    const { email } = req.query; // Extract email from query parameters
    if (!email) {
      return res.status(400).send("Email is required");
    }

    // Find liked news objects for the specified email
    const likedNews = await LikedNews.find({ email });
    res.status(200).json(likedNews); // Send the found objects as a JSON response
  } catch (error) {
    console.error("Error retrieving liked news:", error);
    res.status(500).send("Error retrieving liked news");
  }
});


const fetchLikedNews = async () => {
  try {
    setLoading(true); 
    const response = await axios.get("mongodb://localhost:27017/likednews", {
      params: { email: userData.email }, // Pass user email as query parameter
    });
    setArticles(response.data); // Update the articles state with liked news
    setLoading(false);
  } catch (error) {
    setLoading(false);
    setError("Failed to fetch liked news.");
    console.error(error);
  }
}


// mongodb://localhost:27017