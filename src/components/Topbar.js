import { AiOutlineLogout } from 'react-icons/ai';
import { Button, ThemeToggle } from './Buttons';
import { useNavigate } from "react-router-dom";
import { IconWrapper } from './ModuleCard';
import styled from 'styled-components';
import { useAuth } from '../hooks';
import React from 'react';


const TopbarWrapper = styled('div')`
  border-bottom: 1px solid #bab5c5;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  padding: 0px 25px;
  display: flex;
  height: 72px;
  margin: 0px;
  gap: 20px;

  @media(min-width: 768px) {
    padding: 0px 112px;
    height: 96px;
  }
`;


export const Topbar = ({ children }) => {

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLoginClick() {
    navigate('/login');
  }

  return (
    <TopbarWrapper>
      {
        isAuthenticated ?
          <React.Fragment>
            {children}
            <IconWrapper>
              <AiOutlineLogout
                onClick={logout}
                size={25}
              />
            </IconWrapper>
          </React.Fragment>

          :
          <Button
            text='Área administrativa'
            onClick={handleLoginClick}
            outline
            mr={20}
            pr={30}
            pl={30}
          />
      }


      <ThemeToggle />
    </TopbarWrapper>
  )
}