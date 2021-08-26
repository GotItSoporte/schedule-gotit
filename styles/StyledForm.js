import styled from "styled-components";
import device from '../styles/styledBreakPoints';
// material
import { Grid } from "@material-ui/core";

export const StyledForm =styled( Grid )`
  box-shadow: rgb(0 0 0 / 10%) 0px 10px 15px -3px, 
		rgb(0 0 0 / 5%) 0px 4px 6px -2px;
		margin: 2rem 0rem 2rem 0rem;
		padding: 0 0 0 0;
		.form-container{
			box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
			min-width: 10rem;
			max-width: 40rem;	
			
			background-color: #2E4054;
			border-radius: 10px;
			h1 {
				color: ${ props => props.theme.primary }; 
				letter-spacing:1px; 
				text-align:center; 
			}
			form {
				width: 90%;
				padding: 30px 60px 60px 60px;		
				padding: 30px 0.5rem 60px 0.5rem;		
				@Media ${ device.md }{
					padding: 30px 60px 60px 60px;		
				}
			}
	}
`;