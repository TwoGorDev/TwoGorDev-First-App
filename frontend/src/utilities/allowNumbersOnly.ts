const isNumbersOnly = (value : string) => {
  if (/^[0-9\b]+$/.test(value) || value === '') {
    return true
  }
    return false
}

export default isNumbersOnly;