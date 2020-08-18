const { response } = require("express");

module.exports = {
  response: (res, result) =>
    {
      const resultPrint = {
        status : result.status || 500,
        message: result.message || null,
        data : result.data || null,
        err : result.err || null,
      }
      return res.status(resultPrint.status).json(resultPrint)
    }
}