export default class ValidatorMaxInteger {
  constructor(max) {
    this.errorName = 'maxInteger';

    this.max = max;
  }

  isValid(value) {
    // No data : validation disable
    if(!value) return true;

    return value <= this.max;
  }
}
