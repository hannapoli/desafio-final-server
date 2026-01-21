const messageQueries = {
    getAllMessages: `SELECT * FROM messages WHERE email_creator = $1`,
    getMessageByID: `SELECT * FROM messages WHERE uid_message = $1`,
    createMessage: `INSERT INTO messages (email_creator, email_receiver, content_message) VALUES ($1, $2, $3) RETURNING *;`,
    deleteMessagesByID:`DELETE FROM messages WHERE uid_message = $1 RETURNING *;`
}

module.exports = {
    messageQueries
}