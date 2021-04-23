const {Router} = require('express');
const passport = require('passport');
const router = Router();
const { updateAllPat, getPatientU } = require('../database');
const { isAuthenticated } = require("../helpers/authenticate");
const { F_getemer } = require('../helpers/statistics');


router.get('/editor', isAuthenticated, async(req,res)=>{
    // console.log('algo');
    const patient = await getPatientU();
    const emer = patient.filter(F_getemer);
    res.render('table/suggestion', {users,emer});
});

router.post('/add_recom', isAuthenticated, async(req,res)=>{
    // console.log('----------------------------------------');
    const {recom} = req.body;
    console.log(recom);
    const a = await updateAllPat(recom);
    const rep = await getPatientU();
    req.flash('success', 'Actualizado');
    res.render('table/tables',{users,rep,emer});
});
module.exports=router;