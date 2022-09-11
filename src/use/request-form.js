import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

export function useRequestForm(fn) {
  const {isSubmitting, handleSubmit} = useForm({
    initialValues: {
      status: 'active'
    }
  })

  const {value: pib, errorMessage: pibError, handleBlur: pibBlur} = useField(
    'pib',
    yup
      .string()
      .trim()
      .required('Введіть ПІБ клієнта')
  )
  const {value: phone, errorMessage: pError, handleBlur: pBlur} = useField(
    'phone',
    yup
      .string()
      .trim()
      .required('Введіть телефон')
  )
  const {value: amount, errorMessage: aError, handleBlur: aBlur} = useField(
    'amount',
    yup
      .number()
      .required('Введіть суму')
      .min(0, 'Сума не може бути менше 0')
  )
  const {value: status} = useField('status')

  const onSubmit = handleSubmit(fn)

  return {
    isSubmitting, onSubmit, pib, pibError, pibBlur, phone, pError, pBlur, amount, aError, aBlur, status
  }
}