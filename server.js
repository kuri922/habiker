import express from 'express';
import cors from 'cors';
import taskRoutes from './src/routes/taskRoutes.js'; // ルートをインポート

const app = express();

app.use(express.json());

// CORS設定
app.use(cors({
  origin: 'http://localhost:5173', // フロントエンドのURL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.get('/', (req, res) => {
  res.send('サーバーが動作しています');
});

// APIルートを登録
app.use('/api', taskRoutes);

app.listen(3000, () => {
  console.log("サーバーがポート3000で起動しました");
});
