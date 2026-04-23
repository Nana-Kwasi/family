export const getDay = (date) => {
  return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date(date).getDay()];
};

export const getAge = (dob) => {
  const birth = new Date(dob);
  const now = new Date();

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    days += 30;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const hours = Math.floor((now - birth) / (1000 * 60 * 60));

  return { years, months, days, hours };
};

export const zodiac = (date) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;

  if ((month==3&&day>=21)||(month==4&&day<=19)) return "Aries";
  if ((month==4&&day>=20)||(month==5&&day<=20)) return "Taurus";
  if ((month==5&&day>=21)||(month==6&&day<=20)) return "Gemini";
  return "Other";
};

export const countdown = (dob) => {
  const now = new Date();
  const next = new Date(now.getFullYear(), new Date(dob).getMonth(), new Date(dob).getDate());

  if (next < now) next.setFullYear(now.getFullYear() + 1);

  const diff = next - now;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

export const message = (name) => {
  const messages = [
    `${name}, you are destined for greatness 🚀`,
    `${name}, your presence lights up the world ✨`,
    `${name}, today is your power day 💪`,
  ];
  return messages[Math.floor(Math.random()*messages.length)];
};