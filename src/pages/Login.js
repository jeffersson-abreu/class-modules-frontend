import { useModules, useTheme, useAuth } from '../hooks';
import { isFormValid, isStringEmpty } from '../utils';
import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';

import {
  ToggleWrapper,
  FormWrapper,
  ThemeToggle,
  Typography,
  HighLight,
  CoverBox,
  Button,
  Input,
  Line,
  Col,
  Row,
  Box
} from '../components';

import {
  AiOutlineEyeInvisible,
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineEye
} from 'react-icons/ai';


// Validation schema
const schema = yup.object().shape({
  username: yup.string()
    .test('is-empty', 'Usuário obrigatório', isStringEmpty)
    .required('Usuário obrigatório'),

  password: yup.string()
    .test('is-empty', 'Senha obrigatória', isStringEmpty)
    .required('Senha obrigatória'),
})



const Login = () => {

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { modules } = useModules();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const formRef = useRef(null);
  const { login } = useAuth();

  function changeVisibility() {
    setVisible(prevState => !prevState);
  }

  async function handleSubmit(data) {
    setLoading(true);
    if (await isFormValid(data, formRef, schema)) {
      login(data.username, data.password)
        .then(() => {
          setLoading(false);
          navigate('/');
        })
    }
    setLoading(false);
  }

  return (
    <CoverBox>
      <Row>
        <Col display='none' justifyContent='center' alignItems='center'>
          <div>
            <Typography.Title align='center'>Fazer login</Typography.Title>
            <Typography.Small align='start'>ÁREA ADMINISTRATIVA</Typography.Small>
            <Line />
          </div>
        </Col>
        <Col>
          <Box>
            <ToggleWrapper>
              <ThemeToggle />
            </ToggleWrapper>
            <FormWrapper ref={formRef} onSubmit={handleSubmit}>
              <Input
                prependIcon={<AiOutlineUser size={22} color={theme.secondary} />}
                onFocus={() => formRef.current.setFieldError('username', null)}
                placeholder='Nome de usuário'
                name='username'
                type='text'
              />

              <Input
                prependIcon={<AiOutlineLock size={22} color={theme.secondary} />}
                onFocus={() => formRef.current.setFieldError('password', null)}
                type={visible ? 'text' : 'password'}
                placeholder='Senha'
                name='password'
                appendIcon={
                  visible ?
                    <AiOutlineEye
                      onClick={changeVisibility}
                      color={theme.secondary}
                      size={22}
                    />
                    :
                    <AiOutlineEyeInvisible
                      onClick={changeVisibility}
                      color={theme.secondary}
                      size={22}
                    />
                }
              />
              <Button height={58} type='submit' loading={loading} text='Entrar' weight={700} />
              <Typography.Small align='center' mt={20}>
                Ainda não tem uma conta ? <HighLight to='/register'>Cadastre-se</HighLight>
              </Typography.Small>
            </FormWrapper>
          </Box>
        </Col>
      </Row>
    </CoverBox>
  )
}

export default Login;