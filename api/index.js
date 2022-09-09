const app = require('express')()
const axios = require('axios')
const cors = require('cors')

//Allow requests from any origin
app.use(cors())

app.get('/', (req,res) => {
  res.setHeader('Content-Type', 'text/html')
  res.end(`API only fetches Covid 19 data for Kenya.`)
})

app.get('/api', (req, res) => {
  const path = `/api/covid`
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Cache-Control', 's-max-age=3600, stale-while-revalidate')
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`)
})

app.get('/api/covid', (req, res) => {
  //Get the Kenyan data from WHO
  
  axios.get('https://covid19.who.int/page-data/region/afro/country/ke/page-data.json').then((resp) => {
    
    const data = resp.data.result.data.countryPageData.today
    
    //Send the response back
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 's-max-age=3600, stale-while-revalidate')
    res.send(data)
  }).catch((err) => {
    console.log(`Unable to load the data: ${err}`)
  })

})

module.exports = app
