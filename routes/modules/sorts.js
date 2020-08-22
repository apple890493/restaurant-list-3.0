const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/info')

router.get('/', (req, res) => {
  const userId = req.user._id
  const sortBy = req.query.by
  let x = '1'
  if (sortBy === 'name2' || sortBy === 'rating') {
    x = '-1'
  }
  Restaurant.find({ userId })
    .lean()
    .sort({ [sortBy]: x })
    .then(restaurant => res.render('index', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

module.exports = router