const express = require(`express`)
const app = express()

app.use(express.json()) 

let karyawanController = require("../controllers/karyawanController")

app.get("/", karyawanController.getDataKaryawan)
app.post("/", karyawanController.addDataKaryawan)
app.put("/:id_karyawan", karyawanController.editDataKaryawan)
app.delete("/:id_karyawan", karyawanController.deleteDataKaryawan)

module.exports = app