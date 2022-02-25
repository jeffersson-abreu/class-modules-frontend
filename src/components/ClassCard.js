import { CardTitle, CardRow, Toolbar, CardDescriptionSm, CardDescriptionMd, IconWrapper } from './ModuleCard';
import { useTheme, useAuth, useClasses } from '../hooks';
import { AiOutlineVideoCamera } from 'react-icons/ai';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import { MdAccessTime } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { hexToRGBA } from '../utils';
import { Typography } from '.';
import moment from 'moment';
import React from 'react';

const ClassWrapper = styled('div')`
  border: 1px solid ${({ theme }) => hexToRGBA(theme.tertiary, .2)};
  background-color: ${({ theme }) => theme.quaternary};
  padding: 16px 32px 16px;
  flex-direction: column;
  border-radius: 16px;
  margin-bottom: 20px;
  display: flex;
  flex: 0 1;

  @media(min-width: 768px){
    width: 60%;
  }

  @media(min-width: 1024px){
    width: 240px;
  }
`;

const CardDate = styled(Typography.Small)`
  align-self: center;
  margin-top: 10px;
  color: #999999;
  font-size: 12px;
  padding: 0;
  margin: 0;
`;

const CustomToolbar = styled(Toolbar)`
  width: 70px;
`;

const CustomCardTitle = styled(CardTitle)`
  height: 48px;

  @media(min-width: 768px) {
    -webkit-line-clamp: 2;
    word-break: break-word;
  }
`;

const InfoWrapper = styled('div')`
  margin-top: 30px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

const Image = styled('img')`
  height: 100%;
  width: 100%;
  margin: 16px 0px;
  border: 1px solid rgb(67, 51, 118);
  display: flex;
  -moz-box-pack: center;
  justify-content: center;
  -moz-box-align: center;
  border-radius: 8px;
`;


const IconLabel = styled(Typography.Small)`
  color: ${({ theme }) => theme.secondary};
  font-size: 12px;
  margin: 0 5px;
`;

const ClassCard = ({ _class, module, index }) => {
  const { name, date, description, duration } = _class;

  const { delete_class } = useClasses();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  function handleEdition() {
    let state = { module, _class };
    navigate(`/modules/${module.id}/edit-class`, { state });
  }

  async function handleDeletion() {
    if (await delete_class(module.id, _class.id)) {
      toast.success('Aula removida com sucesso', {
        position: "top-right",
        hideProgressBar: true,
        progress: undefined,
        closeOnClick: true,
        pauseOnHover: true,
        autoClose: 3000,
        draggable: true,
      });
    }
  }

  return (
    <ClassWrapper>
      <CardRow justify='space-between'>
        <CustomToolbar>
          {
            isAuthenticated && (
              <React.Fragment>
                <IconWrapper color={theme.secondary}>
                  <FiEdit size={16} onClick={handleEdition} />
                </IconWrapper>

                <IconWrapper color={theme.error}>
                  <FiTrash2 size={16} onClick={handleDeletion} />
                </IconWrapper>
              </React.Fragment>
            )
          }
        </CustomToolbar>
        <CardDate align='end'>{moment(date).format('DD/MM/YYYY')}</CardDate>
      </CardRow>
      <Image src='/devaria.png' />
      <CustomCardTitle>
        {name}
      </CustomCardTitle>
      <CardDescriptionSm>
        {description}
      </CardDescriptionSm>
      <CardDescriptionMd>
        {description}
      </CardDescriptionMd>
      <CardRow>
        <InfoWrapper>
          <AiOutlineVideoCamera color={theme.secondary} size={28} />
          <IconLabel>{index}/{module.classes} Aulas</IconLabel>
        </InfoWrapper>
        <InfoWrapper>
          <MdAccessTime color={theme.secondary} size={28} />
          <IconLabel>{duration} minutos</IconLabel>
        </InfoWrapper>
      </CardRow>
    </ClassWrapper >
  )
}

export default ClassCard;