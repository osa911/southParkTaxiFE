export const createCol = ({ title, key, render, dataIndex, width }) => ({
  title: title || key.toUpperCase(),
  dataIndex: dataIndex || key,
  key,
  width,
  render,
})
