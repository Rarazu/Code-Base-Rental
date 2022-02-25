const multer = require("multer")
const path = require("path")
const fs = require("fs")
const { request } = require("http")
//path dan fs bawaan dari node

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "./image")
    },
    filename: (request, file, callback) => {
        callback(null, `image-${Date.now()}${path.extname(file.originalname)}`)
        // ini config untuk menentukan nama file yg diupload
    }
})

exports.upload = multer({storage: storage})