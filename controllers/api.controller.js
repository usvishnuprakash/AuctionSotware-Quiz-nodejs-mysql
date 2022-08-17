const sql = require("../mixins/db.mixin");
module.exports = {
  // Recent project (desc order)
  async manageSortTypes(req, res, next) {
    let query;
    if (req.params.sortType === "recentProjects") {
      query = `
      SELECT projects.project_id, projects.project_title,users.username,projects.date_added AS date ,COUNT(*) OVER () as TotalCount
      FROM ilance_projects AS projects 
      LEFT JOIN ilance_users AS users ON users.user_id=projects.user_id 
      ORDER BY projects.date_added DESC
      LIMIT ${req.body.limit}
      OFFSET ${(req.body.page - 1) * req.body.limit} 
      `;
    }
    if (req.params.sortType === "orderByCategoryNameAsc") {
      // ORDERBY CATEGORY
      // ! given database does have categories table so i cant verifying this code
      query = `
      SELECT projects.project_id, projects.project_title,users.username,projects.date_added AS date , categories.category_name,COUNT(*) OVER () as TotalCount 
      FROM ilance_projects AS projects 
      LEFT JOIN ilance_users AS users ON users.user_id=projects.user_id 
      LEFT JOIN ilance_category AS categories ON categories.cid=projects.cid
      ORDER BY categories.category_name
      LIMIT ${req.body.limit}
      OFFSET ${(req.body.page - 1) * req.body.limit}
      `;
    }
    if (req.params.sortType === "orderByUsernameAsc") {
      query = `
      SELECT projects.project_id, projects.project_title , users.username , users.user_id,COUNT(*) OVER () as TotalCount
      FROM ilance_users as users
      LEFT JOIN ilance_projects AS projects on projects.user_id=users.user_id
      ORDER BY users.username
      LIMIT ${req.body.limit}
      OFFSET ${(req.body.page - 1) * req.body.limit}
      `;
    }
    if (req.params.sortType === "orderByProjectTitleAsc") {
      query = `
      SELECT projects.project_id, projects.project_title , users.username , users.user_id,COUNT(*) OVER () as TotalCount
      FROM ilance_projects AS projects
      LEFT JOIN ilance_users as users on users.user_id=projects.user_id
      ORDER BY projects.project_title
      LIMIT ${req.body.limit}
      OFFSET ${(req.body.page - 1) * req.body.limit}
      `;
    }
    try {
      const result = await sql.query(query);
      if (!result?.[0]) {
        throw new Error("SOMETHING WENT WRONG IN GETTING RECENT PROJECTS");
      }
      res.json({
        message: "Fecthed successfully",
        response: result,
      });
    } catch (error) {
      next(error);
    }
  },
};
