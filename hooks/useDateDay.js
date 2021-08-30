const useDateDay = ( date ) => {
  const dateOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date( date ).toLocaleDateString( 'es-ES', dateOptions)
}
 
export default useDateDay;