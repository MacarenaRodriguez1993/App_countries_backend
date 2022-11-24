const {Country,Activity}=require('../db');
const fetch = require('cross-fetch');
const { Op } = require("sequelize");
//const axios =require('axios')

const getCountriesApi= async()=>{
    try{
        let requestApi =  await fetch("https://restcountries.com/v3/all")
            .then(resp=>resp.json())
            const countries = requestApi.map(c=>{
                return {
                    id:c.cca3,
                    name:c.name.common.toLowerCase(),
                    flagImage:c.flags[0],
                    continent:c.continents[0],
                    capital : c.capital ? c.capital[0] : 'capital does not exist',
                    subregion:c.subregion ? c.subregion : c.region,
                    area:c.area,
                    population:c.population,
                    maps: c.maps.googleMaps
                }
            })
        await Country.bulkCreate(countries).then(()=>console.log('Countries data have been saved'))
    } catch (err) {
        return err.message;
    }
}


const findCountries = async(name)=>{
    try {
        let country;
        if(name){
            country = await Country.findAll({ 
                where: {
                    name:{
                        [Op.substring]: `%${name}%`
                    }
                }
            }, {include:[Activity]})
        }else{
            country = await Country.findAll({include:[Activity]})
        }

        return country
    } catch (err) {
        return err.message;
    }
}

const getCountryById = async(id)=>{
    try {
        const country = await  Country.findByPk(id,{include:[Activity]});
        return country;
    } catch (err) {
        return err.message;
    }
}

module.exports={
    getCountriesApi,
    getCountryById,
    findCountries
};