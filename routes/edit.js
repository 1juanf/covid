const {Router} = require('express');
const passport = require('passport');
const router = Router();
const { getPatient_1,EmerPat_E } = require('../database');
const { isAuthenticated } = require("../helpers/authenticate");
const { F_getemer } = require('../helpers/statistics');

router.get('/:id', isAuthenticated,async (req,res)=>{
    const {id} = req.params;
    console.log(id);
    const Pemer = await getPatient_1(id);
    const emer1 = true;
    const emer = patient.filter(F_getemer);
    res.render('table/updateUser',{users,Pemer,emer1,emer});
});

router.post('/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const {op,recom} = req.body;
    await EmerPat_E(op,recom,id)
    req.flash('success', 'Actualizado');
    res.redirect('/center');
});

module.exports=router;