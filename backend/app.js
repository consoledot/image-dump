require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cloudinary = require("cloudinary").v2
const port = process.env.PORT || 8000

const imageSchmema = require("./model/image")

const app = express()
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:true
})
const db = mongoose.connection
db.on("error", (error)=>console.log(error))
db.on("open", ()=> console.log("Connected to Database"))

cloudinary.config({
    cloud_name: `${process.env.CLOUDINARY_SECRECT_NAME}`,
    api_key:`${process.env.CLOUDINARY_API_KEY}`,
    api_secret:`${process.env.CLOUDINARY_API_SECRET}`
})

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("agaf")
})
app.get("/images", async(req,res)=>{
    try {
        const images = await imageSchmema.find()
        res.json({data:images})
    } catch (e) {
        res.status(500).json({message:e.message})
        
    }
   


})
app.get("/images/:id",async(req,res)=>{
    const image = await imageSchmema.findById(req.params.id)
    res.status(200).json(image)
})
app.post("/images/upload", async (req,res)=>{  
    const data = {
        image:req.body.image
    }
    try{
        const result = await cloudinary.uploader.upload(data.image)
        const image = new imageSchmema({
            author: req.body.name,
            imageSource: result.secure_url,
            description: req.body.description,
            tags:req.body.tags
        })
        const imageResult = await image.save()
        res.status(201).json({message:"success", data:imageResult})

    }catch(e){
        res.status(400).json({message:e.message})
    }
  
    
})
app.listen(port, ()=>console.log(`connection started on http://localhost:${port}`))
