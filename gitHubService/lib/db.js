'use strict';
const mysql = require('mysql');
const util = require('util');
const nconf = require('./config')


var db_config = nconf.get('database');

var pool = mysql.createPool(db_config);

const query = util.promisify(pool.query).bind(pool);



var saveBulkRepos = async (data) => {
    if(data.length <= 0 ) return
    return query(`INSERT INTO \`repos\` (\`gitId\`, \`name\`,\`stars\`, \`watchers\`, \`url\`) VALUES ?` +
        `ON DUPLICATE KEY UPDATE \`gitId\` = VALUES(gitId), \`name\`= VALUES(name),\`stars\`= VALUES(stars), \`watchers\`= VALUES(watchers), \`url\`= VALUES(url)`,
        [data])
}

var fetchAllRepos = async () => {
    return  query("SELECT * FROM `repos`");
}

var fetchOneRepo = async (name, id) => {
    if (name) {

        return query("SELECT * FROM `repos` WHERE `name` = ?",[name]);

    } else if (id) {

        return query("SELECT * FROM `repos` WHERE `gitId` = ?", [id]);

    } else {
        throw "parameters not entered"
    }
    
}


module.exports = {
    saveBulkRepos,
    fetchAllRepos,
    fetchOneRepo
}