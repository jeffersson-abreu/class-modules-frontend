import { isFormValid, isStringEmpty } from '../utils';
import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useTheme, useAuth } from '../hooks';
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

  passwordConfirm: yup.string()
    .oneOf([yup.ref('password'), null], 'As senhas não batem')
    .required('Senha obrigatória'),
})

const Register = () => {

  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [visible, setVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { register } = useAuth();
  const { theme } = useTheme();
  const formRef = useRef(null);

  function changeVisibility() {
    setVisible(prevState => !prevState);
  }

  function changeVisibilityConfirm() {
    setVisibleConfirm(prevState => !prevState);
  }

  async function handleSubmit(data) {
    setLoading(true);
    if (await isFormValid(data, formRef, schema)) {
      register(data.username, data.password)
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
            <Typography.Title align='center'>Crie sua conta</Typography.Title>
            <Typography.Small align='start'>ACESSO ADMINISTRATIVO</Typography.Small>
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
                placeholder='Sua senha'
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
              <Input
                prependIcon={<AiOutlineLock size={22} color={theme.secondary} />}
                onFocus={() => formRef.current.setFieldError('passwordConfirm', null)}
                type={visibleConfirm ? 'text' : 'password'}
                placeholder='Repita a senha'
                name='passwordConfirm'
                appendIcon={
                  visibleConfirm ?
                    <AiOutlineEye
                      onClick={changeVisibilityConfirm}
                      color={theme.secondary}
                      size={22}
                    />
                    :
                    <AiOutlineEyeInvisible
                      onClick={changeVisibilityConfirm}
                      color={theme.secondary}
                      size={22}
                    />
                }
              />
              <Button height={58} type='submit' loading={loading} text='Entrar' weight={700} />
              <Typography.Small align='center' mt={20}>
                Já possui uma conta ? <HighLight to='/login'>Entre agora</HighLight>
              </Typography.Small>
            </FormWrapper>
          </Box>
        </Col>
      </Row>
    </CoverBox>
  )
}

export default Register;