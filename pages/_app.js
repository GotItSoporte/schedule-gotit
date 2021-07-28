import ProjectsWrapper from '../context/states/projects.state';
import TasksWrapper from '../context/states/tasks.state';
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  const projectData = {
    projectsList : '',
    currentProject : '',
  }
  return (
    <ProjectsWrapper >
      <TasksWrapper>
        <Component {...pageProps} />
      </TasksWrapper>
    </ProjectsWrapper>
  )
}

export default MyApp
