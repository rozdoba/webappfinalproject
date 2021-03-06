let postmod = require("../models/posts");
let usermod = require("../models/users");

const POSTS_PER_PAGE = 5

const searchOptions = (query) => {
    let {string, page, paginate} = query;
    string = string == undefined ? '' : string;
    page = page == undefined ? 0 : page;
    if(paginate) {
        page = (paginate == "next") ? ++page : --page;
    }
    let offset = page * POSTS_PER_PAGE;
    return {string, page, offset}
}

const getCurrentTimestamp = () => {
    
  let t = new Date();
  let YYYY = t.getFullYear();
  let MM = ((t.getMonth() + 1 < 10) ? '0' : '') + (t.getMonth() + 1);
  let DD = ((t.getDate() < 10) ? '0' : '') + t.getDate();
  let HH = ((t.getHours() < 10) ? '0' : '') + t.getHours();
  let mm = ((t.getMinutes() < 10) ? '0' : '') + t.getMinutes();
  let ss = ((t.getSeconds() < 10) ? '0' : '') + t.getSeconds();

  let date = YYYY+'-'+MM+'-'+DD+' '+HH+':'+mm+':'+ss;

  return date;
}

exports.createPost = (req, res, next) => {
    let p_subject = req.body.subject;
    let p_question = req.body.question;
    let p_topic = req.body.topic;
    let p_date = getCurrentTimestamp();

    let p0ject = {
        userid: req.session.userid,
        topicname: p_topic,
        subject: p_subject,
        date: p_date,
        body: p_question
    };

    postmod.createPost(p0ject);
    res.redirect(301, '/profile');
}

exports.replyToPost = (req, res, next) => {
    let reply = {postId, userId, body} = req.body;
    let route = req.body.route;
    postmod.insertReply(reply)
    .then(data => {
        res.redirect(301, route);
    })
    .catch(error => {
        console.log(error);
        res.status(500).send("Error inserting reply into Replies table.")
    });
};

exports.getPostsBySubject = (req, res, next) => {
    let {string, page, offset} = searchOptions(req.query);
    postmod.selectPostsBySubject(string, offset)
    .then(data => {
        let {posts, numposts: numPosts} = data.rows[0];
        res.render('searchResultView', {
            searchResultCSS: true,
            post: posts,
            page: page,
            string: string,
            userId: req.session.userid,
            route: '/posts/search',
            isFirstPage: page == 0,
            isLastPage: offset + POSTS_PER_PAGE >= numPosts
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).send('Error');
    });
};

exports.getPostsByTopic = (req, res, next) => {
    let {string, page, offset} = searchOptions(req.query);
    if(string === '') {
        res.redirect(301, '/posts/search');
    } else {
        postmod.selectPostsByTopic(string, offset)
        .then(data => {
            let {posts, numposts: numPosts} = data.rows[0];
            res.render('searchResultView', {
                searchResultCSS: true,
                post: posts,
                page: page,
                string: string,
                userId: req.session.userid,
                route: '/posts/searchTopic',
                isFirstPage: page == 0,
                isLastPage: offset + POSTS_PER_PAGE >= numPosts
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Error');
        });
    }
};


exports.getAllPosts = (req, res, next) => {
    let userId = req.session.userid;
    let User = usermod.getUserInfo(userId);
    User.then((data) => {
        // res.render('homeView', {user: data.rows[0], homeCSS: true});
        user_data = data.rows[0];
    })
    let {page, offset} = searchOptions(req.query);
    postmod.selectPostsById(userId, offset)
    .then(data => {
        let {posts, numposts: numPosts} = data.rows[0];
        res.render('allPostsView', { 
            user: user_data,
            userId: userId,
            AllPostsCSS: true,
            post: posts,
            page: page,
            route: '/posts/all',
            isFirstPage: page == 0,
            isLastPage: offset + POSTS_PER_PAGE >= numPosts
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).send('Error');
    });
}
