// src/config/db.js
import mysql from 'mysql2';

// データベース接続設定
const db = mysql.createConnection({
  host: 'localhost',
  user: 'kuriyama', // ユーザー名
  password: 'jqb60173', // パスワード
  database: 'task_management_mst' // データベース名
});

// 接続の確立
db.connect((err) => {
  if (err) {
    console.error('MySQL接続エラー:', err);
    return;
  }
  console.log('MySQLに接続されました');
});

export default db;
