'use strict';
const {
  Model
} = require('sequelize');
const mobil = require('./mobil');
module.exports = (sequelize, DataTypes) => {
  class sewa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // relasi: sewa -> karyawan (child -> parent)
      // parent: karyawan, child: sewa
      // tipe: 1 sewa dicatat oleh 1 karyawan(one to one)
      this.belongsTo(models.karyawan, {
        foreignKey: "id_karyawan",
        as: "karyawan"
      })

      this.belongsTo(models.pelanggan, {
        foreignKey: "id_pelanggan",
        as: "pelanggan"
      })

      // 1 sewa hanya bisa menyewa 1 mobil
      this.belongsTo(models.mobil, {
        foreignKey: "id_mobil",
        as: "mobil"
      })

    }
  }
  sewa.init({
    id_sewa:{  //dikenalkan, karena bisa dianggap id
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_mobil: DataTypes.INTEGER,
    id_karyawan: DataTypes.INTEGER,
    id_pelanggan: DataTypes.INTEGER,
    tgl_sewa: DataTypes.DATE,
    tgl_kembali: DataTypes.DATE,
    total_bayar: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'sewa',
    tableName: 'sewa'
  });
  return sewa;
};