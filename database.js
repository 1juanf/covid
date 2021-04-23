  
//const { initmap } = require('./helpers/map');

const { Pool } = require('pg');

const config = {
    host: process.env.DBhost,
    user: process.env.DBuser,
    password: process.env.DBpass,
    database: process.env.DBdb,
    port: process.env.DBport
};

// const config = {
//     host: process.env.DBhost,
//     user: process.env.DBuser,
//     password: process.env.DBpass,
//     database: process.env.DBdb,
//     port: process.env.DBport
// };


if (process.env.NODE_ENV !== 'production') {
    config["ssl"] = true;
    require('dotenv').config();
  } 
else{
    config["ssl"] = false;
}

const pool = new Pool(config);

async function getuserc(id){
    try {
      const res = await pool.query('SELECT * FROM userc WHERE id_c=($1);',[id]);
      const resrow = await res.rows;    
      return resrow[0];
    } catch (e) {
         console.log(e);
    }
};


async function getPatient(){
    try {
        const res = await pool.query('SELECT * FROM patient;');
        const resrow = await res.rows;
        return resrow;
    } catch (e){
        console.log(e);
    }
};

async function getPatientU(){
    try {
        const upt = await pool.query('UPDATE patient SET risk=true WHERE rf_cardiac=true OR rf_respiratory=true OR rf_diabetes=true OR rf_hypertension=true'); 
        const upt1 = await pool.query('UPDATE patient SET condition=5 WHERE question3=true');
        const res = await pool.query('SELECT * FROM patient;');
        const resrow = await res.rows;
        return resrow;
    } catch (e){
        console.log(e);
    }
};

async function getDBtotal(){
    try {
        const res = await pool.query('SELECT * FROM dbtotal;');
        const resrow = await res.rows;
        return resrow;
    } catch (e) {
        console.log(e);
    }
};

async function getPatient_1(id){
    try {
        const res = await pool.query('SELECT * FROM patient WHERE id = ($1);',[id]);
        const resrow = await res.rows;
        return resrow[0];
    } catch (e) {
        console.log(e);
    }
};

async function updatePat(estado,recom,id){
    try {
        const res = await pool.query('UPDATE patient  SET condition = ($1), recommendations = ($2) WHERE id=($3);',[estado, recom, id]);
        return res;
    } catch (e) {
        console.log(e);
    }
};

async function updateAllPat(recom){
    console.log(recom);
    try {
        const res = await pool.query('UPDATE patient SET recommendations = ($1);',[recom]);
        console.log(res.command);
        return res;
    } catch (e) {
       console.log(e);
    }
};

async function updatedbTotal(infec, risk_n, risk_y, recove,id){
    try {
        const res = await pool.query('UPDATE dbtotal SET infected=($1), risk_n=($2), risk_y=($3), recovered=($4) WHERE id=($5);',[infec, risk_n, risk_y, recove,id]);
        return res;
    } catch (e) {
        console.log(e);
    }
};

async function insertdbTotal(infec, risk_n, risk_y, recove){
    try{
    const res = await pool.query('INSERT INTO dbtotal (infected, risk_n, risk_y, recovered) VALUES ($1,$2,$3,$4);',[infec, risk_n, risk_y, recove]);
    return res;
    }catch(e){
        console.log(e);
    }
};

async function EmerPat_E(op,recom,id){
        if (op=='true') {
            op=true;
        }
        else{
            op=false;
        }
    try {
        const res = await pool.query('UPDATE patient SET recommendations = ($1), emer = ($2) WHERE id = ($3);',[recom,op,id]);
        //console.log(res.command);
        return res;
    } catch (e) {
        console.log(e);
    }
};

async function update_tem(id,temp){
    try {
        const res = await pool.query('UPDATE patient SET s_temperature = ($1) WHERE id = ($2);',[temp,id]);
         return res;
    }catch (e){
        console.log(e);
    }
};

async function update_patient(id,check){
    const tos=definite(check.tos);
    const head=definite(check.head);
    const fatigue=definite(check.fatigue);
    const taste=definite(check.taste);
    const throat=definite(check.throat);
    const breathing=definite(check.breathing);
    try {
        const update = await pool.query('UPDATE patient SET s_cough=($1), ss_throat=($2), ss_head=($3), s_taste=($4), sd_breathing=($5), fatigue=($6) WHERE id=($7)',[tos, throat, head, taste, breathing, fatigue, id])
        if(check.length > 3){
            const res = await pool.query('UPDATE patient SET condition=3 WHERE id=($1)',[id]);
        }
        else{
            var res = await pool.query('UPDATE patient SET condition=2 WHERE risk=true and id=($1)',[id]);
            res = await pool.query('UPDATE patient SET condition=1 WHERE risk=false and id=($1)',[id]);
        }
        return res;
    } catch (e) {
        console.log(e);
    }
};

function definite(check){
    if(check == 'on'){
        return true;
    }
    else{
        return false;
    }
};


async function insertPatient(namep,type,id_c,tell,old, sex,risk,symp, coords){
    // console.log(risk,symp);
    const rysks = risk.includes(true);
    const symps = symp.indexOf(true);
    // const coords = initmap();
    try {
        if((symps>=3)||((symp[0]==true)&&(symp[1]==true)&&(symp[5]==true))){
            if(rysks >= 1){
                const string = 'INSERT INTO patient (id,type_id,namep,age,sex,phone,lon,lat,rf_cardiac,rf_respiratory, rf_diabetes, rf_hypertension, s_temperature, s_cough, ss_throat, ss_head, s_taste, sd_breathing, condition, fatigue, risk) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)';
                const VALUES = [id_c,type,namep,old,sex,tell,coords[0],coords[1],risk[0],risk[1],risk[2],risk[3],symp[0],symp[1],symp[2],symp[3],symp[4],symp[5],3,symp[6],rysks];
                const res = await pool.query(string,VALUES);  
            }
            else{
                const string = 'INSERT INTO patient (id,type_id,namep,age,sex,phone,lon,lat,rf_cardiac,rf_respiratory, rf_diabetes, rf_hypertension, s_temperature, s_cough, ss_throat, ss_head, s_taste, sd_breathing, condition, fatigue, risk) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)';
                const VALUES = [id_c,type,namep,old,sex,tell,coords[0],coords[1],risk[0],risk[1],risk[2],risk[3],symp[0],symp[1],symp[2],symp[3],symp[4],symp[5],4,symp[6],rysks];
                const res = await pool.query(string,VALUES);
            }
        }
        else{
            if(rysks >= 1){
                const string = 'INSERT INTO patient (id,type_id,namep,age,sex,phone,lon,lat,rf_cardiac,rf_respiratory, rf_diabetes, rf_hypertension, s_temperature, s_cough, ss_throat, ss_head, s_taste, sd_breathing, condition, fatigue, risk) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)';
                const VALUES = [id_c,type,namep,old,sex,tell,coords[0],coords[1],risk[0],risk[1],risk[2],risk[3],symp[0],symp[1],symp[2],symp[3],symp[4],symp[5],2,symp[6],rysks];
                const res = await pool.query(string,VALUES);  
            }
            else{
                const string = 'INSERT INTO patient (id,type_id,namep,age,sex,phone,lon,lat,rf_cardiac,rf_respiratory, rf_diabetes, rf_hypertension, s_temperature, s_cough, ss_throat, ss_head, s_taste, sd_breathing, condition, fatigue, risk) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)';
                const VALUES = [id_c,type,namep,old,sex,tell,coords[0],coords[1],risk[0],risk[1],risk[2],risk[3],symp[0],symp[1],symp[2],symp[3],symp[4],symp[5],1,symp[6],rysks];
                const res = await pool.query(string,VALUES);
            }
        }

    } catch (e) {
        console.log(e);
    }
};

module.exports ={
    getuserc,
    getPatient,
    getPatientU,
    getDBtotal,
    getPatient_1,
    updatePat,
    updateAllPat,
    updatedbTotal,
    EmerPat_E,
    insertdbTotal,
    insertPatient,
    update_tem,
    update_patient
};
