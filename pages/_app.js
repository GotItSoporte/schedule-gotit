import ProjectsWrapper from '../context/states/projects.state';
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  const projectData = {
    projectsList : '',
    currentProject : '',
  }
  return (
    <ProjectsWrapper >
      <Component {...pageProps} />
    </ProjectsWrapper>
  )
}

export default MyApp
