import {
  ContentBox,
  ModuleCard,
  Typography,
  HighLight,
  CoverBox,
  Button,
  Topbar,
} from '../components';

import styled from 'styled-components';
import { useModules } from '../hooks';
import { hexToRGBA } from '../utils';
import React from 'react';


const Box = styled('div')`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media(min-width: 768px) {
    width: 80%;
    display: block;
  }

  @media(min-width: 1280px) {
    width: 70%;
  }

  @media(min-width: 1366px) {
    width: 50%;
  }
`;



const Column = styled('div')`
  display inline-block;
  max-width: 330px;
  width: 100%;

  @media(min-width: 768px) {
    width: 50%;
  }
`;


const Modules = () => {

  const { modules } = useModules();

  return (
    <CoverBox>
      <Topbar>
        <Button
          text='Novo módulo'
          onClick={() => { }}
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
            <HighLight color='#3bd42d' to="/login">
              Acesse a área administrativa
            </HighLight>
            para inserir aulas ou módulos.
          </Typography.Normal>
        </Box>
        <Box>
          {
            modules.map((module, index) => (
              <Column key={index}>
                <ModuleCard {...module} />
              </Column>
            ))
          }
        </Box>
      </ContentBox>
    </CoverBox>

  )
}

export default Modules;