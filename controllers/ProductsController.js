const ProductsModel = require('../models/ProductsModel')

const ProductsDisplay = async (req, res) => {
    const ProductDetails = await ProductsModel.find();
    res.status(200).send(ProductDetails);
}


const SearchProducts = async (req, res) => {
  const rawInput = req.query.input || "";
  const input = rawInput.trim();

  if (!input) {
    return res.status(400).json({ message: "Search input is empty." });
  }

  const isNumeric = !isNaN(input);

  try {
    const conditions = isNumeric
      ? [
          { discountPrice: Number(input) },
          { price: Number(input) }
        ]
      : [];

    const searchRegex = new RegExp(input, "i");

    conditions.push(
      { productName: { $regex: searchRegex } },
      { brand: { $regex: searchRegex } },
      { productCategory: { $regex: searchRegex } }
    );

    const results = await ProductsModel.find({ $or: conditions });

    if (results.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).json({ message: "No matching products found." });
    }
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};



module.exports = {
    ProductsDisplay,
    SearchProducts
}