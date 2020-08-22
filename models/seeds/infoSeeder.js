const bcrypt = require('bcryptjs')
const Restaurant = require('../info')
const User = require('../user')
const restaurantList = require('../../restaurant.json').results
const userList = require('../../user.json').results

if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const db = require('../../config/mongoose')

db.once('open', () => {
  userList.forEach(user => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        name: user.name,
        email: user.email,
        password: hash
      }))
      .then(user => {
        const array = []
        const userId = { userId: user._id }
        restaurantList.forEach(data => {
          if (user.name === 'User1' && data.id <= 4) {
            let obj = Object.assign(data, userId)
            array.push(obj)
          }
          if (user.name === 'User2' && data.id >= 5) {
            let obj = Object.assign(data, userId)
            array.push(obj)
          }
        })
        return Restaurant.create(array)
      })
  })
})
