import React, { useState } from "react";

export default function BirthdayForm({ onGenerate }) {
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("male");
  const [tribe, setTribe] = useState("akan");

  return (
    <div className="card">
      <input type="date" onChange={(e) => setDob(e.target.value)} />

      <select onChange={(e) => setGender(e.target.value)}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <select onChange={(e) => setTribe(e.target.value)}>
        <option value="akan">Akan</option>
        <option value="ga">Ga</option>
        <option value="ewe">Ewe</option>
        <option value="dagbani">Dagbani</option>
        <option value="fante">Fante</option>
        <option value="nzema">Nzema</option>
      </select>

      <button onClick={() => onGenerate({ dob, gender, tribe })}>
        Generate
      </button>
    </div>
  );
}