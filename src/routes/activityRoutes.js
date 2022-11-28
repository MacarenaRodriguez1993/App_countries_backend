const {Router}=require('express');
const router =Router();
const  {addActivity, getActivities,deleteActivity, updateActivity} = require('../controllers/activities-controller')

//route post activity
router.post('/',async(req,res)=>{
    try {     
        const newActivity = await addActivity(req.body);
        if(typeof newActivity==='string') throw new Error(newActivity)
        return res.status(201).send(newActivity)
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({error:err.message})
    }
})


//route get activity
router.get('/',async(req,res)=>{
    try {
        let activities = await getActivities()
        return res.status(200).json(activities)
    } catch (err) {
        return res.status(400).json({error:err.message})
    }
})

//route DELETE activity by ID
router.delete('/:id', async(req,res)=>{
    try {
        const {id}=req.params;
        await deleteActivity(id);
        res.status(200).json({msj:'Activity deleted sucessfully'})
    } catch (err) {
        res.status(400).send({error:err.message})
    }
})
//route UPDATE activity
router.put('/update' , async(req,res)=>{
    try {
        const updateActiv = await updateActivity(req.body)
        res.status(200).send(updateActiv);
    } catch (err) {
        res.status(404).send({error:err.message})
    }
})

module.exports = router;