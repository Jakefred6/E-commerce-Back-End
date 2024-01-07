// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category with a foreign key 'category_id'
Product.belongsTo(Category, { foreignKey: "category_id" });

// Categories have many Products
Category.hasMany(Product, { foreignKey: "category_id" });

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, { through: ProductTag, foreignKey: "product_id" });

// Tags belongToMany Products (through ProductTag) join table with a foreign key 'tag_id'
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: "tag_id" });

// Product belongToMany Tag (through ProductTag) join table with a foreign key 'product_id'
Product.belongsToMany(Tag, { through: ProductTag, foreignKey: "product_id" });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
