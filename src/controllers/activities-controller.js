const {Activity,Country}=require('../db');

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
        let find = await Activity.findAll({
            include:[Country]
        });
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

const updateActivity = async(content)=>{
    try {

        const {id,name,difficult,duration,season,countries} = content;

        const updateActivity = await Activity.findByPk(id);
        const newCountries=[];
        if(name) updateActivity.name=name;
        if(difficult) updateActivity.difficult=difficult;
        if(duration) updateActivity.duration=duration;
        if(season) updateActivity.season=season;
        countries?.map(c=>{
            if(typeof c ==='object'){
                if(typeof c.id==='string')
                newCountries.push(c.id)
            }else{
                newCountries.push(c)
            }
            
        })
        await updateActivity.addCountries(newCountries)
        await updateActivity.save();

        return updateActivity;
    } catch (err) {
        return err.message;
    }
}

module.exports={
    getActivities,
    addActivity,
    deleteActivity,
    updateActivity
}