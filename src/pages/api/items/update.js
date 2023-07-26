import axios from 'axios'

export default async function UpdateItem(req, res) {
  const https = require('https')
  const agent = new https.Agent({
    rejectUnauthorized: false,
  })
  
  return axios
    .put(process.env.API_URL + '/api/items', req.body, { httpsAgent: agent })
    .then(function (response) {
      res.status(200).json()
    })
    .catch(function (error) {
      res.status(500).json({ error: error.response.data.errors })
    })
    .finally(function () {})
}