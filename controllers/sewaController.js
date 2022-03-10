const { request, response } = require("express")
let modelSewa = require("../models/index").sewa
let modelMobil = require("../models/index").mobil

exports.getDataSewa = async(request, response) => {
    let data = await modelSewa.findAll({
        include: ["karyawan", "pelanggan", "mobil"]
    })
    return response.json(data)
}

exports.addDataSewa = async (request, response) => {
    let mobil = await modelMobil.findOne({
        where: {id_mobil: request.body.id_mobil}
    })

    let biaya = mobil.biaya_sewa
    let sewa = new Date(request.body.tgl_sewa)
    let kembali = new Date(request.body.tgl_kembali)

    //hitung
    let hitung = kembali.getTime() - sewa.getTime()
    let hari = hitung/(1000*3600*24)
    let totalBayar = hari * biaya

    let addData = {
        id_mobil: request.body.id_mobil,
        id_karyawan: request.body.id_karyawan,
        id_pelanggan: request.body.id_pelanggan,
        tgl_sewa: request.body.tgl_sewa,
        tgl_kembali: request.body.tgl_kembali,
        total_bayar: totalBayar
    }

    modelSewa.create(addData)
    .then(result => {
        return response.json({
            message: `Data sewa berhasil ditambahkan`
        })
    })
    .catch(error => {
        message: error.message
    })
}

exports.editDataSewa = async (request, response) => {
    let id = request.params.id_sewa

    let mobil = await modelMobil.findOne({
        where: {id_mobil: request.body.id_mobil}
    })

    let biaya = mobil.biaya_sewa
    let sewa = new Date(request.body.tgl_sewa)
    let kembali = new Date(request.body.tgl_kembali)

    //hitung
    let hitung = kembali.getTime() - sewa.getTime()
    let hari = hitung/(1000*3600*24)
    let totalBayar = hari * biaya

    let newData = {
        id_mobil: request.body.id_mobil,
        id_karyawan: request.body.id_karyawan,
        id_pelanggan: request.body.id_pelanggan,
        tgl_sewa: request.body.tgl_sewa,
        tgl_kembali: request.body.tgl_kembali,
        total_bayar: totalBayar
    }

    modelSewa.update(newData, {where: {id_sewa: id}})
    .then(result => { 
        return response.json({
            message: `Data sewa berhasil diubah`
        })
    })
    .catch(error => {
        message: error.message
    })
}

exports.deleteDataSewa = (request, response) => {
    let id = request.params.id_sewa

    modelSewa.destroy({where: {id_sewa: id}})
    .then(result => { 
        return response.json({
            message: `Data sewa berhasil dihapus`
        })
    })
    .catch(error => {
        message: error.message
    })
}