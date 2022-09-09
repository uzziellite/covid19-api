const app = require('express')()
const axios = require('axios')
//const app = express()
//const port = 3000

app.get('/api', (req, res) => {
  const path = `/api/covid`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=3600, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
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

module.exports = app;

/*app.listen(port, () => {
  console.log(`Started covid 19 data fetcher on port: ${port}`)
})*/
