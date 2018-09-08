declare module "preact-forms-helper" {

  import * as Preact from 'preact'

  type GetFieldValue<T extends TFormDataField> = T['value']
  type GetType<T, U={}> = T extends (infer U)[] ? U : T;

  export type TFormData = {
    [key: string]: TFormDataField
  };
  export type TFormDataField<T={}> = {
    value: T
    validators: Array<TValidator>;
  }
  export type TValidator = {
    isValid(value): boolean;
  }

  export class Form<T extends TFormData> {
    constructor(formData: T);
    updateValidators(newFormValidators: T): void;
    saveField<K extends keyof T>(name: K, value: GetType<GetFieldValue<T[K]>>): GetFieldValue<T[K]>;
    validateField<K extends keyof T>(name: K, value: GetFieldValue<T[K]>, forceUpdate: boolean): void;
    checkFieldExists<K extends keyof T>(name: K): boolean;
    updateFormStatus(): void;
    hasErrors<K extends keyof T>(name: K): boolean;
    getErrors<K extends keyof T>(name: K): Array<string>;
    isTouched<K extends keyof T>(name: K): boolean;
    hasError<K extends keyof T>(name: K, errorName: string): boolean;
    isSelected<K extends keyof T>(name: K, value: GetType<GetFieldValue<T[K]>>): boolean;
    getValue<K extends keyof T>(name: K): GetFieldValue<T[K]>;
    setValue<K extends keyof T>(name: K, value: GetFieldValue<T[K]>, component: Preact.AnyComponent): void;
    getValues(): boolean;
    isValid(): boolean;
  }

  export const Validators: {
    minInteger(number: number): TValidator;
    maxInteger(number: number): TValidator;
    between(min: number, max: number): TValidator;

    minLength(min: number): TValidator;
    maxLength(max: number): TValidator;

    required(): TValidator;

    pattern(pattern: RegExp): TValidator;
    email(): TValidator;
    url(): TValidator;
    alpha(): TValidator;
    alphaDash(): TValidator;
    numeric(): TValidator;

    dateBefore(date: string): TValidator;
    dateAfter(date: string): TValidator;
    dateBeforeToday(): TValidator;
    dateAfterToday(): TValidator;
  };
}