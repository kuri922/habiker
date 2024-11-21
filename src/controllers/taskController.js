import db from "../config/db.js";

export const addTask = (req, res, next) => {
  const { task_content, category_id } = req.body;

  // 入力データの確認ログ
  console.log("受信したタスク内容:", task_content);
  console.log("受信したカテゴリーID:", category_id);

  // 入力値の検証
  if (!task_content || !category_id) {
    console.error("タスク内容またはカテゴリーIDが不足しています");
    return res.status(400).json({ error: "タスク内容とカテゴリーIDが必要です" });
    return next(error);
  }

  if (typeof task_content !== "string" || typeof category_id !== "number") {
    console.error("不正なデータ形式:", { task_content, category_id });
    return res.status(400).json({ error: "不正なデータ形式です" });
  }

  const query = `INSERT INTO planned_tasks (task_content, category_id) VALUES (?, ?)`;

  // クエリの確認ログ
  console.log("実行するSQLクエリ:", query);
  console.log("クエリパラメータ:", [task_content, category_id]);

  // データベースへのクエリ実行
  db.query(query, [task_content, category_id], (err, result) => {
    if (err) {
      console.error("DB登録エラー:", err);
      return res.status(500).json({ error: "サーバー内部エラーが発生しました" });
    }

    // 成功時のレスポンス
    res.status(201).json({ message: "タスクが登録されました", result });
  });
};
