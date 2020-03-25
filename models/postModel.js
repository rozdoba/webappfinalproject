let db = require('../utils/db');

const insertReply = (reply) => {
    let {postId, userId, body} = reply;
    return db.query(
        `INSERT INTO Replies
        (postId, userId, body)
        VALUES ($1, $2, $3)`,
        [postId, userId, body]
    );
};

const selectReplies = (postId) => {
    return db.query(
        `SELECT 
            u.userId,
            u.imageURL, 
            r.replyId,
            r.body
        FROM Replies r
            LEFT JOIN Users u ON u.userId = r.userId
        WHERE r.postId = $1`,
        [postId]
    );
};

const searchPosts = (string) => {
    return db.query(
        `SELECT * 
        FROM Posts p
            LEFT JOIN Replies r on r.postId = p.postId
            LEFT JOIN Users up on up.userId = p.userId
            LEFT JOIN Users ur on ur.userId = r.userId
        WHERE
            p.subject LIKE $1`,
            [`%${string}%`]
    );
};

module.exports = {
    insertReply: insertReply,
    selectReplies: selectReplies,
    searchPosts: searchPosts
};
