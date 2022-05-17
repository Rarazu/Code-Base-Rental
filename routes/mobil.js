const express = require("express")
const app = express()
app.use(express.json())

let mobilController = require("../controllers/mobilControllers")
let uploadImg = require("../middlewares/uploadImg")
let authorization = require("../middlewares/authorization")

app.get("/", authorization.authorization, mobilController.getDataMobil)

app.post("/", [
    uploadImg.upload.single(`image`), authorization.authorization
    ], mobilController.addDataMobil)

app.post("/find", authorization.authorization, mobilController.findMobil)

app.put("/:id_mobil", [
    uploadImg.upload.single(`image`), authorization.authorization
    ], mobilController.editDataMobil)

app.delete("/:id_mobil", authorization.authorization, mobilController.deleteDataMobil)

module.exports = app