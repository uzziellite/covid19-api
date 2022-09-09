const express = require('express')
const axios = require('axios')
const app = express()
const port = 3005

app.get('/covid', (req, res) => {
  //Get the Kenyan data from WHO
  
  axios.get('https://covid19.who.int/page-data/region/afro/country/ke/page-data.json').then((resp) => {
    
    const data = resp.data.result.data.countryPageData.today
    
    //Send the response back
    res.send(data)
  }).catch((err) => {
    console.log(`Unable to load the data: ${err}`)
  })

})

app.listen(port, () => {
  console.log(`Started covid 19 data fetcher on port: ${port}`)
})
