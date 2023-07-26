import axios from 'axios'

export default async function AddCategories(req, res) {
  try {
    const https = require('https')
    const agent = new https.Agent({
      rejectUnauthorized: false,
    })

    return axios
      .post(process.env.API_URL + '/api/categories', req.body, { httpsAgent: agent })
      .then(function (response) {
        res.status(200).json(response.data)
      })
      .catch(function (error) {
        res.status(500).json({ error: error.response.data.errors })
      })
      .finally(function () {})
  } catch (err) {
    console.log(err)
  }
}