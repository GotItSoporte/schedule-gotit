// context
import UserWrapper from '../context/states/user.state';
import ProjectsWrapper from '../context/states/projects.state';
import TasksWrapper from '../context/states/tasks.state';
// Layout
import Layaout from '../components/layout';
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
          <Layaout>
            <Component {...pageProps} />
          </Layaout>
        </TasksWrapper>
      </ProjectsWrapper>
    </UserWrapper>
  )
}

export default MyApp
