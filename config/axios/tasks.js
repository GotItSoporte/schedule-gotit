import { scheduleApi } from './';

const getTasksProject =async ( projectID ) =>{
  try {
    return await scheduleApi.get(`/projects/${ projectID }/tasks`).data.tasks;
  } catch (error) {
    return {error : error.response.data, isError : true}
  }
}

export {
  getTasksProject
}