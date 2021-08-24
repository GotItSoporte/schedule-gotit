// context
import UserWrapper from '../context/states/user.state';
import ProjectsWrapper from '../context/states/projects.state';
import TasksWrapper from '../context/states/tasks.state';
import AlertWrapper from '../context/states/alerts.state';
//styles
import { ThemeProvider } from 'styled-components';
import '../styles/globals.scss'

const theme = {
  'primary'       : "#0D9AFF",
  'primary-dark'  : "#0877c7",
  'primary-light' : "#77c6ff",
   
  'color-text' : '#b2b4b9',
  'color-input-text' : '#eee',

  'secondary'       : "#F2622A",
  'secondary-dark'  : "#E76F51",
  'secondary-light' : "#F4A261",

  'color-back-ground'       : '#282c34',
  'background-light-color'  : '#304257',
  'background-dark-color'   : '#0b1014',

  'danger-color' : 'rgb(42, 121, 158)',
  'warning-color' : 'rgb(255, 217, 0)',
  'success-color'  : 'rgb(0, 250, 54)',


};

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
            <ThemeProvider theme = { theme }>
              <Component {...pageProps} />
            </ThemeProvider>
          </AlertWrapper>
        </TasksWrapper>
      </ProjectsWrapper>
    </UserWrapper>
  )
}

export default MyApp
