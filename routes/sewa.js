const express = require(`express`)
const app = express()

app.use(express.json()) 

let sewaController = require("../controllers/sewaController")
let authorization = require("../middlewares/authorization")

app.get("/", authorization.authorization, sewaController.getDataSewa)
app.post("/", authorization.authorization, sewaController.addDataSewa)
app.put("/:id_sewa", authorization.authorization, sewaController.editDataSewa)
app.delete("/:id_sewa", authorization.authorization, sewaController.deleteDataSewa)

module.exports = app