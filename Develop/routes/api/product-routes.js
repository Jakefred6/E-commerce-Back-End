const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", (req, res) => {
  // Retrieve all products, including associated Category and Tag information
  Product.findAll({
    include: [
      Category,
      {
        model: Tag,
        through: ProductTag,
      },
    ],
  })
    .then((products) => {
      // Successfully retrieved products, send JSON response
      res.status(200).json(products);
    })
    .catch((error) => {
      // Error handling: log the error and send Internal Server Error response
      console.error("Error getting products:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// get one product
router.get("/:id", (req, res) => {
  const productId = req.params.id;

  // Find product by its `id` value, including associated Category and Tag information
  Product.findByPk(productId, {
    include: [
      Category,
      {
        model: Tag,
        through: ProductTag,
      },
    ],
  })
    .then((product) => {
      // Check if product is found and send the appropriate response
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    })
    .catch((error) => {
      // Error handling: log the error and send Internal Server Error response
      console.error("Error getting product by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// create new product
router.post("/", (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put("/:id", (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        ProductTag.findAll({
          where: { product_id: req.params.id },
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  const productId = req.params.id;

  // Find product by its `id` value
  Product.findByPk(productId)
    .then((product) => {
      // Check if product is found
      if (product) {
        return product.destroy();
      } else {
        // If product not found, send 404 response
        res.status(404).json({ error: "Product not found" });
      }
    })
    .then(() => {
      // Send 200 response (No Content) after successful deletion
      res.status(200).send({ message: "Product Deleted Successfully" });
    })
    .catch((error) => {
      // Error handling: log the error and send Internal Server Error response
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
