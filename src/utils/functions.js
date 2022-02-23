import * as yup from 'yup';

export function hexToRGBA(hex, opacity) {
  let c;

  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ', ' + opacity + ')';
  }
  throw new Error('Bad Hex');
}


// Validate a form based on a given schema (Yup schema)
export async function isFormValid(data, formRef, schema) {
  try {
    // Validate the form and prevent yup returns
    //in the first invalid field found
    await schema.validate(data, {
      abortEarly: false
    })

    return true;
  } catch (err) {
    if (err instanceof yup.ValidationError) {

      // For each field error in inner we add the
      // path and the respective message to it
      const messages = {};
      err.inner.forEach(error => {
        messages[error.path] = error.message;
      });
      formRef.current.setErrors(messages);
    }
    return false;
  }
}


export const isStringEmpty = (str) => {
  return str !== null && str !== '' && str !== undefined
}