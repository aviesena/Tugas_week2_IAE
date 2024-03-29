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
 
//Routing untuk menampilkan data countries FootballAPI
app.get('/', async (req, res) => {
  try {
    const response = await axios.get(`https://apiv3.apifootball.com/?action=get_countries&APIkey=${API_KEY}`);
    res.json(response.data);
  } catch(error) {
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

// Routing dan endpoint untuk mengambil dan menampilkan data klasemen berdasarkan league_id
app.get('/standings/:leagueId', async (req, res) => {
  const { leagueId } = req.params;

  try {
    const response = await axios.get(`https://apiv3.apifootball.com/?action=get_standings&league_id=${leagueId}&APIkey=${API_KEY}`);
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching standings:', error);
    res.status(500).json({ error: 'An error occurred while fetching standings.' });
  }
});

app.get('/team/:teamId', async (req, res) => {
  try {
    const { teamId } = req.params;
    const response = await axios.get(`https://apiv3.apifootball.com/?action=get_teams&team_id=${teamId}&APIkey=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.listen(2000, () => {console.log("Server started on port 2000")})

