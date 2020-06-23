export const requiredField = (fieldName) => ({
  required: true,
  message: `Заполните поле ${fieldName}!`,
})
