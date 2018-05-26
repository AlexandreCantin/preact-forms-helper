export default class ValidatorMaxLength {
  constructor(length) {
    this.errorName = 'maxLength';
    this.length = length;
  }

  isValid(value) {
    // No data : validation disable
    if(!value) return true;

    if(Array.isArray(value)) return value.length <= this.length ;

    return value.length <= this.length;
  }
}
