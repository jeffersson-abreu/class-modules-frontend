import styled from 'styled-components';
import { hexToRGBA } from '../utils';
import { Link } from "react-router-dom";

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
  font-family: 'Nunito';
  line-height: 24px;
  font-weight: 300;
  font-size: 18px;

  @media(min-width: 768px) {
    line-height: 21px;
  }
`;

const Small = styled(BaseText)`
  font-family: 'Nunito';
  line-height: 16px;
  font-weight: 300;
  font-size: 13px;

  @media(min-width: 768px) {
    font-weight: 400;
  }
`;

export const HighLight = styled(Link)`
  color: ${({ theme, color }) => color || theme.secondary};
  transition: color, .3s;
  text-decoration: none;
  font-weight: 800;
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