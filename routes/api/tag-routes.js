const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const tags = await Tag.findAll({
    include: [Product]
  })
  const newTags = tags.map(tag => tag.get({plain:true}));
  res.json(newTags);
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  const tag = await Tag.findOne({
    include:[Product],
    where: {
      id: req.params.id
    }
  })
  const newTag = tag.get({plain:true});
  res.json(newTag);
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  const tag = await Tag.create({ tag_name: req.body.tag_name })
  res.json(tag);
  // create a new tag
});

router.put('/:id', async (req, res) => {
  const update = await Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  });

  res.json(update);
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
