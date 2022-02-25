import styled from 'styled-components';
import { hexToRGBA } from '../utils';

// Text bases
const BaseText = styled('p')`
  color: ${({ color, theme }) => color || theme.tertiary};
  text-align: ${({ align }) => align || 'initial'};
  max-width: ${({ width }) => width || '100%'};
  margin-bottom: ${({ mb }) => mb || 10}px;
  margin-right: ${({ mr }) => mr || 0}px;
  margin-left: ${({ ml }) => ml || 0}px;
  margin-top: ${({ mt }) => mt || 0}px;
  width: 100%;
`;

const Title = styled(BaseText)`
  font-family: 'Nunito';
  font-weight: bold;
  line-height: 32px;
  font-size: 28px;

  @media(min-width: 768px) {
    line-height: 56px;
    font-size: 48px;
    width: 100%;
  }
`;

const SubTitle = styled(BaseText)`
  font-family: 'Nunito';
  line-height: 28px;
  font-weight: 600;
  font-size: 32px;

  @media(min-width: 768px) {
    line-height: 32px;
    font-size: 18px;
  }
`;

const Normal = styled(BaseText)`
  font-weight: ${({ weight }) => weight || 300};
  font-family: 'Nunito';
  line-height: 24px;
  font-size: 18px;

  @media(min-width: 768px) {
    line-height: 21px;
  }
`;

const Small = styled(BaseText)`
  font-weight: ${({ weight }) => weight || 300};
  font-family: 'Nunito';
  line-height: 16px;
  font-size: 13px;

  @media(min-width: 768px) {
    font-weight: 400;
  }
`;

export const HighLight = styled('span')`
  color: ${({ theme, color }) => color || theme.secondary};
  font-weight: ${({ weight }) => weight || 800};
  transition: color, .3s;
  text-decoration: none;
  cursor: default;
  padding: 0 5px;

  &:hover {
    color: ${({ theme, color }) => hexToRGBA(color || theme.secondary, .7)};
  }
`;


export const Typography = {
  Title,
  SubTitle,
  Normal,
  Small
}