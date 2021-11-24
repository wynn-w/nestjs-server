'use strict';
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

const path = require('path');
const fs = require('fs');
const { sequelize } = require('./sequelize');
console.time(111);
const { readAndParseCSV } = require('../common/rw_csv');
async function initDB() {
  const inputFilePath = path.resolve(__dirname, './demo.csv');
  const csvArrary = await readAndParseCSV(inputFilePath, {
    // columns: true,
    from_line: 2,
  });
  const dbMethod = await sequelize();
  console.log(1);
  await injectSQL(dbMethod);
  // // 主表
  const catagory_value = [];
  // const main_tabel = [];
  csvArrary.forEach(async item => {
    let [ id, name, description, unit, valueType, length, defaultValue, min, max, needReboot, category, writable, volatile ]
      = item;
    if (catagory_value.indexOf(category) === -1) {
      console.log(typeof category);
      catagory_value.push(category);
      // category = catagory_value.length - 1;
      dbMethod.query(`INSERT INTO catagory (type) VALUES('${category}')`);
    }
    // else {
    //   category = catagory_value.indexOf(category);
    // }
    // 格式处理
    id = parseInt(id);
    length = parseInt(length);
    writable = parseInt(writable);
    volatile = parseInt(volatile);
    volatile = parseInt(volatile);
    const temp = [ id, name, description, unit, valueType, length, defaultValue, min, max, needReboot, category, writable, volatile ];
    // main_tabel.push(temp);
    const sqlString = 'INSERT INTO dev_params (param_id, name, description, unit, value_type, length, default_value, min, max, need_reboot, catagory, writable, volatile) VALUES';
    dbMethod.query(`${sqlString}( ${await concatString(temp)})`);
  });
  // // 1. 主表注入
  // // 2. catagory 表注入

  console.timeEnd(111);
}
// initDB();

async function injectSQL(sequelize) {
  const inputFilePath = path.resolve(__dirname, 'inner_manager_db.sql');
  const sql_string = await fs.promises.readFile(inputFilePath, 'utf8', err => {
    if (err) throw err;
  });
  await sequelize.query(sql_string);
}
async function concatString(arg) {
  const res = [];
  arg.forEach((item, index) => {
    if ([ 0, 5, 9, 11, 12 ].indexOf(index) !== -1) {
      res.push(item);
    } else {
      res.push(`'${item}'`);
    }

  });
  // for (const item of arg) {
  //   res.push(`'${item}'`);
  // }
  return res.join(',');
}
initDB();
