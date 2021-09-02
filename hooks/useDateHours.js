const useDateHours = ( totalTime, usedTime ) => {
  let times = [];
  let hours = Math.floor(totalTime/ 60);
  let minutes = Math.floor(totalTime% 60 );

  times.push(`${ hours } : ${ minutes }`);

  hours = Math.floor(usedTime/ 60);
  minutes = Math.floor(usedTime% 60 );
  times.push(`${ hours } : ${ minutes }`);
  
  hours = Math.floor( (totalTime - usedTime)/ 60);
  minutes = Math.floor((totalTime - usedTime)% 60 );
  times.push(`${ hours } : ${ minutes }`);
  return  times;
}
 
export default useDateHours;