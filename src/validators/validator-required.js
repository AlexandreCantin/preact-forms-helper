export default class ValidatorRequired {
  constructor() {
    this.errorName = 'required';
  }

  isValid(value) {
    if(typeof value === 'number') return value !== '';

    if(Array.isArray(value) && value) return value.length > 0;
    return value ? true : false;
  }
}
