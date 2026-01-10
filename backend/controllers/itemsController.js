const Item = require('../models/Item');

// GET
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST
exports.createItem = async (req, res) => {
  try {
    const item = new Item({
      name: req.body.name
    });

    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
