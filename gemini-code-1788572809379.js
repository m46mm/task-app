'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // 簡易的なパスワードチェック（Vercelの環境変数または初期パスワード）
  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'himitsu123') { // ここを好きなパスワードに変更してね
      setIsAuthenticated(true);
    } else {
      alert('パスワードがちがうよ！');
    }
  };

  // タスクを追加する機能
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
    setNewTask('');
  };

  // タスクを完了・未完了にする機能
  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  // タスクを削除する機能
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <main style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', background: '#f0f2f5' }}>
        <form onSubmit={handleLogin} style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h2>🔐 秘密のタスク管理</h2>
          <p>パスワードを入力してね</p>
          <input 
            type="password" 
            value={passwordInput} 
            onChange={(e) => setPasswordInput(e.target.value)} 
            placeholder="パスワード"
            style={{ padding: '10px', fontSize: '16px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '10px 20px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>入室</button>
        </form>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>✨ マイ・タスク管理 ＆ カレンダー</h1>
      
      {/* タスク入力フォーム */}
      <form onSubmit={addTask} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="新しいタスクを入力..."
          style={{ flex: 1, padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>追加</button>
      </form>

      {/* タスク一覧 */}
      <h2>📝 今日のタスク</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.length === 0 && <p style={{ color: '#888' }}>まだタスクはないよ！上の欄から追加してね。</p>}
        {tasks.map(task => (
          <li key={task.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', padding: '10px 15px', marginBottom: '8px', borderRadius: '5px', border: '1px solid #eee' }}>
            <span 
              onClick={() => toggleTask(task.id)} 
              style={{ textDecoration: task.done ? 'line-through' : 'none', color: task.done ? '#aaa' : '#000', cursor: 'pointer', flex: 1 }}
            >
              {task.done ? '✅ ' : '🔲 '}{task.text}
            </span>
            <button onClick={() => deleteTask(task.id)} style={{ background: '#ff4d4f', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>削除</button>
          </li>
        ))}
      </ul>

      {/* Googleカレンダー表示エリアの案内 */}
      <div style={{ marginTop: '40px', padding: '20px', background: '#eef6ff', borderRadius: '8px', border: '1px solid #bbe2ff' }}>
        <h3>📅 Googleカレンダーの予定</h3>
        <p>ここにカレンダーの予定を表示する仕組みを追加していくよ！</p>
      </div>
    </main>
  );
}