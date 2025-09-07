require('dotenv').config()
const express = require('express')
const app = express()
// TODO: import the getCityInfo and getJobs functions from util.js
const { getCityInfo, getJobs } = require('./util.js')
// TODO: Statically serve the public folder
app.use(express.static('public'))
// TODO: declare the GET route /api/city/:city
app.get('/api/city/:city', async (req, res) => {
  try {
    const cityName = req.params.city;
// This endpoint should call getCityInfo and getJobs and return
// the result as JSON.
// The returned JSON object should have two keys:
// cityInfo (with value of the getCityInfo function)
// jobs (with value of the getJobs function)
// If no city info or jobs are found,
// the endpoint should return a 404 status
    const cityInfo = await getCityInfo(cityName); 
    const jobs = await getJobs(cityName); 
    if (cityInfo === false && jobs === false) {
        return res.status(404).json({ 
                error: 'City info or jobs not found'
        });
    }

    res.json({
        cityInfo: cityInfo,
        jobs: jobs
    });

    } catch (error) {
    res.status(500).json({ 
        error: 'Server error' });
  }
});
module.exports = app
