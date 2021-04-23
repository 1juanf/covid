const {Router} = require('express');
const passport = require('passport');
const router = Router();
const {getPatientU,getDBtotal} = require('../database');
const { isAuthenticated } = require("../helpers/authenticate");
const {filterCond_R,
      filterConH_F,
      filterAge_H, 
      filterAge_L, 
      filterCond_H, 
      filterCond_L, 
      static, 
      updateTotal,
      F_getemer} = require('../helpers/statistics');

router.get('/center', isAuthenticated,async (req, res)=>{
      const patient = await getPatientU();
      const total = await getDBtotal();
      const emer = patient.filter(F_getemer);
      const sta = static(patient);
      const por=parseFloat((patient.length*100)/parseInt(users.poblation)).toFixed(2);   
      res.render('center',{users, patient, total, sta, por,emer});
});

// router.get('/charts', isAuthenticated, async (req,res)=>{
//       const total = await getDBtotal();
//       res.render('charts/charts',{users,total});
// });
//------------------------------------------------------------ tables
router.get('/tables', isAuthenticated,async (req,res)=>{
      const rep = await getPatientU();
      const emer = rep.filter(F_getemer); 
      res.render('table/tables',{users, rep, emer});
});

router.get('/tablep', isAuthenticated, async (req, res)=>{
      const patient = await getPatientU();
      const rep = patient.filter(filterCond_L);
      const emer = patient.filter(F_getemer);
      res.render('table/tables',{rep, users,emer});
});

router.get('/tablec', isAuthenticated, async (req, res)=>{
      const patient = await getPatientU();
      const rep = patient.filter(filterCond_H);
      const emer = patient.filter(F_getemer);
      res.render('table/tables',{rep, users,emer});
});

router.get('/tableMc', isAuthenticated, async (req, res)=>{
      const patient = await getPatient();
      const rep = patient.filter(filterAge_H);
      const emer = patient.filter(F_getemer);
      res.render('table/tables',{rep, users,emer});
});

router.get('/tablemc', isAuthenticated, async (req, res)=>{
      const patient = await getPatientU();
      const rep = patient.filter(filterAge_L);
      const emer = patient.filter(F_getemer);
      res.render('table/tables',{rep, users, emer});
});

router.get('/tableR', isAuthenticated, async (req,res) =>{
      const pat= await getPatientU();
      const patient = pat.filter(filterCond_R);
      const emer = patient.filter(F_getemer);
      res.render('table/tables',{patient, users,emer});
});

router.get('/tablet', isAuthenticated, async (req,res) =>{
      const pat= await getPatientU();
      const patient = pat.filter(filterConH_F);
      const emer = patient.filter(F_getemer);
      res.render('table/tables',{patient, users,emer});
});

router.get('/patient',isAuthenticated, async(req,res)=>{
      
      const tot = await getDBtotal();
      const patient = await getPatientU();
      const rep = await updateTotal(patient, tot);
      const emer = patient.filter(F_getemer);
      var total=[];
      if( rep ){

            req.flash('success', 'La tabla se actualizó'); 
            total = await getDBtotal();              
      }
      else{
            total = tot;
      }
      res.render('table/patient',{users,total,emer});
});


//------------------------------------------------------------ map
router.get('/map', isAuthenticated, async (req, res)=>{
      const patient = await getPatientU();
      const emer = patient.filter(F_getemer);
      res.render('map/map',{patient, users,emer});
});

router.get('/mapp', isAuthenticated, async (req, res)=>{
      const pat = await getPatientU();
      const patient = pat.filter(filterCond_L)
      const emer = patient.filter(F_getemer);
      res.render('map/map',{patient, users,emer});
});

router.get('/mapc', isAuthenticated, async (req, res)=>{
      const pat = await getPatientU();
      const patient = pat.filter(filterCond_H);
      const emer = patient.filter(F_getemer);
      res.render('map/map',{patient, users,emer});
});

router.get('/mapMc', isAuthenticated, async (req, res)=>{
      const pat = await getPatientU();
      const patient = pat.filter(filterAge_H);
      const emer = pat.filter(F_getemer);
      res.render('map/map',{patient, users,emer});
});

router.get('/mapmc', isAuthenticated, async (req, res)=>{
      const pat= await getPatientU();
      const patient = pat.filter(filterAge_L);
      const emer = patient.filter(F_getemer);
      res.render('map/map',{patient, users,emer});
});

router.get('/mapR', isAuthenticated, async (req,res) =>{
      const pat= await getPatientU();
      const patient = pat.filter(filterCond_R);
      const emer = patient.filter(F_getemer);
      res.render('map/map',{patient, users,emer});
});

router.get('/mapt', isAuthenticated, async (req,res) =>{
      const pat= await getPatientU();
      const patient = pat.filter(filterConH_F);
      const emer = patient.filter(F_getemer);
      res.render('map/map',{patient, users,emer});
});
//---------------------------------------------------------out
router.get('/edit',isAuthenticated, async(req,res)=>{    
      const emer = patient.filter(F_getemer);     
      res.render('table/suggestion',{users,emer});
  });

router.get('/logout', isAuthenticated, async(req,res)=>{
      
      req.logout();
      //pool.end();
      res.render('index');
});

module.exports=router;

