require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cloudinary = require("cloudinary")
const port = process.env.PORT || 8000

const app = express()

app.get("/",(req,res)=>{
    res.send("agaf")
})
app.get("/image-upload", (req,res)=>{
    
})
app.listen(port, ()=>console.log(`connection started on http://localhost:${port}`))
