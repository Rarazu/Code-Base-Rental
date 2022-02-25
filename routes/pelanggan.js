const express = require(`express`)
const app = express()

app.use(express.json()) 

let pelangganController = require("../controllers/pelangganController")
let authorization = require("../middlewares/authorization")

app.get("/",authorization.authorization ,pelangganController.getDataPelanggan)
app.post("/", pelangganController.addDataPelanggan)
app.put("/:id_pelanggan", pelangganController.editDataPelanggan)
app.delete("/:id_pelanggan", pelangganController.deleteDataPelanggan)

module.exports = app