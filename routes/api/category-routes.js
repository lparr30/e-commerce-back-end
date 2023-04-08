const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const categories = await Category.findAll({
    include: [Product]
  })
  const newCategories = categories.map(category => category.get({plain: true}));
  res.json(newCategories);
  
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  const category = await Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      Product
    ]
  })
  const newCategory = category.get({plain: true});
  res.json(newCategory);
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  console.log(req.body.name);
  const category = await Category.create({
    category_name: req.body.name
  });
  res.json(category);
  // create a new category
});

router.put('/:id', async (req, res) => {
  const updated = await Category.update(req.body, {
    where: { id: req.params.id }
  })
  
  console.log(updated)
  res.json(updated);
  // update a category by its `id` value
});


// router.delete('/:id', (req, res) => {
//   // delete a category by its `id` value
// });

module.exports = router;
