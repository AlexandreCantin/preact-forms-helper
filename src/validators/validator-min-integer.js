export default class ValidatorMinInteger {
  constructor(min) {
    this.errorName = 'minInteger';
    this.min = min;
  }

  isValid(value) {
    // No data : validation disable
    if(!value) return true;

    return this.min <= value;
  }
}
