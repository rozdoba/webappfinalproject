let userModel = require('../models/users');
let likeModel = require('../models/likes');
let postModel = require('../models/posts');

exports.getProfile = (req, res, next) => {
	let u_id = req.params.id;
	let User = userModel.getUserInfo(u_id);
	let post;
	let profile_user;
	User.then( (user) => {
		profile_user = user.rows[0];
		return postModel.getPU(u_id);
	}).then ( (posts) => {
		post = posts.rows.slice(0, 5);;
		return likeModel.getRL(u_id);		
	}).then ( (like) => {
		let l = true;
		for (i=0; like.rows.length > i; i++) {
			if (like.rows[i].senderid == 2) //currently the senderid is hard-coded, need to modify later to work with authentacation
				l = false;
		}
		res.render('profileView', {user: profile_user, ProfileCSS: true, likes: like.rows.length, likeBtn: l, post: post});
	}).catch((err) => {
		console.log(err);
	});
}

exports.like = (req, res, next) => {
	let p_id = req.body.p_id;
	let data = {
		"rid": p_id,
		"sid": 2
	};
	
	let Like = likeModel.addLike(data);
	Like.then( (data) => {
		res.redirect(301, "/profile/" + p_id);
	}).catch((err) => {
		console.log(err);
	})
	
	//let data = {"rid": p_id};
	/*let Like = likeModel.addLike(data);
	Like.then( (data) => {
		res.redirect(301, "/profile/{p_id}");
	}).catch((err) => {
		console.log(err);
	});*/
}