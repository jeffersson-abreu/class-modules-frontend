
import { ReactComponent as Play } from '../../assets/play.svg'
import { MdOndemandVideo, MdAccessTime } from 'react-icons/md';
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme, useClasses, useAuth } from '../../hooks';
import { ClassCard, Player } from '../../components';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import {
  ContentBox,
  Typography,
  CoverBox,
  Button,
  Topbar,
  Row,
  Col
} from '../../components';


const CustomRow = styled(Row)`
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  background-color: ${({ color, theme }) => color || theme.primary};
  flex-direction: column-reverse;
  display: flex;
  width: 100%;

  @media(min-width: 768px) {
    flex-direction: row;
    margin-bottom: 20px;
    display: flex;
    width: 100%;
    flex: 1;
  }
`;

const PlayIcon = styled(Play)`
  display: none;

  @media(min-width: 768px){
    display: block;
  }
`;

const CardsWrapper = styled('div')`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  display: flex;
  
  width: 100%;
  
  @media(min-width: 768px) {
    display: inline-block;
  }
`;


const CustomCol = styled(Col)`

  width: fit-content;
  display block;
  width: 100%;

  @media(min-width: 768px) {  
    display: inline-flex;
    width: 50%;
  }

  @media(min-width: 1024px) {
    align-items: flex-start;
  }

  @media(min-width: 1180px) {
    align-items: flex-start;
    width: 33%
  }
`;

const IconWrapper = styled('div')`
  align-items: center;
  display: flex;
  gap: 10px;
`;

const CardTitle = styled('p')`
  color: ${({ theme }) => theme.tertiary};
  font-family: Nunito;
  line-height: 36px;
  font-size: 32px;
  font-weight: 700;
  margin: 0;
`;

const IconLabel = styled(Typography.Small)`
  font-size: 13px;
  margin: 0;
`;


const ListClasses = () => {
  const { classes, get_module_classes } = useClasses();
  const [totalDutation, setTotalDuration] = useState();

  useEffect(() => {
    setTotalDuration(() => {
      let total = 0;
      for (let _class of classes) {
        total += _class.duration;
      }

      // Convert duration to hours
      let duration = moment.utc(total * 60 * 1000);
      return duration.format('HH [horas e] mm [minutos]');
    })
  }, [classes])

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const { state } = useLocation();
  const { module } = state || {};

  function handleAddClass() {
    navigate(`/modules/${module.id}/new-class`, { state: { module } })
  }

  useEffect(() => {
    async function getClasses() {
      await get_module_classes(module.id);
    }
    getClasses();
  }, [])

  return (
    <CoverBox>
      <Topbar>
        <Button
          text='Nova Aula'
          onClick={handleAddClass}
          outline
          pr={30}
          pl={30}
        />
      </Topbar>
      <ContentBox>
        <CustomRow>
          <Col prMD={20} alignItems='flex-start'>
            <Typography.Small align='flex-start'>
              MÓDULO
            </Typography.Small>
            <Typography.Title>
              {module.name}
            </Typography.Title>
            <Typography.Normal mb={10}>
              {module.description}
            </Typography.Normal>

            <IconWrapper>
              <IconWrapper>
                <MdOndemandVideo color={theme.secondary} size={35} />
                <IconLabel>{classes.length} Aulas</IconLabel>
              </IconWrapper>

              <IconWrapper>
                <MdAccessTime color={theme.secondary} size={35} />
                <IconLabel>{totalDutation}</IconLabel>
              </IconWrapper>
            </IconWrapper>

            <Button
              text='Adicionar à minha lista'
              height='60px'
              weight={600}
              width='100%'
              mb={10}
              mt={30}
              mr={30}
            />
          </Col>
          <Col plMD={20}>
            <Player moldure embedded='COz2xAFc3O8' />
          </Col>
        </CustomRow>
      </ContentBox>
      <ContentBox>
        <Row>
          <PlayIcon />
          <Col
            justifyContent='space-between'
            alignItems='flex-start'
            pl={10}
          >
            <CardTitle>
              Programação
            </CardTitle>
            <Typography.Normal>
              Assista as aulas disponíveis
            </Typography.Normal>
          </Col>
        </Row>
        <CardsWrapper>
          {
            !classes.length && (
              isAuthenticated ?
                <Button
                  text='Insira uma aula nesse módulo'
                  onClick={handleAddClass}
                  outline
                  pr={30}
                  pl={30}
                />
                :
                <Typography.Normal weight={600}>
                  Nenhuma aula cadastrada
                </Typography.Normal>
            )
          }
          {
            classes.map((_class, index) => (
              <CustomCol key={index}>
                <ClassCard _class={_class} module={module} index={index + 1} />
              </CustomCol>
            ))
          }
        </CardsWrapper>
      </ContentBox >
    </CoverBox >
  )
}

export default ListClasses;