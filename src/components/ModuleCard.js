import { ReactComponent as CardIcon } from '../assets/card-icon.svg';
import { useTheme, useAuth, useModules } from '../hooks';
import { AiOutlineFolderAdd } from 'react-icons/ai';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Button, Typography } from '.';
import { hexToRGBA } from '../utils';
import React from 'react';


const CardContainer = styled('div')`
  border: 1px solid ${({ theme }) => hexToRGBA(theme.tertiary, .2)};
  background-color: ${({ theme }) => theme.quaternary};
  flex-direction: column;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex: 1;
  

  @media(min-width: 768px) {
    margin: 10px;
  }
`;

export const CardTitle = styled('p')`
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

export const CardDescriptionSm = styled('p')`
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

export const CardDescriptionMd = styled('p')`
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


export const CardRow = styled('div')`
  flex-direcion: row;
  justify-content: ${({ justify }) => justify || 'flex-start'};
  display: flex;
`;

export const Toolbar = styled('div')`
  justify-content: space-evenly;
  align-items: center;
  flex-direcion: row;
  margin-top: 10px;
  display: flex;
  width: 50%;
`;


export const ModuleCard = ({ module }) => {

  const { id, name, description } = module;

  const { delete_module } = useModules();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  async function handleDeletion() {
    if (await delete_module(id)) {
      toast.success(`${name} removido!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  function handleEdition() {
    navigate('/modules/edit', { state: { module } })
  }

  function handleAddClass() {
    navigate(`/modules/${id}/new-class`, { state: { module } })
  }

  function handleSeeClasses() {
    navigate(`/modules/${id}`, { state: { module } })
  }

  return (
    <CardContainer>
      <CardRow>
        <Typography.Small>{module.classes} Aulas</Typography.Small>
      </CardRow>
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
                <AiOutlineFolderAdd size={22} onClick={handleAddClass} />
              </IconWrapper>

              <IconWrapper>
                <FiEdit size={16} onClick={handleEdition} />
              </IconWrapper>

              <IconWrapper color={theme.error}>
                <FiTrash2 size={16} onClick={handleDeletion} />
              </IconWrapper>
            </Toolbar>
          )
        }

        <Button
          text='Ver detalhes'
          onClick={handleSeeClasses}
          weight={400}
          rounded={30}
          height='30px'
          width='50%'
          fs={12}
          mt={10}
        />
      </CardRow>
    </CardContainer>
  )
}
