import React, { useState, useEffect } from "react";

export default function MemoryForm() {
  const [text, setText] = useState("");
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("memories") || "[]");
    setMemories(saved);
  }, []);

  const submit = () => {
    const updated = [...memories, text];
    localStorage.setItem("memories", JSON.stringify(updated));
    setMemories(updated);
    setText("");
  };

  return (
    <div className="card">
      <h2>🎈 Birthday Memories</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share a memory..."
      />

      <button onClick={submit}>Save</button>

      {memories.map((m, i) => (
        <p key={i}>• {m}</p>
      ))}
    </div>
  );
}