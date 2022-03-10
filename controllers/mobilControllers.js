let modelMobil = require("../models/index").mobil
let path = require("path")
let fs = require("fs")
const { error } = require("console")

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
        image: request.file.filename
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

exports.editDataMobil = async (request, response) => {
    let id = request.params.id_mobil
    let dataMobil = {
        nomor_mobil: request.body.nomor_mobil,
        merk: request.body.merk,
        jenis: request.body.jenis,
        warna: request.body.warna,
        tahun_pembuatan: request.body.tahun_pembuatan,
        biaya_sewa: request.body.biaya_sewa,
    }
    if(request.file){
        // jika edit menyertakan file gambar
        let mobil = await modelMobil.findOne({where: {id_mobil: id}})
        let oldFileName = mobil.image

        let location = path.join(__dirname, "../image", oldFileName)
        fs.unlink(location, error => console.log(error))

        // menyisipkan nama file baru ke dalam objek dataSiswa
        dataMobil.image = request.file.filename
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
        fs.unlink(location, console.log(error))
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