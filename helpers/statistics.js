const {updatedbTotal,insertdbTotal} = require('../database');

function isNumber(obj) {
  return obj !== undefined && typeof(obj) === 'number' && !isNaN(obj)}


function F_getemer(patient){
  if(patient.emer === true){
      return true;
    }
  else{
    return false;
  }

};

// function F_getemer(patient){
//   if (isNumber(patient.emer) && !patient.emer)
//     console.log(patient.emer);
//     if(patient.emer==null)
//       {
//       return false;
//       }
//   else{
//     console.log(patient.namep);
//     return true;
//   }
// };

//pacientes menores
function filterAge_L(patient) {
  if (isNumber(patient.age) && patient.age <= 18) {
    if (isNumber(parseInt(patient.condition)) && parseInt(patient.condition) >= 2 ) {
      return true
    } 
  } 
  return false;
};

//pacientes mayores contagiados
function filterAge_H(patient) {
  if (isNumber(patient.age) && patient.age >= 60) {
    if (isNumber(parseInt(patient.condition)) && parseInt(patient.condition) >= 2 ) {
      return true
    } 
  } 
  return false;
};

//pacientes de riego contagiados
function filterRisk_t(patient) {
  if (isNumber(patient.risk) && patient.risk) {
    if (isNumber(parseInt(patient.condition)) && parseInt(patient.condition) >= 4 ) {
      if (isNumber(parseInt(patient.condition)) && parseInt(patient.condition) <= 5 )
        return true
    } 
  } 
  return false;
};

//pacientes de riego no contagiados
function filterRisk_f(patient) {
  if (isNumber(patient.risk) && !patient.risk) {
    if (isNumber(parseInt(patient.condition)) && parseInt(patient.condition) <= 3 ) {
      if (isNumber(patient.age) && patient.age >= 60) 
        return true
    } 
  } 
  return false;
};

//pacientes posiblementes contagiados
function filterCond_L(patient) {
  if (isNumber(parseInt(patient.condition)) && parseInt(patient.condition) >= 3 ) {
      return true
  } 
  return false;
};

//pacientes recuperados
function filterCond_R(patient) {
  if (isNumber(parseInt(patient.condition)) && parseInt(patient.condition) == 7 ) {
      return true
  } 
  return false;
};

//pacientes contagiados 
  function filterCond_H(patient) {
    if (isNumber(parseInt(patient.condition)) && parseInt(patient.condition) > 4 ) {
      if (isNumber(parseInt(patient.condition)) && parseInt(patient.condition) <= 5 )
        return true
    } 
    return false;
  };

 //pacientes en tratamiento
function filterConH_F(patient) {
  if (isNumber(patient.condition) && parseInt(patient.condition) >= 4 ) {
    if (isNumber(patient.condition) && parseInt(patient.condition) <= 5 ){
      if (isNumber(patient.question4) && parseInt(patient.question4))
        return true
    }
  } 
  return false;
};

//estadisticas
function static(patient){
  const sta = 
    {
      conh : patient.filter(filterAge_H).length, //mayor de edad
      conl : patient.filter(filterAge_L).length, //menor de edad
      cont : patient.filter(filterCond_H).length,//pacientes contagiados
      posc : patient.filter(filterCond_L).length,//posibles contagiados
      trat : patient.filter(filterConH_F).length,//en tratamiento
      reco : patient.filter(filterCond_R).length //Recuperados
    };
  //console.log('stadisticas',sta);
  return sta;    
};

async function updateTotal(patient,total){
  const risk_y = patient.filter(filterRisk_t).length;
  const risk_n = patient.filter(filterRisk_f).length;
  const infect = patient.filter(filterCond_H).length;
  const recove = patient.filter(filterCond_R).length;
  const date_h = new Date();
  const date_H =date_h.getFullYear() + "-" + (date_h.getMonth() +1) + "-" + date_h.getDate();
  const last_v_t=total[(total.length)-1];
  console.log(last_v_t);
  if((last_v_t !== undefined)){
   //console.log('valores',last_v_t);
    if(Date.parse(date_H) > Date.parse(last_v_t.datedb)){
      if((last_v_t.risk_y != risk_y) || (last_v_t.risk_n != risk_n) || (last_v_t.infected != infect) || (last_v_t.recovered != recove))
      {
        const a = await insertdbTotal(infect, risk_n, risk_y, recove);
        return true;
      };
    };
    
    if(Date.parse(date_H) == Date.parse(last_v_t.datedb)){
      if((last_v_t.risk_y != risk_y) || (last_v_t.risk_n != risk_n) || (last_v_t.infected != infect) || (last_v_t.recovered != recove))
      {
        const a = await updatedbTotal(infect, risk_n, risk_y, recove,last_v_t.id);
        return true;
      };
    };
    return false; 
  }
  else{
    console.log('entro al insert');
    const a = await insertdbTotal(infect, risk_n, risk_y, recove);
    return true;
  }
  
};


function on2true(array){
  for (let i = 0; i < array.length; i++) {
    if(array[i]=='on'){
        array[i]=true;
    }
    else{
        array[i]=false;
    }
  }
  return array;
};

//  function graf_date(total){
//     const date = [];
//     //const total = await getDBtotal();
//     total.forEach(function(item){
//       date.push(item.datedb);
//     });
//     console.log(date);
    
//     return date;
// }

// async function graf_infec(total){
//     const infec = [];
//     //const total = await getDBtotal();
//     total.forEach(function(item){
//       infec.push(item.infected)
//     })
//     return infec;
// }

//var a = parseInt("true") 
// if(isNaN(a))
// {
//   console.log(a);
// }
// else{ console.log('ok');
// }

  module.exports={
    filterAge_H,
    filterAge_L,
    filterCond_H,
    filterCond_L,
    filterCond_R,
    filterRisk_t,
    filterRisk_f,
    F_getemer,
    updateTotal,
    filterConH_F,
    static,
    on2true
    // graf_date,
    // graf_infec,
  };
