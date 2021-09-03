const useDateHours = ( totalTime, usedTime ) => {
  let times = [];
  let hours = Math.floor(totalTime/ 60);
  let minutes = Math.floor(totalTime% 60 );

  times.push(`${ hours.toString().padStart( 2, '0' ) } : ${ minutes.toString().padStart( 2, '0' ) }`);

  hours = Math.floor(usedTime/ 60);
  minutes = Math.floor(usedTime% 60 );
  times.push(`${ hours.toString().padStart( 2, '0' ) } : ${ minutes.toString().padStart( 2, '0' ) }`);
  
  hours = Math.floor( (totalTime - usedTime)/ 60);
  minutes = Math.floor((totalTime - usedTime)% 60 );
  times.push(`${ hours.toString().padStart( 2, '0' )} : ${ minutes.toString().padStart( 2, '0' ) }`);
  return  times;
}
 
export default useDateHours;