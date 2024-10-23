const fetchHandler = require('../utils/fetchHandler')

exports.giveQuote = async (req, res) => {
 const API_URL = "https://zenquotes.io/api/quotes"
 const [data, error] = await fetchHandler(API_URL)
 if (error) {
   console.log(error.message)
   return res.status(404).send(error)
 }
 res.send(data)
};

