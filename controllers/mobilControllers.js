let modelMobil = require("../models/index").mobil
let path = require("path")
let fs = require("fs")

exports.getDataMobil = (request, response) => {
    modelMobil.findAll()
    .then(result =>  {
        return response.json(result)
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.addDataMobil = (request, response) => {
    if (!request.file) {
        return response.json({
            message: `Nothing to upload`
        })
    }
    let newMobil = {
        nomor_mobil: request.body.nomor_mobil,
        merk: request.body.merk,
        jenis: request.body.jenis,
        warna: request.body.warna,
        tahun_pembuatan: request.body.tahun_pembuatan,
        biaya_sewa: request.body.biaya_sewa,
        image: request.file.image
    }

    modelMobil.create(newMobil)
    .then(result => {
        return response.json({
            message: `Data mobil berhasil ditambahkan`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.editDataMobil = (request, response) => {
    let id = request.params.id_mobil
    let dataMobil = {
        nomor_mobil: request.body.nomor_mobil,
        merk: request.body.merk,
        jenis: request.body.jenis,
        warna: request.body.warna,
        tahun_pembuatan: request.body.tahun_pembuatan,
        biaya_sewa: request.body.biaya_sewa,
        image: request.file.image
    }

    modelMobil.update(dataMobil, {where:{id_mobil: id}})
    .then(result => {
        return response.json({
            message:`Data mobil berhasil diubah`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.deleteDataMobil = async(request, response) => {
    let id = request.params.id_mobil

    let mobil = await modelMobil.findOne({where: {id_mobil: id}})
    if (mobil) {
        let oldFileName = mobil.image

        // delete file
        let location = path.join(__dirname,"../image", oldFileName)
        fs.unlink(location, error => log)
    }

    modelMobil.destroy({where: {id_mobil: id}})
    .then(result => {
        return response.json({
            message:`Data mobil berhasil dihapus`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}