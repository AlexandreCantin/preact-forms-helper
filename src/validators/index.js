import ValidatorRequired from "./validator-required";
import ValidatorBetween from "./validator-between";
import ValidatorPattern from "./validator-pattern";
import ValidatorMinInteger from "./validator-min-integer";
import ValidatorMaxInteger from "./validator-max-integer";
import ValidatorMinLength from "./validator-min-length";
import ValidatorMaxLength from "./validator-max-length";
import ValidatorDateBefore from "./validator-date-before";
import ValidatorDateAfter from "./validator-date-after";

import { toSimpleDate, getToday, getTomorrow } from '../helpers/date-helpers'

export default class Validators {
  static minInteger = (number) => new ValidatorMinInteger(number);
  static maxInteger = (number) => new ValidatorMaxInteger(number);
  static between = (min, max) => new ValidatorBetween(min, max);

  static minLength = (length) => new ValidatorMinLength(length);
  static maxLength = (length) => new ValidatorMaxLength(length);

  static required = () => new ValidatorRequired();

  static pattern = (pattern) => new ValidatorPattern('pattern', pattern);
  static email = () => new ValidatorPattern('email', /^([a-zA-Z0-9_\.-]+)@([\da-zA-Z0-9\.-]+)\.([a-z\.]{2,6})$/);
  static url = () => new ValidatorPattern('url', /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/);
  static alpha = () => new ValidatorPattern('alpha', /^[a-zA-Z]*$/);
  static alphaDash = () => new ValidatorPattern('alphaDash', /^[a-zA-Z_]*$/);
  static numeric = () => new ValidatorPattern('numeric', /^[0-9]*$/);

  static dateBefore = (date) => new ValidatorDateBefore('dateBefore', date);
  static dateAfter = (date) => new ValidatorDateAfter('dateAfter', date);
  static dateBeforeToday = () => new ValidatorDateBefore('dateBeforeToday', getToday());
  static dateAfterToday = () => new ValidatorDateAfter('dateAfterToday', getToday());
}