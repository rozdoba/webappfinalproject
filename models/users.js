let db = require('../utils/db');

exports.getUserInfo = (id) => {
    return db.query(
        'Select * from users where userid = ' + id
    );
}

exports.updateUser = (id, e) => {
    db.query(
        "Update users set firstname = '" + e.firstname + "', lastname = '" + e.lastname + "', imageurl = '" + e.imageurl + "', about = '" + e.about + "', country = '" + e.country + "', dob = '" + e.dob + "' where userid = '" + id + "'"
    );
}

exports.getUser = (data) => {
	let sql = "Select * from users where email = '" + data.email + "'";
	return db.query(sql);
}

exports.registerUser = (data) => {
	if (data.imageurl != undefined) {
		let sql = "Insert into users(firstname, password, imageurl, about, country, dob, email, lastname) values('" 
		+ data.firstname + "', '" + data.password + "', '" + data.imageurl + "', '" + data.about + "', '"
		+ data.country + "', '" + data.dob + "', '" + data.email + "', '" + data.lastname + "');"
		return db.query(sql);
	} else {
		let sql = "Insert into users(firstname, password, about, country, dob, email, lastname) values('" 
		+ data.firstname + "', '" + data.password + "', '" + data.about + "', '"
		+ data.country + "', '" + data.dob + "', '" + data.email + "', '" + data.lastname + "');"
		return db.query(sql);
	}
}

exports.getallU = () => {
	return db.query('SELECT * from users');
}