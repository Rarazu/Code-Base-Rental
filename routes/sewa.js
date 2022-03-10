const express = require(`express`)
const app = express()

app.use(express.json()) 

let sewaController = require("../controllers/sewaController")

app.get("/",sewaController.getDataSewa)
app.post("/", sewaController.addDataSewa)
app.put("/:id_sewa", sewaController.editDataSewa)
app.delete("/:id_sewa", sewaController.deleteDataSewa)

module.exports = app