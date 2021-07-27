import React, { useEffect } from 'react';
// components
import Layout from '../../components/layout'
// http
import { scheduleApi } from '../../config/axios'

const Proyects = () => {
  useEffect(() => {
    getTasks();
  }, [])

  const getTasks = async () => {
    let result = await scheduleApi.get( 'schedule/v1/projects/610038fa9c6fd61e20a901e2/tasks' )
    console.log({ result })
  }
  return(
    <Layout>
      <div><h2>Proyects</h2></div>
    </Layout>
  );
}
 
export default Proyects;

