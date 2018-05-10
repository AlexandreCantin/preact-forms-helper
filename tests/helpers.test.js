import { isValidDate } from "../src/helpers/date-helpers";

// isValidDate
test('DateBefore ==> ; Should return false', () => {
  expect(isValidDate("INVALID")).toBeFalsy();
})
test('DateBefore ==> ; Should return true', () => {
  expect(isValidDate("2018-01-01")).toBeTruthy();
});