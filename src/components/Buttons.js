import { TailSpin } from 'react-loader-spinner';
import { BsMoon, BsSun } from 'react-icons/bs';
import { IconWrapper } from './ModuleCard';
import styled from 'styled-components';
import { useTheme } from '../hooks';
import { hexToRGBA } from '../utils';


export const ButtonWrapper = styled('button')`
  background: ${({ color, theme, outline }) => outline ? 'transparent' : color || theme.secondary};
  color: ${({ theme, outline }) => outline ? theme.secondary : theme.quaternary};
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: ${({ rounded }) => rounded || 10}px;
  transition: background-color, color, .3s;
  height: ${({ height }) => height || '48px'};
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
    border: 1px solid ${({ theme }) => hexToRGBA(theme.secondary, .8)};
    background: ${({ theme }) => hexToRGBA(theme.secondary, .8)};
    color: ${({ theme }) => theme.quaternary};
  };

  &:active {
    border: 1px solid ${({ theme }) => hexToRGBA(theme.secondary, .5)};
    background: ${({ theme }) => hexToRGBA(theme.secondary, .5)};
    color: ${({ theme }) => theme.quaternary};
  }
`;

export const ButtonText = styled('p')`
  font-weight: ${({ weight }) => weight || 600};
  font-size: ${({ fs }) => fs || 16}px;
  font-family: Nunito;
  margin-right: 5px;
  cursor: default;
  display: flex;
`;


export const Button = ({
  loading,
  outline,
  weight,
  width,
  type,
  text,
  fs,
  to,
  ...rest
}) => {

  const { theme } = useTheme();

  return (
    <ButtonWrapper width={width} outline={outline} {...rest}>
      <ButtonText weight={weight} fs={fs}>
        {text}
      </ButtonText>
      {loading && (
        <TailSpin
          color={theme.quaternary}
          ariaLabel='loading'
          height="16"
          width="16"
        />
      )}
    </ButtonWrapper>
  )
}

export const ThemeToggle = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

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