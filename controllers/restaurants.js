const restRouter = require('express').Router()
const Restaurant = require('../models/restaurant')

restRouter.get('/', (request, response, next) => {
  try {
    Restaurant.find({}).then(restaurants => {
      response.json(restaurants)
    })
  } catch (error) {
    error => next(error)
  }
})

restRouter.get('/:id', (request, response, next) => {
  try {
    Restaurant.findById(request.params.id).then(item => {
      if (item) {
        response.json(item)
      } else {
        response.status(404).end()
      }
    })
  } catch (error) {
    error => next(error)
  }
})

restRouter.post('/', (request, response, next) => {
  const body = request.body
  console.log('post')
  console.log(body)
  if (!body.rname) {
    return response.status(400).json({
      error: 'name missing',
    })
  }
  const item = new Restaurant({
    rname: body.rname,
    imgdata:
      'https://b.zmtcdn.com/data/pictures/7/19639627/94c0a4cf15c02d3982d154e2c5dd8cbb_o2_featured_v2.jpg',
    address: body.address,
    delimg:
      'https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp',
    somedata: body.somedata,
    price: body.price,
    rating: body.rating,
    arrimg:
      'https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp',
  })
  try {
    item.save().then(savedItem => {
      response.json(savedItem)
    })
  } catch (error) {
    error => next(error)
  }
})

restRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const item = {
    rname: body.rname,
    imgdata:
      'https://b.zmtcdn.com/data/pictures/7/19639627/94c0a4cf15c02d3982d154e2c5dd8cbb_o2_featured_v2.jpg',
    address: body.address,
    delimg:
      'https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp',
    somedata: body.somedata,
    price: body.price,
    rating: body.rating,
    arrimg:
      'https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp',
  }

  try {
    Restaurant.findByIdAndUpdate(request.params.id, item, { new: true }).then(
      updateItem => {
        response.json(updateItem)
      },
    )
  } catch (error) {
    error => next(error)
  }
})

restRouter.delete('/:id', (request, response, next) => {
  try {
    Restaurant.findByIdAndRemove(request.params.id).then(result => {
      response.json(result).status(204).end()
    })
  } catch (error) {
    error => next(error)
  }
})

module.exports = restRouter
