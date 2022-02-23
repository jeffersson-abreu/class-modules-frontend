import { ReactComponent as CardIcon } from '../assets/card-icon.svg';
import { AiOutlineFolderAdd } from 'react-icons/ai';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import { useTheme, useAuth } from '../hooks';
import styled from 'styled-components';
import { hexToRGBA } from '../utils';
import { Button } from '.';
import React from 'react';


const CardContainer = styled('div')`
  border: 1px solid ${({ theme }) => hexToRGBA(theme.tertiary, .2)};
  background-color: ${({ theme }) => theme.quaternary};
  flex-direction: column;
  border-radius: 16px;
  margin-bottom: 20px;
  max-width: 300px;
  padding: 16px;
  display: flex;

  @media(min-width: 768px) {
    margin: 0px 20px 20px 0px;
  }
`;

const CardTitle = styled('p')`
  color: ${({ theme }) => theme.tertiary};
  font-family: Nunito;
  line-height: 24px;
  font-size: 22px;
  font-weight: 700;
  max-height: 48px;
  margin: 0;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  

  @media(min-width: 768px) {
    -webkit-line-clamp: 1;
    word-break: break-all;
    max-width: 230px;
  }
`;

const CardDescriptionSm = styled('p')`
  color: ${({ theme }) => theme.tertiary};
  font-family: Nunito;
  font-size: 12px;
  font-weight: 300;
  line-height: 16px;
  margin: 0;
  margin-top: 7px;

  @media(min-width: 768px) {
    display: none
  }
`;

const CardDescriptionMd = styled('p')`
  color: ${({ theme }) => theme.tertiary};
  font-family: Nunito;
  font-size: 14px;
  font-weight: 300;
  line-height: 21px;
  height: 42px;
  margin: 0;
  margin-top: 7px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media(max-width: 768px) {
    display: none
  }
`;

const Icon = styled(CardIcon)`
  margin-right: 10px;
  min-height: 56px;
  min-width: 56px;

  @media(min-width: 768px) {
    min-height: 72px;
    min-width: 72px;
  }
`;

export const IconWrapper = styled('div')`
  color: ${({ theme, color }) => color || theme.secondary};
  transition: color .3s;
  padding: 0px;
  margin: 0px;

  &:hover {
    color: ${({ theme, color }) => hexToRGBA(color || theme.secondary, .7)}
  }
`;


const CardRow = styled('div')`
  flex-direcion: row;
  justify-content: ${({ justify }) => justify || 'flex-start'};
  display: flex;
`;

const Toolbar = styled('div')`
  justify-content: space-evenly;
  align-items: center;
  flex-direcion: row;
  margin-top: 10px;
  display: flex;
  width: 50%;
`;


export const ModuleCard = ({ id, name, description }) => {

  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();

  return (
    <CardContainer>
      <CardRow>
        <Icon />
        <div>
          <CardTitle>{name}</CardTitle>
          <CardDescriptionMd>{description}</CardDescriptionMd>
        </div>
      </CardRow>
      <CardDescriptionSm>{description}</CardDescriptionSm>
      <CardRow justify='flex-end'>
        {
          isAuthenticated && (
            <Toolbar>
              <IconWrapper>
                <AiOutlineFolderAdd size={26} />
              </IconWrapper>

              <IconWrapper>
                <FiEdit size={20} />
              </IconWrapper>

              <IconWrapper color={theme.error}>
                <FiTrash2 size={20} />
              </IconWrapper>
            </Toolbar>
          )
        }


        <Button
          text='Saiba mais!'
          weight={400}
          rounded={30}
          height={30}
          width='50%'
          fs={12}
          mt={10}
        />
      </CardRow>
    </CardContainer>
  )
}
