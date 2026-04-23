import React,{useEffect,useState} from "react";

export default function Leaderboard(){
const [list,setList]=useState([]);

useEffect(()=>{
let data=JSON.parse(localStorage.getItem("leaderboard")||"{}");
let sorted=Object.entries(data).sort((a,b)=>b[1]-a[1]);
setList(sorted);
},[]);

return (
<div className="card">
<h2>Top Birthdays</h2>
{list.slice(0,5).map((i,idx)=><p key={idx}>{i[0]} - {i[1]}</p>)}
</div>
);
}
