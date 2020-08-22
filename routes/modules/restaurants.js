const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/info')

// 引用restaurant模組程式碼

// Search method
router.get('/search', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword
  Restaurant.find({ userId, name: { $regex: keyword, $options: "i" } })
    .lean()
    .then(restaurant => {
      if (restaurant.length !== 0) {
        res.render('index', { restaurant, keyword })
      } else {
        res.render('no', { keyword: keyword })
      }
    })
    .catch(error => console.log(error))
})

// Creat method
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  let { name, category, location, google_map, phone, image, description, rating } = req.body
  if (!image.length) {
    image = 'https://i.imgur.com/kXNxrm9.jpg'
  }

  const restaurant = new Restaurant({
    name,
    category,
    location,
    google_map,
    phone, image,
    description,
    rating,
    userId
  })
  return restaurant.save()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Detail method
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((store) => res.render('show', { store }))
    .catch(error => console.log(error))
})

// Edit method
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const newEdit = req.body
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant = Object.assign(restaurant, newEdit)
      // for (let i in newEdit) {
      //   if (restaurant[i]) {
      //     restaurant[i] = newEdit[i]
      //     console.log(restaurant[i]) //test
      //   }
      // }
      restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}/edit`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(data => data.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
