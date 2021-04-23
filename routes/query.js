const {Router} = require('express');
const passport = require('passport');
const router = Router();
const {getPatient, update_patient, getPatient_1} = require('../database');
const { isAuthenticated } = require("../helpers/authenticate");



router.post('/insert', isAuthenticated, async (req,res) => {
    const check=req.body;
    const a = await update_patient(users.id,check)
    req.flash('success', 'Actualizado');
    res.redirect('./port');
});


router.get('/port', isAuthenticated,async (req,res)=>{
    const rep = await getPatient();
    res.render('port',{users,rep});
});


module.exports=router;   