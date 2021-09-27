// __tests__/index.test.jsx

/**
 * @jest-environment jsdom
 */

 import React from 'react'
 import { render, screen } from '@testing-library/react'
 import { renderHook } from '@testing-library/react-hooks';
// hook
import UserWrapper from '../context/states/user.state';
import ProjectsWrapper from '../context/states/projects.state';
import TasksWrapper from '../context/states/tasks.state';
import AlertWrapper from '../context/states/alerts.state';
 // component
 import Home from '../pages/index'
 
 describe('Home', () => {
   it('renders a heading', () => {
     render(
       <UserWrapper>
         <ProjectsWrapper>
           <TasksWrapper>
             <AlertWrapper>
                <Home />
             </AlertWrapper>
           </TasksWrapper>
         </ProjectsWrapper>
       </UserWrapper>
     )
 
     const heading = screen.getByRole('heading', {
       name: /welcome to next\.js!/i,
     })
 
     expect(heading).toBeInTheDocument()
   })
 })