import mongoose from "mongoose"

const Schema = new mongoose.Schema({
    fileName: { type: String, required: true },
    fileData: { type: Buffer, required: true },
    parent: { type: String, required: true }
})

export const noteModel = mongoose.model('Note', Schema)