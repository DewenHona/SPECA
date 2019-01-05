const Bookmark = {};
const sql = require('../../../../services/db');

Bookmark.getAllBookmarksByName = async (name) => {
    return new Promise((resolve, reject) => {
        let q = `select * from bookmarks where u_name = '${name}'`;
        console.log(q);
        sql.query(q, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

Bookmark.postBookmark = async (name, type, id) => {
    return new Promise((resolve, reject) => {
        let q = `insert into bookmarks values('${name}', ${type}, ${id})`;
        console.log(q)
        sql.query(q, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}

module.exports = Bookmark;