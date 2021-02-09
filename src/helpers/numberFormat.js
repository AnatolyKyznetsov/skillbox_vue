export default function numberFormat(value) {
  if ((typeof value) !== 'number' || Number.isNaN(value)) {
    return ' ';
  }
  return new Intl.NumberFormat().format(value);
}
