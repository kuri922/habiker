import express from 'express';
import { addTask, getTaskByCategory, setCompleteTask } from '../controllers/taskController.js';

const router = express.Router();

// タスク予定登録するエンドポイント
router.post('/add-task', (req, res, next) => {
  next(); // 次のミドルウェア（`addTask`関数）に進む
}, addTask);

//項目別タスク取得エンドポイント
router.get('/tasks', (req, res, next) => {
  next();
}, getTaskByCategory);

//タスク完了登録エンドポイント
router.post('/complete-task', (req, res, next) => {
  next();
}, setCompleteTask);

export default router;
