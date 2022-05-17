const express = require(`express`)
const app = express()

app.use(express.json()) 

let karyawanController = require("../controllers/karyawanController")
let authorization = require("../middlewares/authorization")

app.get("/", authorization.authorization, karyawanController.getDataKaryawan)
app.post("/", authorization.authorization, karyawanController.addDataKaryawan)
app.post("/find", authorization.authorization, karyawanController.findKaryawan)
app.put("/:id_karyawan", authorization.authorization, karyawanController.editDataKaryawan)
app.delete("/:id_karyawan", authorization.authorization, karyawanController.deleteDataKaryawan)
app.post("/auth", karyawanController.authentication)

module.exports = app