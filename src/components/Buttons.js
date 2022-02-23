import { TailSpin } from 'react-loader-spinner';
import { BsMoon, BsSun } from 'react-icons/bs';
import styled from 'styled-components';
import { IconWrapper } from './Cards';
import { useTheme } from '../hooks';


export const ButtonWrapper = styled('button')`
  background: ${({ color, theme, outline }) => outline ? 'transparent' : color || theme.secondary};
  color: ${({ theme, outline }) => outline ? theme.secondary : theme.quaternary};
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: ${({ rounded }) => rounded || 10}px;
  transition: background-color, color, .3s;
  height: ${({ height }) => height || 48}px;
  width: ${({ width }) => width || 'auto'};
  text-decoration: none;
  justify-content: center;
  align-items: center;
  padding: 0px 25px;
  display: flex;

  padding-bottom: ${({ pb }) => pb || 0}px;
  padding-right: ${({ pr }) => pr || 10}px;
  padding-left: ${({ pl }) => pl || 10}px;
  padding-top: ${({ pt }) => pt || 0}px;

  margin-bottom: ${({ mb }) => mb || 0}px;
  margin-right: ${({ mr }) => mr || 0}px;
  margin-left: ${({ ml }) => ml || 0}px;
  margin-top: ${({ mt }) => mt || 0}px;

  &:hover {
    background: ${({ theme, outline }) => outline ? theme.secondary : 'transparent'};
    color: ${({ theme, outline }) => outline ? theme.quaternary : theme.secondary};
  };

  &:active {
    background: ${({ theme, outline }) => outline ? theme.secondary : 'transparent'};
    color: ${({ theme, outline }) => outline ? theme.quaternary : theme.secondary};
  }
`;

export const ButtonText = styled('p')`
  font-weight: ${({ weight }) => weight || 600};
  font-size: ${({ fs }) => fs || 16}px;
  font-family: Nunito;
  cursor: default;
  display: flex;
`;


export const Button = ({ loading, type, text, weight, outline, fs, to, ...rest }) => {

  return (
    <ButtonWrapper outline={outline} {...rest}>
      <ButtonText weight={weight} fs={fs}>
        {text}
      </ButtonText>
      {loading && (
        <TailSpin
          style={{ marginLeft: 10 }}
          ariaLabel='loading'
          color='#777777'
          height="16"
          width="16"
        />
      )}
    </ButtonWrapper>
  )
}

export const ThemeToggle = () => {
  const { isDarkTheme, theme, toggleTheme } = useTheme();

  return (
    <IconWrapper>
      {
        isDarkTheme ?
          <BsSun onClick={toggleTheme} size={25} />
          :
          <BsMoon onClick={toggleTheme} size={23} />
      }

    </IconWrapper>

  )
}