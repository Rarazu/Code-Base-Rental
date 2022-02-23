const req = require("express/lib/request")
const md5 = require("md5")
const { request, response } = require("express")

let modelKaryawan = require("../models/index").karyawan

exports.getDataKaryawan = (request, response) => {
    modelKaryawan.findAll()
    .then(result => {
        return response.json(result)
    })
    .catch(error => {
        message: error.message
    })
}

exports.addDataKaryawan = (request, response) => {
    let newKaryawan = {
        nama_karyawan: request.body.nama_karyawan,
        alamat_karyawan: request.body.nama_karyawan,
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