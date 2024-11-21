import express from 'express';
import { addTask } from '../controllers/taskController.js';

const router = express.Router();

// 予定タスクを登録するエンドポイント
router.post('/add-task', (req, res, next) => {
  console.log(`リクエスト受信: ${req.method} ${req.url}`);
  next(); // 次のミドルウェア（`addTask`関数）に進む
}, addTask);

export default router;
