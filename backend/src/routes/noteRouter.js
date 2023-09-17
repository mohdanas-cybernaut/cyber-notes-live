import express from "express"
import { noteModel } from "../models/Notes.js";
import multer from "multer"
const noteRouter = express.Router()
const storage = multer.memoryStorage()
const upload = multer({storage})


noteRouter.post('/',multer().single('file') ,async (req, res) => {
    try {  
      const {originalname :fileName,buffer:fileData} = req.file
      const {parent} = req.body;
      const pdfFile = new noteModel({ fileName,fileData,parent });
      console.log(pdfFile);
      // Save the document to MongoDB
      await pdfFile.save();
      
      res.status(201).send('PDF file uploaded successfully.');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error uploading PDF file.');
    }
  });

  noteRouter.get('/',async (req,res)=>{
    try {
      const id = req.query.id
      const result = await noteModel.findById(id)
      
    // Set the Content-Type header to indicate it's a PDF file
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${result.fileName}"`);
    // Send the PDF content as a response
    res.send(result.fileData);
      // console.log(result);
      
    } catch (error) {
      console.log(error);
    }
  })
  noteRouter.get("/all",async (req,res)=>{
    try {
      console.log("hit");
      const allElems = await noteModel.find({}).select({fileData:0})
      return res.json(allElems)
    } catch (error) {
      res.sendStatus(400)
    }
  })
export {noteRouter}