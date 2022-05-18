const req = require("express/lib/request")
const md5 = require("md5")
const { request, response } = require("express")

let modelKaryawan = require("../models/index").karyawan
let jwt = require("jsonwebtoken")

exports.getDataKaryawan = (request, response) => {
    modelKaryawan.findAll()
    .then(result => {
        return response.json(result)
    })
    .catch(error => {
        message: error.message
    })
}

exports.findKaryawan = async (request, response) => {
    let keyword = request.body.keyword

    let sequelize = require(`sequelize`)
    let Op = sequelize.Op

    let dataKaryawan = await modelKaryawan.findAll({
        where: {
            [Op.or]: {
                nama_karyawan: {[Op.like]: `%%${keyword}`},
                alamat_karyawan: {[Op.like]: `%%${keyword}`},
                username: {[Op.like]: `%%${keyword}`}
            }
        }
    })
    return response.json(dataKaryawan)
}

exports.addDataKaryawan = (request, response) => {
    let newKaryawan = {
        nama_karyawan: request.body.nama_karyawan,
        alamat_karyawan: request.body.alamat_karyawan,
        kontak_karyawan: request.body.kontak_karyawan,
        username: request.body.username,
        password: md5(request.body.password)
    }

    modelKaryawan.create(newKaryawan)
    .then(result => {
        return response.json({
            message: `Data karyawan berhasil ditambahkan`
        })
    })
    .catch(error => {
        message: error.message
    })
}

exports.editDataKaryawan = (request, response) => {
    let id = request.params.id_karyawan
    let dataKaryawan = {
        nama_karyawan: request.body.nama_karyawan,
        alamat_karyawan: request.body.alamat_karyawan,
        kontak_karyawan: request.body.kontak_karyawan,
        username: request.body.username,
        password: md5(request.body.password)
    }

    modelKaryawan.update(dataKaryawan, {where:{id_karyawan: id}})
    .then(result => {
        return response.json({
            message: `Data karyawan berhasil diubah`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.deleteDataKaryawan = (request, response) => {
    let id = request.params.id_karyawan

    modelKaryawan.destroy({where:{id_karyawan:id}})
    .then(result => {
        return response.json({
            message: `Data keryawan berhasil dihapus`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.authentication = async(request, response) => {
    let data = {
        username: request.body.username,
        password: md5(request.body.password)
    }

    //validasi (cek data di tabel karyawan)
    let result = await modelKaryawan.findOne({where: data})
    if (result) {
        // data ditemukan

        // payload = data/informasi yg akan dienkripsi
        let payload = JSON.stringify(result) // koversi bentuk objek -> JSON
        let secretKey = `Sequelize itu sangat menyenangkan`

        // generate token
        let token = jwt.sign(payload, secretKey)
        return response.json({
            logged: true,
            token: token,
            dataKaryawan: result
        })
    } else{
        // data tidak ditemukan
        return response.json({
            logged: false,
            message: `Invalid username or password`
        })
    }
}