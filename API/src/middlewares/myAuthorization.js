import PropertyServices from '../services/propertyServices';
/* eslint camelcase: 0 */
const authorisation = async (req, res, next) => {
  try {
    const { property_id } = req.params;
    const property = await PropertyServices.findPropertyById(property_id);
    if (!property)
      return res.status(404).json({
        status: '404 Not Found',
        error: 'Invalid Property ID'
      });
    req.prop = property;
    return next();
    // const { is_admin } = req.data;
    // if (is_admin) return next();
    // const userId = req.data.id;
    // const { owner } = property;
    // if (userId !== owner)
    //   return res.status(403).json({
    //     status: '403 Forbidden Request',
    //     error: 'You are not the owner of the property'
    //   });
    // return next();
  } catch (e) {
    return res.status(500).json({
      status: '500 Server Interval Error',
      error: 'Oops! Error Occured, try again'
    });
  }
};
export default authorisation;
