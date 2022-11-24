const {Activity}=require('../db');

//Function create activity
const addActivity = async(body)=>{
    try {
        const {name,difficult,duration,season,countries}=body;
        const newActivity = await Activity.create({name,difficult,duration,season});
        await newActivity.addCountries(countries)
        return newActivity;
    } catch (err) {
        return err.message;
    }
}

//function get all activity
const getActivities = async()=>{
    try {
        let find = await Activity.findAll();
        return find;
    } catch (err) {
        return err.message;
    }
}

// function delete activity by id
const deleteActivity = async(id)=>{
  
        const activity = await Activity.destroy({ where: { id } });
        if(activity>0){
            return 'Activity deleted'
        }else{
            throw new Error('error el id no existe ')
        }
   
}
module.exports={
    getActivities,
    addActivity,
    deleteActivity
}