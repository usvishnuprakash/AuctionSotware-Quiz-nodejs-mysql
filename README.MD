# Tile
Auction Softwares interview Quiz


## Installation

Use the package manager [npm](https://www.npmjs.com/) to install all dependencies.

```bash
npm
```

## start
```bash
npm run start
```
please use mentioned port in the server.js file

# questions
1. Please join the products table with the user's table (user_id is the primary key in the user's table and the user_id field is a foreign key in the projects table) and use that to join the code.
```sql
SELECT * FROM `ilance_projects` JOIN ilance_users ON ilance_users.user_id=ilance_projects.user_id;

```
2. Do pagination - 2 rows in each page.Please do pagination in jquery code.Output should be in jquery not in refresh page
```sql
SELECT * FROM `ilance_projects` JOIN ilance_users ON ilance_users.user_id=ilance_projects.user_id LEFT JOIN ilance_categories ON ilance_categories.cid=ilance_projects.cid;
```
 

## FOR USASGE
 just pull using git in command line
```bash
git pull <>repository<>
```

## License
[MIT](https://choosealicense.com/licenses/mit/)