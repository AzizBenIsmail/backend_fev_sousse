const productModel = require("../models/product.model");
const userModel = require("../models/user.model");

module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, imageUrl } = req.body;
    const newProduct = new productModel({
      name,
      description,
      price,
      category,
      stock,
      imageUrl,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock, imageUrl } = req.body;
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { name, description, price, category, stock, imageUrl },
      { new: true },
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const products = await productModel.find({ category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getProductsByPriceRange = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.body;
    const products = await productModel.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getProductsByStockAvailability = async (req, res) => {
  try {
    const { inStock } = req.body;
    const products = await productModel.find({
      stock: inStock ? { $gt: 0 } : 0,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getProductsByName = async (req, res) => {
  try {
    const { name } = req.body;
    const products = await productModel.find({
      name: { $regex: name, $options: "i" },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getProductsByDescription = async (req, res) => {
  try {
    const { description } = req.body;
    const products = await productModel.find({
      description: { $regex: description, $options: "i" },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getProductsByCreationDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const products = await productModel.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getProductsByMultipleCriteria = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice, inStock } = req.body;
    const query = {};
    if (name) {
      query.name = { $regex: name, $options: "i" };
    }
    if (category) {
      query.category = category;
    }
    if (minPrice !== undefined && maxPrice !== undefined) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    }
    if (inStock !== undefined) {
      query.stock = inStock ? { $gt: 0 } : 0;
    }
    const products = await productModel.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getProductsSortedByPrice = async (req, res) => {
  try {
    const { sortOrder } = req.body;
    const products = await productModel
      .find()
      .sort({ price: sortOrder === "asc" ? 1 : -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getProductsSortedByCreationDate = async (req, res) => {
  try {
    const { sortOrder } = req.body;
    const products = await productModel
      .find()
      .sort({ createdAt: sortOrder === "asc" ? 1 : -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getProductsSortedByName = async (req, res) => {
  try {
    const { sortOrder } = req.body;
    const products = await productModel
      .find()
      .sort({ name: sortOrder === "asc" ? 1 : -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getProductsSortedByStock = async (req, res) => {
  try {
    const { sortOrder } = req.body;
    const products = await productModel
      .find()
      .sort({ stock: sortOrder === "asc" ? 1 : -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getProductsSortedByCategory = async (req, res) => {
  try {
    const { sortOrder } = req.body;
    const products = await productModel
      .find()
      .sort({ category: sortOrder === "asc" ? 1 : -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getProductsSortedByMultipleCriteria = async (req, res) => {
  try {
    const { sortBy, sortOrder } = req.body;
    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
    }
    const products = await productModel.find().sort(sortOptions);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getProductsWithPagination = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.body;
    const products = await productModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getProductsCount = async (req, res) => {
  try {
    const count = await productModel.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.statiqticsByCategory = async (req, res) => {
  try {
    const stats = await productModel.aggregate([
      {
        $group: {
          _id: "$category",
          totalProducts: { $sum: 1 },
          averagePrice: { $avg: "$price" },
        },
      },
    ]);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.statiqticsByPriceRange = async (req, res) => {
  try {
    const stats = await productModel.aggregate([
      {
        $bucket: {
          groupBy: "$price",
          boundaries: [0, 50, 100, 200, 500, 1000],
          default: "Other",
          output: { count: { $sum: 1 } },
        },
      },
    ]);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.statiqticsByStockAvailability = async (req, res) => {
  try {
    const stats = await productModel.aggregate([
      {
        $group: {
          _id: { $cond: [{ $gt: ["$stock", 0] }, "In Stock", "Out of Stock"] },
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.statiqticsByCreationDate = async (req, res) => {
  try {
    const stats = await productModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.statiqticsByMultipleCriteria = async (req, res) => {
  try {
    const stats = await productModel.aggregate([
      {
        $group: {
          _id: {
            category: "$category",
            priceRange: {
              $cond: [
                { $lte: ["$price", 50] },
                "0-50",
                { $cond: [{ $lte: ["$price", 100] }, "51-100", "100+"] },
              ],
            },
          },
        },
        count: { $sum: 1 },
      },
    ]);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.buyProductCar = async (req, res) => {
  try {
    const { id, ownerId } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    // const carUpdate = await productModel.findByIdAndUpdate(   //Many
    //   id,
    //   { $push: { owners: ownerId } },
    //   { new: true },
    // );

    const carUpdate = await productModel.findByIdAndUpdate(   //One
      id,
      { owner: ownerId },
      { new: true },
    );

    // const userUpdate = await userModel.findByIdAndUpdate( //one
    //   ownerId,
    //   { product: id },
    //   { new: true },
    // );

    const userUpdate = await userModel.findByIdAndUpdate( //Many
      ownerId,
      { $push: { listofproducts: id } },
      { new: true },
    );
    res
      .status(200)
      .json({ message: "Product purchased successfully", product: carUpdate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.returnProductCar = async (req, res) => {
  try {
    const { id, ownerId } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    // const carUpdate = await productModel.findByIdAndUpdate(   //Many
    //   id,
    //   { $pull: { owners: ownerId } },
    //   { new: true },
    // );

    const carUpdate = await productModel.findByIdAndUpdate(   //One
      id,
      { $unset: { owner: "" } },
      { new: true },
    );

    // const userUpdate = await userModel.findByIdAndUpdate( //one
    //   ownerId,
    //   { $unset: { product: "" } },
    //   { new: true },
    // );

    const userUpdate = await userModel.updateMany(//Many
      { listofproducts: id },
      { $pull: { listofproducts: id } }
    );

    // const userUpdate = await userModel.findByIdAndUpdate( //Many
    //   ownerId,
    //   { $pull: { listofproducts: id } },
    //     { new: true },  
    // );
    res
      .status(200)
      .json({ message: "Product returned successfully", product: carUpdate });
  }
    catch (error) { 
    res.status(500).json({ error: error.message });
  }
};