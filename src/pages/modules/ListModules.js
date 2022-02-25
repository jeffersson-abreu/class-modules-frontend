import { useModules, useAuth } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import React from 'react';

import {
  ContentBox,
  ModuleCard,
  Typography,
  HighLight,
  CoverBox,
  Button,
  Topbar,
} from '../../components';

const Box = styled('div')`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  max-width: 700px;
  display: flex;
  width: 100%;
  gap: 20px;

  @media(min-width: 768px) {
    display: block;
    width: 80%;
  }

  @media(min-width: 1280px) {
    width: 60%;
  }
`;

const Col = styled('div')`
  display inline-block;
  max-width: 400px;
  width: 100%;

  @media(min-width: 768px) {
    display: inline-block;
    width: 50%;
  }
`;


const ListModules = () => {

  const { isAuthenticated } = useAuth();
  const { modules } = useModules();
  const navigate = useNavigate();

  return (
    <CoverBox>
      <Topbar>
        <Button
          text='Novo módulo'
          onClick={() => navigate('/modules/new')}
          outline
          pr={30}
          pl={30}
        />
      </Topbar>
      <ContentBox>
        <Box>
          <Typography.Small align='flex-start'>
            MÓDULOS
          </Typography.Small>
          <Typography.Title>
            Estes são todos os módulos disponíveis na aplicação
          </Typography.Title>
          <Typography.Normal mb={30}>
            Nossos módulos são organizados em ordem alfabética.
            Aqui, além de verificar os módulos você pode verificar
            todas as aulas relacionadas aos módulos.
            <HighLight color='#3bd42d' onClick={() => navigate('/login')}>
              Acesse a área administrativa
            </HighLight>
            para inserir aulas ou módulos.
          </Typography.Normal>
        </Box>
        <Box>
          {
            !modules.length && (
              isAuthenticated ?
                <Button
                  text='Insira um módulo'
                  onClick={() => navigate(`/modules/new`)}
                  outline
                  pr={30}
                  pl={30}
                />
                :
                <Typography.Normal weight={600}>
                  Nenhum módulo encontrado.
                </Typography.Normal>
            )
          }
          {
            modules.map((module, index) => (
              <Col>
                <ModuleCard key={index} module={module} />
              </Col>
            ))
          }
        </Box>

      </ContentBox>
    </CoverBox >

  )
}

export default ListModules;