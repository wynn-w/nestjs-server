'use strict';
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

const path = require('path');
const fs = require('fs');
const { sequelize } = require('./sequelize');
const { toLine } = require('../common/stringTransform.uitls');
const { readAndParseCSV } = require('../common/rw_csv');
async function initDB() {
  const inputFilePath = path.resolve(__dirname, './demo.csv');
  const csvArrary = await readAndParseCSV(inputFilePath, {
    // columns: true,
    from_line: 1,
  });
  const csvHeadString = csvArrary[0].map(item =>
    toLine(item)).join(',').replace(/^id/g, 'param_id');
  const dbMethod = await sequelize();
  await injectSQL(dbMethod);
  // 数据导入
  const catagory_value = [];
  csvArrary.forEach(async (item, index) => {
    if (index === 0) return;
    let [ id, name, description, unit, valueType, length, defaultValue, min, max, needReboot, category, writable, volatile ]
      = item;
    if (catagory_value.indexOf(category) === -1) {
      catagory_value.push(category);
      dbMethod.query(`INSERT INTO catagory (type) VALUES('${category}')`);
    }
    // 格式处理
    id = parseInt(id);
    length = parseInt(length);
    writable = parseInt(writable);
    volatile = parseInt(volatile);
    volatile = parseInt(volatile);
    const temp = [ id, name, description, unit, valueType, length, defaultValue, min, max, needReboot, category, writable, volatile ];
    dbMethod.query(`INSERT INTO dev_params(${csvHeadString}) VALUES ( ${await concatString(temp)})`);
  });
}

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
  return res.join(',');
}
initDB();
