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
  flex-direction: column;
  margin: 40px 25px 0px;
  align-items: center;
  padding: 0 0 30px;
  display: flex;

  @media(min-width: 1024px) {
    justify-content: flex-start;
    align-items: flex-start;
    margin: 56px 112px 0px;
  }
`;


export const Box = styled('div')`
  margin-top: ${({ mt }) => mt || '0px'};
  block-size: fit-content;
  width: fit-content;
  padding: 0 20px;
`;

export const Row = styled('div')`
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  flex-direction: row;
  display: flex;
  flex: 1 1 0;
`;

export const Col = styled('div')`
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  background-color: ${({ color, theme }) => color || theme.primary};
  align-items: ${({ alignItems }) => alignItems || 'center'};
  display: ${({ display }) => display || 'flex'};
  padding-bottom: ${({ pb }) => pb || 0}px;
  padding-right: ${({ pr }) => pr || 0}px;
  padding-left: ${({ pl }) => pl || 0}px;
  padding-top: ${({ pt }) => pt || 0}px;
  flex-direction: column;
  flex: 1;

  @media(min-width: 768px){
    display: ${({ displayMD }) => displayMD || 'flex'};
    padding-bottom: ${({ pb, pbMD }) => pbMD || pb}px;
    padding-right: ${({ pr, prMD }) => prMD || pr}px;
    padding-left: ${({ pl, plMD }) => plMD || pl}px;
    padding-top: ${({ pt, ptMD }) => ptMD || pt}px;
    align-items: 'center';
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
`;

export const Line = styled('div')`
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 5px;
  width: 70px;
  height: 5px;
`;

export const ToggleWrapper = styled('div')`
  justify-content: flex-end;
  align-items: flex-end;
  display: flex;
`;


export const CenteredContent = styled('div')`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  display: flex;
  flex: 1;
`;

