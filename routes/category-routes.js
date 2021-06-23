const router = require('express').Router()
const { Category, Product } = require('../models')

// The `/api/categories` endpoint

router.get('/categories', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ['product_name']
    }
  })
  .then(categories => res.json(categories))
  .catch(err)
})

router.get('/categories/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({where: {id: req.params.id},
    include: {
      model: Product,
      attributes: ['category_id']
    }
  })
})

router.post('/categories', (req, res) => {
  // create a new category
  Category.create({category_name: req.body.category_name})
  .then(category => res.json(category))
  .catch(err)
})

router.put('/categories/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({category_name: req.body.category_name}{
    where: {id: req.params.id}
  })
  .then(category => res.json(category))
  .catch(err => console.log('no category by that name'))
})

router.delete('/categories/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({ where: {id:req.params.id}})
  .then(category => res.json(category))
  .catch(err => console.log(err))
})

module.exports = router
