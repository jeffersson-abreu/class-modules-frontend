import { MdDriveFileRenameOutline, MdOutlineDescription, MdAccessTime } from 'react-icons/md';
import { isFormValid, isStringEmpty, sleep } from '../../utils';
import { useClasses, useModules, useTheme } from '../../hooks';
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineCalendar } from 'react-icons/ai';
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import moment from 'moment';
import * as yup from 'yup';

import {
  CenteredContent,
  ToggleWrapper,
  FormWrapper,
  ThemeToggle,
  HighLight,
  Typography,
  CoverBox,
  TextArea,
  Button,
  Input,
  Box
} from '../../components';


// Validation schema
const schema = yup.object().shape({
  name: yup.string()
    .test('is-empty', 'Insira o nome da aula', isStringEmpty)
    .max(255, 'Maxímo 255 caracteres')
    .required('Insira o nome da aula'),

  description: yup.string()
    .test('is-empty', 'Insira a descrição da aula', isStringEmpty)
    .max(2048, 'Maxímo 2048 caracteres')
    .required('Insira a descrição da aula'),

  duration: yup.string()
    .test('is-empty', 'Insira a duração da aula', isStringEmpty)
    .required('Insira a duração da aula'),

  date: yup.string()
    .test('is-empty', 'Insira a data da aula', isStringEmpty)
    .required('Insira a data da aula'),

  module: yup.string()
    .required('Insira a o módulo da aula'),
})


const FormRow = styled('div')`
  display: block;

  @media(min-width: 768px) {
    display: flex;
    gap: 15px;
  }
`;


const AddEditClasses = () => {
  const [loading, setLoading] = useState(false);

  const { create_class, update_class } = useClasses();
  const { get_modules } = useModules();

  const navigate = useNavigate();
  const { theme } = useTheme();
  const formRef = useRef(null);

  const { state } = useLocation();

  const { module, _class } = state;

  // Build initial data to auto fill fields
  let initialData = {};

  if (_class) {
    let date = moment(_class.date);
    initialData = Object.assign(_class, {
      date: date.format('YYYY-MM-DD'),
      module: module ? module.id : ''
    });
  } else {
    initialData = Object.assign({}, {
      date: moment().format('YYYY-MM-DD'),
      module: module ? module.id : ''
    });
  }

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

      let _data = Object.assign(data, { date: moment(data.date).add(12, 'hour') });

      if (!!_class) {
        // Editing
        if (await update_class(module.id, _class.id, _data)) {
          showToast('Atualizado com sucesso')
          await get_modules();
          setLoading(false);
          navigate(-1);
        }
      } else {
        // Creating
        if (await create_class(module.id, _data)) {
          showToast('Criado com sucesso')
          await get_modules();
          setLoading(false);
          navigate(-1);
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
            initialData={initialData}
            ref={formRef}
          >
            <Input
              name='module'
              type='hidden'
            />
            <Input
              prependIcon={<MdDriveFileRenameOutline size={22} color={theme.secondary} />}
              onFocus={() => formRef.current.setFieldError('name', null)}
              placeholder='Nome da aula'
              name='name'
              type='text'
            />

            <FormRow>
              <Input
                prependIcon={<AiOutlineCalendar size={22} color={theme.secondary} />}
                onFocus={() => formRef.current.setFieldError('date', null)}
                width='200px'
                name='date'
                type='date'
              />

              <Input
                prependIcon={<MdAccessTime size={22} color={theme.secondary} />}
                onFocus={() => formRef.current.setFieldError('duration', null)}
                placeholder='Duração da aula (min)'
                name='duration'
                width='200px'
                type='text'
              />
            </FormRow>

            <TextArea
              prependIcon={<MdOutlineDescription size={22} color={theme.secondary} />}
              onFocus={() => formRef.current.setFieldError('description', null)}
              placeholder='Descrição da aula'
              name='description'
              rows={2}
            />
            <Button
              height={58}
              type='submit'
              loading={loading}
              text={`${_class ? 'Atualizar' : 'Adicionar'} aula`}
              weight={700}
            />
            <Typography.Small mt={15} align='center'>
              <HighLight onClick={() => navigate(-1)} >
                Cancelar
              </HighLight>
            </Typography.Small>
          </FormWrapper>
        </Box>
      </CenteredContent>
    </CoverBox >
  )
}

export default AddEditClasses;