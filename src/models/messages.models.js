const pool = require('../configs/dbConnect');
const {messageQueries} = require("./messages.queries");

const getAllMessagesModel = async (email) => {
    let result
    try {
        result = await pool.query(messageQueries.getAllMessages, [email])
        console.log(result.rows, "COLUMNAS")
        return result.rows;
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}

const getMessageByIDModel = async (id) => {
    let result
    try {
        result = await pool.query(messageQueries.getMessageByID, [id])
        console.log(result.rows, "COLUMNAS")
        return result.rows[0];
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}

const deleteMessagesByIDModel = async (id) => {
    let result
    try {
        result = await pool.query(messageQueries.deleteMessagesByID, [id])
        console.log(result.rows, "COLUMNAS")
        return result.rows[0];
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}

const createMessagesModel = async (emailCreator, emailReceiver, contentMessage) => {
    let result;
    try {
        result = await pool.query( messageQueries.createMessage, [emailCreator, emailReceiver, contentMessage]);
        console.log(result.rows, "COLUMNAS");
        return result.rows[0];
    } catch (error) {
        console.log(error, "<===========================>");
        return error;
    }
};

module.exports= {
    getAllMessagesModel,
    getMessageByIDModel,
    deleteMessagesByIDModel,
    createMessagesModel
}