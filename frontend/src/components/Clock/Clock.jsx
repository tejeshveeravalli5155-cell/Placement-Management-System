import { useEffect,useState } from "react";
function Clock(){
    const[time,setTime] = useState(new Date)
useEffect(()=>{
    const timer = setInterval(()=>{
        setTime(new Date());
    },1000);
    return ()=>{
        clearInterval(timer);
    }
    },[]);
return(
<div>
    <h2>Current Time</h2>
    <h2>{time.toLocaleTimeString()}</h2>
</div>
)
};
export default Clock;
