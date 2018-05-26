export default class ValidatorBetween {
  constructor(min, max) {
    this.errorName = 'between';

    this.min = min;
    this.max = max;
  }

  isValid(value) {
    // No data : validation disable
    if(!value) return true;

    return this.min <= value && value <= this.max;
  }
}
