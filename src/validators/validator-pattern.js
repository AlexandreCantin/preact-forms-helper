export default class ValidatorPattern {
  constructor(name, regexPattern) {
    this.errorName = name;
    this.regex = new RegExp(regexPattern);
  }

  isValid(value) {
    // No data : validation disable
    if(!value) return true;

    return this.regex.test(value);
  }
}