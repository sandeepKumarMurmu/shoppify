const Product = require("../model/product_model");

const Product_controller = async (req, res) => {
  try {
   
    
    const { _page, _sort,_limit } = req.query;
    let filter = [];
    for (var key in req.query) {
      if (key !== "_sort" && key !== "_limit" && key !== "_page")
        filter.push({ [key]: req.query[key] });
    }
    filter = filter.length === 0 ? [{}] : filter;
    const data = await Product.find({
      $and: [...filter],
    })
      .sort({ price: _sort })
      .skip((_page - 1) * _limit)
      .limit(_limit)
      .lean()
      .exec();

    const totalPages = Math.ceil(
      (await Product.find({ $and: [...filter] }).countDocuments()) / _limit
    );
    return res.send({ data, totalPages });
  } catch (e) {
    return res.json({ err: e });
  }
};



module.exports = {Product_controller};
