const { handleError } = require('../../@shared/utils');
const { points } = require('../../@services');
/**
 * @description To get all points
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 * @returns {Array<points>}
 */
exports.getAll = (req, res, next) => {
  try {
    const _points = points.getAll()
    return res.status(200).send(_points);
  } catch (err) {
    return handleError(res, err);
  }
}