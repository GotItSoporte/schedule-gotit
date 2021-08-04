// context
import UserWrapper from '../context/states/user.state';
import ProjectsWrapper from '../context/states/projects.state';
import TasksWrapper from '../context/states/tasks.state';
import AlertWrapper from '../context/states/alerts.state';
//styles
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  const projectData = {
    projectsList : '',
    currentProject : '',
  }
  return (
    <UserWrapper>
      <ProjectsWrapper >
        <TasksWrapper>
          <AlertWrapper>
            <Component {...pageProps} />
          </AlertWrapper>
        </TasksWrapper>
      </ProjectsWrapper>
    </UserWrapper>
  )
}

export default MyApp
