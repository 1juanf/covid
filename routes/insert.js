const {Router} = require('express');
const passport = require('passport');
const router = Router();
const {getPatient, insertPatient, getPatientU } = require('../database');
const { isAuthenticated } = require("../helpers/authenticate");
const { on2true, F_getemer } = require("../helpers/statistics");


router.post('/add', isAuthenticated, async (req, res) =>{
    const {namep,type,id_c,tell,old, sex,risk1,risk2,risk3,risk4,symp0,symp1,symp2,symp3,symp4,symp5,symp6,symp7} = req.body;
    var risk=on2true([risk1,risk2,risk3,risk4]);
    var symp=on2true([symp0,symp1,symp2,symp3,symp4,symp5,symp6,symp7]);
    var coords = [users.lonc,users.latc];  
    
    const a = await insertPatient(namep,type,id_c,tell,old, sex,risk,symp,coords);
    if(users.entity){
        const rep = await getPatientU();
        const emer = rep.filter(F_getemer);
        res.render('table/tables',{users, rep, emer});
    }
    else{
        res.redirect('./port');
    }
});


router.get('/port', isAuthenticated,async (req,res)=>{
    const rep = await getPatient();
    res.render('port',{users,rep});
});


module.exports=router;   