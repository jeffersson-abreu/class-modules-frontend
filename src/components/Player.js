import styled from 'styled-components';
import { useTheme } from '../hooks';
import React from 'react';


const PlayerWrapper = styled('div')`
  background: rgba(0, 0, 0, 0) url(${({ image }) => image || ''}) no-repeat scroll 0% 0% / cover;
  padding-top: 36.25%;
  position: relative;
  padding-top: 63%;
  width: 100%;

  @media(max-width: 768px){ 
    margin-bottom: 30px;
  }
`;

const PlayerContainer = styled('div')`
  width: 93.5% !important;
  height: 84% !important;
  position: absolute;
  inset: 4% 1.3% 0px 0px;
  margin: auto;
  overflow: hidden;
  border: 1px solid rgb(161, 145, 255);
`;

const Video = styled('iframe')`
height: 100%;
width: 100%;
`;

const Player = ({ moldure, embedded }) => {

  const { isDarkTheme } = useTheme();

  return (
    <PlayerWrapper
      image={
        moldure ?
          isDarkTheme ?
            '/screen-dark.svg'
            :
            '/screen-light.svg'
          : ''
      }>
      <PlayerContainer>
        <Video
          src={`https://www.youtube.com/embed/${embedded}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="Embedded youtube"
          allowFullScreen
          frameBorder="0"
        />
      </PlayerContainer>
    </PlayerWrapper>
  )
}

export default Player;