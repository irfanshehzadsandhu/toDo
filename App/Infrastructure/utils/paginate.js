async function paginate(query, options) {
  query = query || {};
  options = Object.assign({}, paginate.options, options); //he Object.assign() method copies all enumerable own properties from one or more source objects to a target object. It returns the target object.
  const limit = options.perPage ? options.perPage : 10;
  const page = options.currentPage ? options.currentPage : 1;
  const skip = (page - 1) * limit;

  const results = await this.find(query)
    .limit(limit)
    .skip(skip);
  const totalItems = await this.count(query);
  const totalPages = Math.ceil(totalItems / limit);
  const paginationConfig = {
    totalPages: totalPages
  };
  if (page < totalPages) {
    paginationConfig.nextPage = parseInt(page) + 1;
  }
  if (page > 1) {
    paginationConfig.prevPage = parseInt(page) - 1;
  }

  return {
    items: results,
    paginationConfig: paginationConfig
  };
}

module.exports = function(schema) {
  schema.statics.paginate = paginate;
};

module.exports.paginate = paginate;
