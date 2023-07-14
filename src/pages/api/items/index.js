import axios from 'axios'

export default async function Items(req, res) {
  try {
    const https = require('https')
    const agent = new https.Agent({
      rejectUnauthorized: false,
    })

    return axios
      .get(process.env.API_URL + '/api/items', { httpsAgent: agent })
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
