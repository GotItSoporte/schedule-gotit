import { scheduleApi } from './';

const getTasksProject =async ( projectID ) =>{
  try {
    return await (await scheduleApi.get(`/projects/${ projectID }/tasks`)).data.tasks;
  } catch (error) {
    return {error, isError : true}
  }
}

export {
  getTasksProject
}