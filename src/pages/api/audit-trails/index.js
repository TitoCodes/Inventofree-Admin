import axios from 'axios'
export default async function AuditTrails(req, res) {
  try {
    const https = require('https');
    const agent = new https.Agent({  
      rejectUnauthorized: false
    });
    
   return axios.get('https://localhost:5001/api/audit-trails', { httpsAgent: agent })
  .then(function (response) {
    res.status(200).json(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    
  });
	} catch (err) {
		console.log(err);
	}
}