const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countryRoute=require('./countryRoutes')
const activityRoute=require('./activityRoutes')


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//ROUTER BY COUNTRIES
router.use('/countries',countryRoute);

//ROUTER BY ACTIVITIES
router.use('/activities',activityRoute);

//ejemplo cuando tengo spolo /
router.get('/',(req,res)=>{
    res.send('Henry countries Pruebas')
})



module.exports = router;
