import styled from 'styled-components';
import { Form } from '@unform/web';


export const CoverBox = styled('div')`
  background-color: ${({ theme }) => theme.primary};
  min-height: 100%;
  min-width: 100%;
  flex-direction: column;
  display: flex;
  margin: 0;
`;


export const ContentBox = styled('div')`
  justify-content: flex-start;
  flex-direction: column;
  margin: 40px 25px 0px;
  padding: 0 0 30px;
  display: flex;
  
  @media(min-width: 1024px) {
    margin: 56px 112px 0px;
  }
`;


export const Box = styled('div')`
  align-items: start;
  flex-direction: column;
  margin-top: 5rem;
  padding: 0 20px;
  display: flex;

  @media(min-width: 768px){
    
  }
`;

export const Row = styled('div')`
  background-color: ${({ color, theme }) => color || theme.primary};
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  flex-direction: row;
  display: flex;
  flex: 1
`;

export const Col = styled('div')`
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  background-color: ${({ color, theme }) => color || theme.primary};
  align-items: ${({ alignItems }) => alignItems || ''};
  display: ${({ display }) => display || 'flex'};
  flex-direction: column;
  flex: 1;

  @media(min-width: 768px){
    display: ${({ displayMD }) => displayMD || 'flex'};
  }
`;

export const FormWrapper = styled(Form)`
  border: 1px solid ${({ theme }) => theme.secondary};
  flex-direction: column;
  padding: 70px 30px;
  border-radius: 8px;
  margin-top: 1rem;
  display: flex;
  flex: 1;

  @media(min-width: 768px){
    width: 45%;
  }
`;

export const Line = styled('div')`
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 5px;
  width: 70px;
  height: 5px;
`;

export const ToggleWrapper = styled('div')`
  justify-content: flex-end;
  display: flex;
  width: 50%; 
`;

