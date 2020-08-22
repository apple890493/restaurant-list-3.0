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
  Promise.all(Array.from({ length: 2 }, (_, i) => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(userList[i].password, salt))
      .then(hash => User.create({
        name: userList[i].name,
        email: userList[i].email,
        password: hash
      }))
      .then(user => {
        const array = []
        const userId = { userId: user._id }
        restaurantList.forEach(data => {
          if (user.name === 'User1' && data.id < 5) {
            let obj = Object.assign(data, userId)
            array.push(obj)
          }
          if (user.name === 'User2' && data.id > 4) {
            let obj = Object.assign(data, userId)
            array.push(obj)
          }
        })
        return Promise.all(Array.from({ length: 4 }, (_, i) => Restaurant.create(array[i])))
      })
  }))
    .then(() => {
      console.log('done')
      process.exit()
    })
})