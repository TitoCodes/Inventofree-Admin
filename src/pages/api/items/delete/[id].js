import axios from 'axios'

export default (req, res)  => {
  const https = require('https')
  const agent = new https.Agent({
    rejectUnauthorized: false,
  })

  const {
    query: { id },
  } = req;

  return axios
    .delete(process.env.API_URL + '/api/items/' + id, { httpsAgent: agent })
    .then(function (response) {
      res.status(200).json()
    })
    .catch(function (error) {
      res.status(500).json({ error: error.response.data.errors })
    })
    .finally(function () {})
}