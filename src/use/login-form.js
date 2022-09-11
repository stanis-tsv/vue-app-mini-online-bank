import {computed, watch} from 'vue'
import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export function useLoginForm() {
  const store = useStore()
  const router = useRouter()
  const {handleSubmit, isSubmitting, submitCount} = useForm()

  const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
    'email',
    yup
      .string()
      .trim()
      .required('Введіть email')
      .email('Введіть коректний email')
  )

  const minLength = 6

  const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
    'password',
    yup
      .string()
      .trim()
      .required('Введіть пароль')
      .min(minLength, `Пароль не може бути менше ${minLength} символів`)
  )

  const isTooManyAttempts = computed(() => submitCount.value >= 3)
  watch(isTooManyAttempts, val => {
    if (val) {
      setTimeout(() => submitCount.value = 0, 5000)
    }
  })
  
  const onSubmit = handleSubmit(async values => {
    try {
      await store.dispatch('auth/login', values)
      router.push('/')
    } catch (e) {}
  })
  const regSubmit = handleSubmit(async values => {
    try {
      await store.dispatch('auth/register', values)
      router.push('/')
    } catch (e) {}
  })

  return {
    email, eError, eBlur, password, pError, pBlur, onSubmit, regSubmit, isSubmitting, isTooManyAttempts
  }
}