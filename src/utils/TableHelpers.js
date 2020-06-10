export const createCol = ({ title, key, render, dataIndex }) => ({
  title: title || key.toUpperCase(),
  dataIndex: dataIndex || key,
  key,
  render
})
