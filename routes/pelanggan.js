const express = require(`express`)
const app = express()

app.use(express.json()) 

let pelangganController = require("../controllers/pelangganController")

app.get("/", pelangganController.getDataPelanggan)
app.post("/", pelangganController.addDataPelanggan)
app.put("/:id_pelanggan", pelangganController.editDataPelanggan)
app.delete("/:id_pelanggan", pelangganController.deleteDataPelanggan)

module.exports = app