const knex = require('knex');
let dbConf;

try{
	dbConf = require(rootDir+'/dbconf.json');
} catch(err) {
	console.error('MySQL configuration file missing or invalid! (dbconf.json)\nExiting!');
	process.exit(0);
}

module.exports = knex({
	client: 'mysql2',
	connection: {
		host : dbConf.hostname,
		port : dbConf.port,
		user : dbConf.user,
		password : dbConf.password,
		database : dbConf.dbname
	}
});