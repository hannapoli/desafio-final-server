const messageQueries = {
    getAllMessages: `SELECT * FROM messages WHERE email_creator = $1 OR email_receiver = $1 ORDER BY created_at DESC;`,
    getMessageByID: `SELECT * FROM messages WHERE uid_message = $1`,
    createMessage: `INSERT INTO messages (email_creator, email_receiver, content_message) VALUES ($1, $2, $3) RETURNING *;`,
    deleteMessagesByID:`DELETE FROM messages WHERE uid_message = $1 RETURNING *;`,
    deleteAllMessages:`DELETE FROM messages WHERE email_creator = $1 OR email_receiver = $1 RETURNING *;`,
    findUserByEmail: `SELECT * FROM users WHERE email_user = $1;`
}

module.exports = {
    messageQueries
}