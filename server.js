const express = require('express')
const app = express()
const axios = require('axios');
const API_KEY = '2ca1e533c1a88f9825019741e3954b7e67e60c9c80fc3b542a682cb883cc8bc1'; 

// Middleware untuk menambahkan header CORS ke setiap respons
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


// Fungsi untuk mengambil data countries dari API Football
async function getFootballData() {
  try {
    const response = await axios.get('https://apiv3.apifootball.com/?action=get_countries', {
      params: {
        APIkey: API_KEY
      }
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching football data:', error);
    return null;
  }
}

//Routing untuk menampilkan data countries FootballAPI
app.get('/', async (req, res) => {
  const footballData = await getFootballData();
  if (footballData) {
    res.json(footballData);
  } else {
    res.status(500).json({ error: 'Failed to fetch football data' });
  }
  });  
  
// Routing dan endpoint untuk mengambil dan menampilkan data liga berdasarkan country_id
app.get('/leagues/:countryId', async (req, res) => {
  const { countryId } = req.params;

  try {
    const response = await axios.get(`https://apiv3.apifootball.com/?action=get_leagues&country_id=${countryId}&APIkey=${API_KEY}`);
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching leagues:', error);
    res.status(500).json({ error: 'An error occurred while fetching leagues.' });
  }
});

app.listen(2000, () => {console.log("Server started on port 2000")})