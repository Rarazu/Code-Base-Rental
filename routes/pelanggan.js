const express = require(`express`)
const app = express()

app.use(express.json()) 

let pelangganController = require("../controllers/pelangganController")
let authorization = require("../middlewares/authorization")

app.get("/",authorization.authorization ,pelangganController.getDataPelanggan)
app.post("/", authorization.authorization, pelangganController.addDataPelanggan)
app.post("/find", authorization.authorization, pelangganController.findPelanggan)
app.put("/:id_pelanggan", authorization.authorization, pelangganController.editDataPelanggan)
app.delete("/:id_pelanggan", authorization.authorization, pelangganController.deleteDataPelanggan)

module.exports = app    