import axios from 'axios'

export default async function AddItems(req, res) {
  try {
    const https = require('https')
    const agent = new https.Agent({
      rejectUnauthorized: false,
    })

    return axios
      .post(process.env.API_URL + '/api/items', req.body, { httpsAgent: agent })
      .then(function (response) {
        res.status(200).json(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .finally(function () {})
  } catch (err) {
    console.log(err)
  }
}
