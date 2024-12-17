import db from "../config/db.js";

//予定タスク登録
export const addTask = (req, res, next) => {
  const { task_content, category_id } = req.body;

  // 入力値の検証
  if (!task_content || !category_id) {
    console.error("タスク内容またはカテゴリーIDが不足しています");
    return res.status(400).json({ error: "タスク内容とカテゴリーIDが必要です" });
  }

  if (typeof task_content !== "string" || typeof category_id !== "number") {
    console.error("不正なデータ形式:", { task_content, category_id });
    return res.status(400).json({ error: "不正なデータ形式です" });
  }

  const query = `INSERT INTO planned_tasks (task_content, category_id) VALUES (?, ?)`;

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

//メニュー選択時に予定タスク取得
export const getTaskByCategory = (req, res) => {
  const { category_id } = req.query;

  if (!category_id) {
    return res.status(400).json({ error: "タスク内容とカテゴリーIDが必要です" });
  }

  // 予定タスク取得クエリ
  const plannedQuery = `SELECT * FROM planned_tasks WHERE category_id = ?`;

  // 完了タスク取得クエリ
  const completedQuery = `SELECT * FROM completed_tasks WHERE category_id = ? AND DATE(completed_at) = CURDATE()`;

  db.query(plannedQuery, [category_id], (err, plannedResults) => {
    if (err) {
      console.error("予定タスク取得エラー", err);
      return res.status(500).json({ error: "予定タスクの取得に失敗しました" });
    }


    db.query(completedQuery, [category_id], (err, completedResults) => {
      if (err) {
        console.error("完了タスク取得エラー", err);
        return res.status(500).json({ error: "完了タスクの取得に失敗しました" });
      }
      // 両方の結果をまとめて返す
      res.status(200).json({
        plannedTasks: plannedResults,
        completedTasks: completedResults,
      });
    })
  })
}

//メニュー選択時に予定タスク取得
export const setCompleteTask = (req, res) => {
  const { task_content, category_id, actual_minutes } = req.body;

  if (!task_content || !category_id || !actual_minutes) {
    return res.status(400).json({ error: "必要なデータが不足しています" });
  }

  // トランザクションを開始
  db.beginTransaction((transactionErr) => {
    if (transactionErr) {
      console.error("トランザクション開始エラー:", transactionErr);
      return res.status(500).json({ error: "トランザクションの開始に失敗しました" });
    }

    // 完了タスクを completed_tasks に追加
    const query = `INSERT INTO completed_tasks (task_content, category_id, actual_minutes) VALUES (?, ?, ?)`;

    db.query(query, [task_content, category_id, actual_minutes], (err, results) => {
      if (err) {
        console.error("タスク取得エラー", err);
        return db.rollback(() => {
          res.status(500).json({ error: "完了タスクの登録に失敗しました" });
        });
      }

      // 完了したタスクを planned_tasks テーブルから削除
      const deleteQuery = `
      DELETE FROM planned_tasks WHERE task_content = ? AND category_id = ?`;

      db.query(deleteQuery, [task_content, category_id], (deleteErr, deleteResults) => {
        if (deleteErr) {
          console.error("予定タスク削除エラー:", deleteErr);
          return db.rollback(() => {
            res.status(500).json({ error: "予定タスクの削除に失敗しました" });
          });
        }

        console.log("予定タスクが削除されました:", deleteResults);

        // トランザクションコミット
        db.commit((commitErr) => {
          if (commitErr) {
            console.error("トランザクションコミットエラー:", commitErr);
            return db.rollback(() => {
              res.status(500).json({ error: "トランザクションのコミットに失敗しました" });
            });
          }

          // レスポンスはここで1回だけ返す
          return res.status(200).json({ message: "完了タスクが登録され、予定タスクが削除されました" });
        });
      });
    });
  });
};


//グラフ表示用
export const getComletedTask = (req, res) => {
  const query = `SELECT category_id, SUM(actual_minutes) as total_time FROM completed_tasks GROUP BY category_id`;

  db.query(query, (err, result) => {
    if (err) {
      console.error("完了タスク取得エラー", err);
      return res.status(500).json({ error: "完了タスクの取得に失敗しました" });
    }
    res.status(200).json(result);
  })
}


