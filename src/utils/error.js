const errorCodes = {
  EMAIL_NOT_FOUND: 'Користувач з таким email не знайдений',
  INVALID_PASSWORD: 'Невірний пароль',
  EMAIL_EXISTS: 'Користувач з таким email вже існує',
  auth: 'Будь ласка увійдіть в систему'
}

export function error(code) {
  return errorCodes[code] ? errorCodes[code] : 'Невідома помилка'
}