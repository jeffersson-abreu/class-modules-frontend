import { MdDriveFileRenameOutline, MdOutlineDescription } from 'react-icons/md';
import { isFormValid, isStringEmpty, sleep } from '../../utils';
import { useNavigate, useLocation } from "react-router-dom";
import { useModules, useTheme } from '../../hooks';
import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import {
  CenteredContent,
  ToggleWrapper,
  FormWrapper,
  ThemeToggle,
  Typography,
  HighLight,
  CoverBox,
  TextArea,
  Button,
  Input,
  Box
} from '../../components';


// Validation schema
const schema = yup.object().shape({
  name: yup.string()
    .test('is-empty', 'Insira o nome do módulo', isStringEmpty)
    .max(255, 'Maxímo 255 caracteres')
    .required('Insira o nome do módulo'),

  description: yup.string()
    .test('is-empty', 'Insira a descrição do módulo', isStringEmpty)
    .max(2048, 'Maxímo 2048 caracteres')
    .required('Insira a descrição do módulo'),
})


const AddEditModules = () => {
  const [loading, setLoading] = useState(false);

  const {
    create_module,
    update_module
  } = useModules();

  const navigate = useNavigate();
  const { theme } = useTheme();
  const formRef = useRef(null);

  const { state } = useLocation();
  const { module } = state || {};

  function showToast(message) {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  async function handleSubmit(data) {
    if (await isFormValid(data, formRef, schema)) {

      setLoading(true);

      // Simulate a delay network
      await sleep(1000);

      if (!!module) {
        if (await update_module(module.id, data)) {
          showToast('Atualizado com sucesso')
          setLoading(false);
          navigate('/');
        }
      } else {
        if (await create_module(data)) {
          showToast('Criado com sucesso')
          setLoading(false);
          navigate('/');
        }
      }
    }
    setLoading(false);
  }

  return (
    <CoverBox>
      <CenteredContent>
        <Box>
          <ToggleWrapper>
            <ThemeToggle />
          </ToggleWrapper>
          <FormWrapper
            onSubmit={handleSubmit}
            initialData={module}
            ref={formRef}
          >
            <Input
              prependIcon={<MdDriveFileRenameOutline size={22} color={theme.secondary} />}
              onFocus={() => formRef.current.setFieldError('name', null)}
              placeholder='Nome do módulo'
              name='name'
              type='text'
            />
            <TextArea
              prependIcon={<MdOutlineDescription size={22} color={theme.secondary} />}
              onFocus={() => formRef.current.setFieldError('description', null)}
              placeholder='Descrição do módulo'
              name='description'
              cols={40}
              rows={2}
            />
            <Button
              height={58}
              type='submit'
              loading={loading}
              text={`${module ? 'Atualizar' : 'Adicionar'} módulo`}
              weight={700}
            />
            <Typography.Small mt={15} align='center'>
              <HighLight onClick={() => navigate(-1)}>
                Cancelar
              </HighLight>
            </Typography.Small>
          </FormWrapper>
        </Box>
      </CenteredContent>
    </CoverBox >
  )
}

export default AddEditModules;