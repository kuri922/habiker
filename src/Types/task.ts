// src/types/task.ts
export type Task = {
  task_content: string; // タスク内容
  category_id: number; // カテゴリーID
  actualTime?: number; // 実績時間（完了時のみ）
};
