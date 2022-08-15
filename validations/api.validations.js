const validatorSchema = {};

validatorSchema.pagination = {
  sortType: {
    type: "enum",
    values: ["recentProjects", "orderByCategoryNameAsc", "orderByUsernameAsc", "orderByProjectTitleAsc"],
  },
  page: {
    type: "number",
    convert: true,
  },
  limit: {
    type: "number",
    convert: true,
  },
};

module.exports = validatorSchema;
