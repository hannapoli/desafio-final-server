const { getAllMessagesModel, getMessageByIDModel, deleteMessagesByIDModel, createMessagesModel, findUserByEmailModel, deleteAllMessagesModel} = require("../models/messages.models")
const { getIO, connectedUsers } = require("../socket");

const getAllMessagesController =async (req, res) => {
    const email = req.params.email
    try {
        const data = await getAllMessagesModel(email)
        return res.status(200).json({
            ok: true,
            msg: "TODO OK",
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "TODO MAL, CONTACTA CON EL ADMIN"
        })
    }
}

const getMessageByIDController =async (req, res) => {
    const email = req.params.idMesage
    try {
        const data = await getMessageByIDModel(email)
        return res.status(200).json({
            ok: true,
            msg: "TODO OK",
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "TODO MAL, CONTACTA CON EL ADMIN"
        })
    }
}
const createMessagesController = async (req, res) => {
    const email = req.params.email;
    const { email_receiver, content_message } = req.body;

    try {
        const existe = await findUserByEmailModel(email_receiver);
        if(!existe){
            return res.status(401).json({
                ok:false,
                msg: "NO existe ese usuario"
            })
        }
        const newMessage = await createMessagesModel( email, email_receiver, content_message );
        
        const socketId = connectedUsers.get(email_receiver);
        if (socketId) {
            getIO().to(socketId).emit("new-message", newMessage);
        }
        
        return res.status(201).json({
            ok: true,
            msg: "Mensaje creado correctamente",
            data: newMessage
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Error, contacte con el administrador"
        });
    }
};

const deleteMessagesByIDController = async (req, res) => {
    const id = req.params.idMesage
    try {
        const deletedReport = await deleteMessagesByIDModel(id)
        if (deletedReport) {
            return res.status(200).json({
                ok: true,
                msg: "mensaje borrado",
                deletedReport
            })
        } else {
            return res.status(404).json({
                ok: false,
                msg: "ERROR 404, mensaje no encontrado",
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error, contacte con el administrador',
        })
    }
}

const deleteAllMessagesController = async (req, res) => {
    const email = req.params.email;
    try {
        const deletedReports = await deleteAllMessagesModel(email)
        if (deletedReports) {
            return res.status(200).json({
                ok: true,
                msg: "mensaje borrado",
                deletedReports
            })
        } else {
            return res.status(404).json({
                ok: false,
                msg: "ERROR 404, mensaje no encontrado",
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error, contacte con el administrador',
        })
    }
}


module.exports = {
    getAllMessagesController,
    getMessageByIDController,
    createMessagesController,
    deleteMessagesByIDController,
    deleteAllMessagesController
}