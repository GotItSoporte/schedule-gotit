import { scheduleApi } from './';

const getProjects = async ( offset, slice ) => {
  return await (await scheduleApi.get('/projects')).data.projects;
}

export {
  getProjects,
}