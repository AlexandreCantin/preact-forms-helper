import Validators from "../src/validators";
import DateBefore from "../src/validators/validator-date-before";
import DateAfter from "../src/validators/validator-date-after";
import Form from "../src/form";


// Required
test('Required ==> Value = ; Should return false', () => {
  expect(Validators.required().isValid()).toBeFalsy();
});
test('Required ==> Value = 0; Should return true', () => {
  expect(Validators.required().isValid(0)).toBeTruthy();
});
test('Required ==> Value = "pouac"; Should return true', () => {
  expect(Validators.required().isValid("pouac")).toBeTruthy();
});
test('Required ==> Value = ""; Should return false', () => {
  expect(Validators.required().isValid("")).toBeFalsy();
});
test('Required ==> Value = null; Should return false', () => {
  expect(Validators.required().isValid(null)).toBeFalsy();
});
test('Required ==> Value = undefined; Should return false', () => {
  expect(Validators.required().isValid(undefined)).toBeFalsy();
});
test('Required ==> Value = []; Should return false', () => {
  expect(Validators.required().isValid([])).toBeFalsy();
});
test('Required ==> Value = ["pou"]; Should return true', () => {
  expect(Validators.required().isValid(["pou"])).toBeTruthy();
});
test('Required ==> Value = ["pou","ac"]; Should return true', () => {
  expect(Validators.required().isValid(["pou","ac"])).toBeTruthy();
});

// MinInteger
test('MinInteger ==> Value = 1; Min = 2; Should return false', () => {
  expect(Validators.minInteger(2).isValid(1)).toBeFalsy();
});
test('MinInteger ==> Value = 2; Min = 2; Should return true', () => {
  let v = Validators.minInteger(2);
  expect(Validators.minInteger(2).isValid(2)).toBeTruthy();
});
test('MinInteger ==> Value = 4; Min = 2; Should return true', () => {
  let v = Validators.minInteger(2);
  expect(Validators.minInteger(2).isValid(4)).toBeTruthy();
});

// MaxInteger
test('MaxInteger ==> Value = 3; Max = 2; Should return false', () => {
  let v = Validators.maxInteger(2);
  expect(Validators.maxInteger(2).isValid(3)).toBeFalsy();
});
test('MaxInteger ==> Value = 1; Max = 2; Should return true', () => {
  let v = Validators.maxInteger(2);
  expect(Validators.maxInteger(2).isValid(1)).toBeTruthy();
});
test('MaxInteger ==> Value = 2; Max = 2; Should return true', () => {
  let v = Validators.maxInteger(2);
  expect(Validators.maxInteger(2).isValid(2)).toBeTruthy();
});

// Between
test('Between    ==> Value = 1; Between = [2,5]; Should return false', () => {
  expect(Validators.between(2,5).isValid(1)).toBeFalsy();
});
test('Between    ==> Value = 2; Between = [2,5]; Should return true', () => {
  expect(Validators.between(2,5).isValid(2)).toBeTruthy();
});
test('Between    ==> Value = 3; Between = [2,5]; Should return true', () => {
  expect(Validators.between(2,5).isValid(3)).toBeTruthy();
});
test('Between    ==> Value = 5; Between = [2,5]; Should return true', () => {
  expect(Validators.between(2,5).isValid(5)).toBeTruthy();
});
test('Between    ==> Value = 6; Between = [2,5]; Should return false', () => {
  expect(Validators.between(2,5).isValid(6)).toBeFalsy();
});

// MinLength
test('MinLength  ==> Value = "b"; MinLength = 2; Should return false', () => {
  expect(Validators.minLength(2).isValid("b")).toBeFalsy();
});
test('MinLength  ==> Value = "ab"; MinLength = 2; Should return true', () => {
  expect(Validators.minLength(2).isValid("ab")).toBeTruthy();
});
test('MinLength  ==> Value = "abcd"; MinLength = 2; Should return true', () => {
  expect(Validators.minLength(2).isValid("abcd")).toBeTruthy();
});
test('MinLength  ==> Value = ["a"]; MinLength = 2; Should return false', () => {
  expect(Validators.minLength(2).isValid(["a"])).toBeFalsy();
});
test('MinLength  ==> Value = ["a","b"]; MinLength = 2; Should return true', () => {
  expect(Validators.minLength(2).isValid(["a","b"])).toBeTruthy();
});
test('MinLength  ==> Value = ["a","b","c"]; MinLength = 2; Should return true', () => {
  expect(Validators.minLength(2).isValid(["a","b","c"])).toBeTruthy();
});

// MaxLength
test('MaxLength  ==> Value = "01"; MaxLength = 10; Should return true', () => {
  expect(Validators.maxLength(10).isValid("01")).toBeTruthy();
});
test('MaxLength  ==> Value = "0123456789"; MaxLength = 10; Should return true', () => {
  expect(Validators.maxLength(10).isValid("0123456789")).toBeTruthy();
});
test('MaxLength  ==> Value = "0123456789012345"; MaxLength = 10; Should return false', () => {
  expect(Validators.maxLength(10).isValid("0123456789012345")).toBeFalsy();
});
test('MinLength  ==> Value = ["a"]; MaxLength = 2; Should return false', () => {
  expect(Validators.maxLength(2).isValid(["a"])).toBeTruthy();
});
test('MinLength  ==> Value = ["a","b"]; MaxLength = 2; Should return true', () => {
  expect(Validators.maxLength(2).isValid(["a","b"])).toBeTruthy();
});
test('MinLength  ==> Value = ["a","b","c"]; MaxLength = 2; Should return true', () => {
  expect(Validators.maxLength(2).isValid(["a","b","c"])).toBeFalsy();
});


// Pattern
test('Pattern  ==> Value = 44620; Pattern = /^[0-9]{5}$/; Should return true', () => {
  expect(Validators.pattern(/^[0-9]{5}$/).isValid(44620)).toBeTruthy();
});
test('Pattern  ==> Value = "44620"; Pattern = /^[0-9]{5}$/; Should return true', () => {
  expect(Validators.pattern(/^[0-9]{5}$/).isValid("44620")).toBeTruthy();
});
test('Pattern  ==> Value = 4462; Pattern = /^[0-9]{5}$/; Should return false', () => {
  expect(Validators.pattern(/^[0-9]{5}$/).isValid(4462)).toBeFalsy();
});
test('Pattern  ==> Value = "4462"; Pattern = /^[0-9]{5}$/; Should return false', () => {
  expect(Validators.pattern(/^[0-9]{5}$/).isValid("4462")).toBeFalsy();
});
test('Pattern  ==> Value = 446200; Pattern = /^[0-9]{5}$/; Should return false', () => {
  expect(Validators.pattern(/^[0-9]{5}$/).isValid(446200)).toBeFalsy();
});
test('Pattern  ==> Value = "446200"; Pattern = /^[0-9]{5}$/; Should return false', () => {
  expect(Validators.pattern(/^[0-9]{5}$/).isValid("446200")).toBeFalsy();
});
test('Pattern  ==> Value = "pouac"; Pattern = /^[0-9]{5}$/; Should return false', () => {
  expect(Validators.pattern(/^[0-9]{5}$/).isValid("pouac")).toBeFalsy();
});


// Email
test('Email  ==> Value = "pouac"; Should return false', () => {
  expect(Validators.email().isValid("pouac")).toBeFalsy();
});
test('Email  ==> Value = example@mail.com; Should return true', () => {
  expect(Validators.email().isValid("example@mail.com")).toBeTruthy();
});
test('Email  ==> Value = example@mail; Should return false', () => {
  expect(Validators.email().isValid("example@mail")).toBeFalsy();
});
test('Email  ==> Value = @mail; Should return false', () => {
  expect(Validators.email().isValid("@mail")).toBeFalsy();
});
test('Email  ==> Value = mail@.com; Should return false', () => {
  expect(Validators.email().isValid("mail@.com")).toBeFalsy();
});


// URL
test('URL  ==> Value = "pouac"; Should return false', () => {
  expect(Validators.url().isValid("pouac")).toBeFalsy();
});
test('URL  ==> Value = "https://github.com/"; Should return true', () => {
  expect(Validators.url().isValid("https://github.com/")).toBeTruthy();
});
test('URL  ==> Value = "http://github.com/"; Should return true', () => {
  expect(Validators.url().isValid("https://github.com/")).toBeTruthy();
});
test('URL  ==> Value = "www.youtube.com"; Should return true', () => {
  expect(Validators.url().isValid("www.youtube.com")).toBeTruthy();
});


// Alpha
test('Alpha  ==> Value = "pouac"; Should return true', () => {
  expect(Validators.alpha().isValid("pouac")).toBeTruthy();
});
test('Alpha  ==> Value = "pou_ac"; Should return false', () => {
  expect(Validators.alpha().isValid("pou_ac")).toBeFalsy();
});
test('Alpha  ==> Value = "pouac0"; Should return false', () => {
  expect(Validators.alpha().isValid("pouac0")).toBeFalsy();
});
test('Alpha  ==> Value = "pouac$"; Should return false', () => {
  expect(Validators.alpha().isValid("pouac$")).toBeFalsy();
});
test('Alpha  ==> Value = ""; Should return true', () => {
  expect(Validators.alpha().isValid("")).toBeTruthy();
});


// AlphaDash
test('Alpha  ==> Value = "pouac"; Should return true', () => {
  expect(Validators.alphaDash().isValid("pouac")).toBeTruthy();
});
test('Alpha  ==> Value = "pou_ac"; Should return true', () => {
  expect(Validators.alphaDash().isValid("pou_ac")).toBeTruthy();
});
test('Alpha  ==> Value = "pouac0"; Should return false', () => {
  expect(Validators.alphaDash().isValid("pouac0")).toBeFalsy();
});
test('Alpha  ==> Value = "pouac$"; Should return false', () => {
  expect(Validators.alphaDash().isValid("pouac$")).toBeFalsy();
});
test('Alpha  ==> Value = ""; Should return true', () => {
  expect(Validators.alphaDash().isValid("")).toBeTruthy();
});


// Numeric
test('Numeric  ==> Value = "44"; Should return true', () => {
  expect(Validators.numeric().isValid("44")).toBeTruthy();
});
test('Numeric  ==> Value = 44; Should return true', () => {
  expect(Validators.numeric().isValid(44)).toBeTruthy();
});
test('Numeric  ==> Value = "44a"; Should return false', () => {
  expect(Validators.numeric().isValid("44a")).toBeFalsy();
});
test('Numeric  ==> Value = "44_"; Should return false', () => {
  expect(Validators.numeric().isValid("44_")).toBeFalsy();
});
test('Numeric  ==> Value = "44$"; Should return false', () => {
  expect(Validators.numeric().isValid("44$")).toBeFalsy();
});


// DateBeforeToday
test('DateBeforeToday  ==> Value = "2017-01-01"; Should return true', () => {
  expect(Validators.dateBeforeToday().isValid("2017-01-01")).toBeTruthy();
});
test('DateBeforeToday  ==> Value = "2100-01-01"; Should return false', () => {
  expect(Validators.dateBeforeToday().isValid("2100-01-01")).toBeFalsy();
});

test('DateBeforeToday  ==> Value = today Date; Should return false', () => {
  let d = new Date();
  let month = d.getMonth() + 1;
  let today = [d.getFullYear(), month < 10 ? '0' + month : month, d.getDate()].join('-');

  expect(Validators.dateBeforeToday().isValid(today)).toBeFalsy();
});


// DateAfterToday
test('DateAfterToday  ==> Value = "2017-01-01"; Should return false', () => {
  expect(Validators.dateAfterToday().isValid("2017-01-01")).toBeFalsy();
});
test('DateAfterToday  ==> Value = "2100-01-01"; Should return true', () => {
  expect(Validators.dateAfterToday().isValid("2100-01-01")).toBeTruthy();
});
test('DateAfterToday  ==> Value = today Date; Should return false', () => {
  let d = new Date();
  let month = d.getMonth() + 1;
  let today = [d.getFullYear(), month < 10 ? '0' + month : month, d.getDate()].join('-');

  expect(Validators.dateAfterToday().isValid(today)).toBeFalsy();
});


// DateBefore
test('DateBefore  ==> Value = "2017-01-01"; Should return true', () => {
  expect(Validators.dateBefore("2018-01-01").isValid("2017-01-01")).toBeTruthy();
});
test('DateBefore  ==> Value = "2050-01-01"; Should return false', () => {
  expect(Validators.dateBefore("2018-01-01").isValid("2050-01-01")).toBeFalsy();
});
test('DateBefore  ==> Value = "2018-01-01"; Should return false', () => {
  expect(Validators.dateBefore("2018-01-01").isValid("2018-01-01")).toBeFalsy();
});
test('DateBefore ==> ; Should throw error', () => {
  expect(() => new DateBefore('dateBefore', 'INVALID_DATE')).toThrowError();
});


// DateBefore
test('DateBefore  ==> Value = "2017-01-01"; Should return false', () => {
  expect(Validators.dateAfter("2018-01-01").isValid("2017-01-01")).toBeFalsy();
});
test('DateBefore  ==> Value = "2050-01-01"; Should return true', () => {
  expect(Validators.dateAfter("2018-01-01").isValid("2050-01-01")).toBeTruthy();
});
test('DateBefore  ==> Value = "2018-01-01"; Should return false', () => {
  expect(Validators.dateAfter("2018-01-01").isValid("2018-01-01")).toBeFalsy();
});
test('DateBefore ==> ; Should throw error', () => {
  expect(() => new DateAfter('dateBefore', 'INVALID_DATE')).toThrowError();
});


// Update validators
test('form => start but get valid after formValidatorsUpdate', () => {
  let form = new Form({
    name: { value: '', validators: [Validators.required()] },
  });
  expect(form.isValid()).toBeFalsy();

  form.updateValidators({ name: { validators: [] } })
  form.values.name = 'Alexandre';
  expect(form.isValid()).toBeTruthy();
})