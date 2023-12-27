'use client';
import React, { useState } from 'react';

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export default function Home() {
  const [text, setText] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setError('');
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('タスクを入力してください');
      return;
    }
    setTodos([...todos, { id: Date.now(), text: text, done: false }]);
    setText('');
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <main className="max-w-6xl w-full min-h-screen p-4 md:p-24">
      <h1 className="text-4xl font-bold">Simple Todo App</h1>
      <p className="mt-4 text-lg">
        Next.js × Typescriptのみで作成したシンプルなTodoアプリです。
      </p>
      <form onSubmit={handleSubmit} className="w-full mt-6">
        <div className="@container flex items-center gap-x-2">
          <input
            type="text"
            value={text}
            onChange={handleChange}
            placeholder="タスクを入力してください"
            className="basis-4/5 @2xl:w-11/12 p-2 border rounded"
          />
          <button
            type="submit"
            className="basis-1/5 @2xl:w-1/12 p-2 bg-blue-500 text-white rounded"
          >
            追加
          </button>
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </form>
      <div className="mt-10">
        <ul className="[&>li]:mt-2">
          {todos.map((todo) => (
            <li key={todo.id} className="text-lg bg-white rounded shadow-sm">
              <label className="flex items-center gap-x-2 px-4 py-2 cursor-pointer">
                <input type="checkbox" className="peer" />
                <p className="peer-checked:line-through peer-checked:text-gray-400">
                  {todo.text}
                </p>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
