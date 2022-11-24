
const {DataTypes}= require('sequelize');

// exporto modelo para actividad turistica
module.exports=(sequelize)=>{
    sequelize.define('activity',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        difficult:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{
                min:1,
                max:5
            }
        },
        duration:{ 
            type:DataTypes.STRING,
            allowNull:false,
        },
        season:{
            type:DataTypes.ENUM([
                "summer",
                "autumn",
                "winter",
                "spring"
            ])
        }
    })
}