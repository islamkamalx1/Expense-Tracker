const transactionModel = require("../model/transaction");

/*
 * @desc    GET all transactions
 * @route   GET /api/v1/transactions
 * @access  public
 */
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await transactionModel.find();
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "server error",
    });
  }
};

/*
 * @desc    ADD transaction
 * @route   POST /api/v1/transactions
 * @access  public
 */
exports.addTransactions = async (req, res, next) => {
  try {
    const transactions = await transactionModel.create(req.body);
    return res.status(201).json({
      success: true,
      date: transactions,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "server error",
      });
    }
  }
};

/*
 * @desc    DELETE transaction
 * @route   DELETE /api/v1/transactions/:id
 * @access  public
 */
exports.deleteTransactions = async (req, res, next) => {
  try {
    const transaction = await transactionModel.findByIdAndDelete(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "server error",
    });
  }
};
