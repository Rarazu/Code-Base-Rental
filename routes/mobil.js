const express = require("express")
const app = express()
app.use(express.json())

let mobilController = require("../controllers/mobilControllers")
let uploadImg = require("../middlewares/uploadImg")

app.get("/", mobilController.getDataMobil)

app.post("/", uploadImg.upload.single(`image`), mobilController.addDataMobil)

app.put("/:id_mobil", uploadImg.upload.single(`image`), mobilController.editDataMobil)

app.delete("/:id_mobil", mobilController.deleteDataMobil)

module.exports = app