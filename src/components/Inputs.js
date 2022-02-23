import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import styled from 'styled-components';
import { hexToRGBA } from '../utils';


const InputWrapper = styled('div')`
  background-color: ${({ theme }) => theme.quaternary};
  border: 1px solid ${({ isInvalid, theme }) => isInvalid ? theme.error : 'transparent'};
  position: relative;
  margin-bottom: 15px;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  border-radius: 12px;
  transition: border .3s;
  
  &:hover {
    border: 1px solid ${({ isInvalid, theme }) => isInvalid ? theme.error : theme.secondary};
  }
`;

const CustomInput = styled('input')`
  background-color: transparent;
  color: ${({ theme }) => theme.tertiary};
  font-family: Nunito;
  font-weight: 400;
  line-height: 24px;
  padding: 0px: 10px;

  font-size: 16px;
  padding: 10px;
  border: none !important;
  width: 100%;
  height: 40px;

  &:focus {
    box-shadow: none;
    outline: none;
  }

  &::placeholder {
    color: 1px solid ${({ theme }) => hexToRGBA(theme.tertiary, .5)};
  }
`;


const ErrorWrapper = styled('div')`
  background-color: ${({ theme }) => theme.error};
  border-radius: 3px 3px 3px 0px;
  font-family: Nunito;
  position: absolute;
  padding: 3px 10px;
  font-weight: 400;
  font-size: 12px;
  color: #fff;
  left: -1px;
  top: -12px;
`;


function Input({ prependIcon, appendIcon, name, ...rest }) {

  const inputRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,

      getValue: ref => {
        return ref.current.value
      },

      setValue: (ref, value) => {
        ref.current.value = value
      },

      clearValue: ref => {
        ref.current.value = ''
      },
    })

  }, [fieldName, registerField])

  return (
    <InputWrapper isInvalid={!!error}>
      {error && (
        <ErrorWrapper>
          {error}
        </ErrorWrapper>
      )}
      {prependIcon && (
        prependIcon
      )}
      <CustomInput
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {appendIcon && (
        appendIcon
      )}
    </InputWrapper>

  )
}

export default Input;