import React, { useState } from "react";
import api from "../api";
import "./AddUserForm.css";
export default function AddUserForm({ onAdd }) {
  const [name, setName] = useState("");
  const submit = async e => {
    e.preventDefault();
    if (!name.trim()) return;
    await api.post("/users", { name: name.trim() });
    setName("");
    onAdd();
  };
  return (
    <form className="add-user-form" onSubmit={submit}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Add new user…" />
      <button type="submit">Add</button>
    </form>
  );
}