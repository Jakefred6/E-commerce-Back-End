const router = require("express").Router();
const { Category, Product } = require("../../models");

// The /api/categories endpoint

router.get("/", (req, res) => {
  // Ensure to include associated Products

  // Find all categories and include associated Products
  Category.findAll({
    include: [{ model: Product }],
  })
    .then((categories) => {
      // Successfully retrieved categories, send JSON response
      res.status(200).json(categories);
    })
    .catch((error) => {
      // Error handling: log the error and send Internal Server Error response
      console.error("Error getting categories:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.get("/:id", (req, res) => {
  const categoryId = req.params.id;

  // Find one category by its id value and include associated Products
  Category.findByPk(categoryId, {
    include: [{ model: Product }],
  })
    .then((category) => {
      // Check if category is found and send the appropriate response
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    })
    .catch((error) => {
      // Error handling: log the error and send Internal Server Error response
      console.error("Error getting category by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.post("/", (req, res) => {
  // get category_name from request body
  const { category_name } = req.body;

  // Create a new category
  Category.create({
    category_name,
  })
    .then((newCategory) => {
      // Successfully created category, send JSON response with status 200 (Created)
      res.status(200).json(newCategory);
    })
    .catch((error) => {
      // Error handling: log the error and send Internal Server Error response
      console.error("Error creating category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.put("/:id", (req, res) => {
  // Extract category ID and category_name from request parameters and body
  const categoryId = req.params.id;
  const { category_name } = req.body;

  // Find category by its id value
  Category.findByPk(categoryId)
    .then((category) => {
      // Check if category is found
      if (category) {
        // Update category with the new category_name
        return category.update({
          category_name,
        });
      } else {
        // If category not found, send 404 response
        res.status(404).json({ error: "Category not found" });
      }
    })
    .then((updatedCategory) => {
      // Send JSON response with the updated category and status 200 (OK)
      res.status(200).json(updatedCategory);
    })
    .catch((error) => {
      // Error handling: log the error and send Internal Server Error response
      console.error("Error updating category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.delete("/:id", (req, res) => {
  const categoryId = req.params.id;

  // Find category by its id value
  Category.findByPk(categoryId)
    .then((category) => {
      // Check if category is found
      if (category) {
        // Destroy (delete) the category
        return category.destroy();
      } else {
        // If category not found, send 404 response
        res.status(404).json({ error: "Category not found" });
      }
    })
    .then(() => {
      // Send 200 response (No Content) after successful deletion
      res.status(200).send({ message: "Category Deleted Successfully" });
    })
    .catch((error) => {
      // Error handling: log the error and send Internal Server Error response
      console.error("Error deleting category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
