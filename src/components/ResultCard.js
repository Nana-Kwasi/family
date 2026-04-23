import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import akan from "../data/akan.json";
import famous from "../data/famous.json";
import { getDay, getAge, zodiac, countdown, message } from "../utils/dateUtils";

export default function ResultCard({ data }) {

  useEffect(() => {
    if (!data) return;
    confetti();
  }, [data]);

  if (!data) return null;
const todayMatches = famous.filter(person => {
  const d = new Date(person.dob);
  return (
    d.getDate() === new Date(data.dob).getDate() &&
    d.getMonth() === new Date(data.dob).getMonth()
  );
});
  const day = getDay(data.dob);
  const name = akan[day][data.gender];
  const age = getAge(data.dob);

  return (
    <div className="card result">
      <h2>{name}</h2>
      <p>Day Born: {day}</p>

      <p>Age: {age.years}y {age.months}m {age.days}d ({age.hours} hrs)</p>

      <p>Zodiac: {zodiac(data.dob)}</p>

      <p>🎂 Next Birthday in {countdown(data.dob)} days</p>

      <p>{message(name)}</p>
{todayMatches.length > 0 && (
  <div>
    <h3>🎉 Famous People Born Today</h3>
    {todayMatches.map((p, i) => (
      <p key={i}>{p.name}</p>
    ))}
  </div>
)}
      <button onClick={() => navigator.share?.({
        title: "My Ghana Birthday",
        text: `I am ${name}!`,
      })}>
        Share
      </button>
    </div>
  );
}