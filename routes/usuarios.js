const {Router} = require('express');
const passport = require('passport');
const router = Router();
const {getPatient_1, updatePat, getPatientU } = require('../database');
const { isAuthenticated } = require("../helpers/authenticate");
const { F_getemer } = require('../helpers/statistics');

router.get('/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const patient = await getPatient_1(id); 
    const rep = await getPatientU();
    const emer = rep.filter(F_getemer);
    res.render('table/updateUser', {users, patient,emer});
});

router.post('/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const {estado, recom} = req.body;
    const a = await updatePat(estado,recom,id)
    const rep = await getPatientU();
    req.flash('success', 'Actualizado');
    const emer = rep.filter(F_getemer);
    res.render('table/tables',{users,rep,emer});
});

module.exports=router;


