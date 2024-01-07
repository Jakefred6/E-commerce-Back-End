const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // Find all tags and include associated Product data
  Tag.findAll({
    include: [{ model: Product }],
  })
    .then((tags) => {
      // Successfully retrieved tags, send JSON response
      res.status(200).json(tags);
    })
    .catch((error) => {
      // Error handling: log the error and send Internal Server Error response
      console.error("Error getting tags:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.get("/:id", (req, res) => {
  const tagId = req.params.id;

  // Find a single tag by its `id` and include associated Product data
  Tag.findByPk(tagId, {
    include: [{ model: Product }],
  })
    .then((tag) => {
      // Check if tag is found and send the appropriate response
      if (tag) {
        res.status(200).json(tag);
      } else {
        res.status(404).json({ error: "Tag not found" });
      }
    })
    .catch((error) => {
      // Error handling: log the error and send Internal Server Error response
      console.error("Error getting tag by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.post("/", (req, res) => {
  // Create a new tag
  const { tag_name } = req.body;

  Tag.create({
    tag_name,
  })
    .then((newTag) => {
      // Successfully created tag, send JSON response with status 201 (Created)
      res.status(201).json(newTag);
    })
    .catch((error) => {
      // Error handling: log the error and send Internal Server Error response
      console.error("Error creating tag:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ message: "No tag found with this id" });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // Extract tag ID and updated tag_name from request parameters and body
  const tagId = req.params.id;
  const { tag_name } = req.body;

  // Find tag by its `id` value
  Tag.findByPk(tagId)
    .then((tag) => {
      // Check if tag is found
      if (tag) {
        // Update tag's name with the new tag_name
        return tag.update({
          tag_name,
        });
      } else {
        // If tag not found, send 404 response
        res.status(404).json({ error: "Tag not found" });
      }
    })
    .then((updatedTag) => {
      // Send JSON response with the updated tag and status 200 (OK)
      res.status(200).json(updatedTag);
    })
    .catch((error) => {
      // Error handling: log the error and send Internal Server Error response
      console.error("Error updating tag:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
