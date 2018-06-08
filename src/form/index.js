export default class Form {

  constructor(formData) {
    this.valid = false; // Is the form valid ?
    this.validators = {}; // Validators by field
    this.values = {} // Form values
    this.errors = {} // Errors
    this.touched = {} // Touched fields (all false by default)


    for(let inputName in formData) {
      let inputData = formData[inputName];

      // Values
      if(inputData['value']) this.values[inputName] = inputData['value'];
      else this.values[inputName] = inputData.multiple ? [] : null;

      // Validators
      this.validators[inputName] = inputData.validators || [];

      // Touched
      this.touched[inputName] = false;

      // Init the current field value
      this.validateField(inputName, this.values[inputName] || '');
    }

    return this;
  }

  updateValidators(newFormValidators) {
    for(let inputName in newFormValidators) {
      this.checkFieldExists(inputName);

      let inputData = newFormValidators[inputName];
      this.validators[inputName] = inputData.validators || [];
      this.validateField(inputName, this.values[inputName] || '');
    }
  }

  saveField(name, value) {
    this.touched[name] = true;

    if(Array.isArray(this.values[name])) {
      if(Array.isArray(value)) {
        // Case 'select.multiple' => we got an array
        this.values[name] = value;
      } else {
        // Checkboxes : we add/remove value one by one
        if(this.values[name].includes(value)) this.values[name] = this.values[name].filter(v => v !== value)
        else this.values[name].push(value);
      }
    }
    else if(Array.isArray(value)) {
      // Array values on a non-multiple field => error
      throw new Error('Can\'t set an array value to a non-mulitple field. Please add `multiple:true` for \'' + name + '\' when calling Form constructor');
    } else {
      this.values[name] = value === '' ? null : value;
    }

    // Return the new value
    return this.values[name];
  }

  validateField(name, value, forceUpdateFn) {
    // Extract validators
    let validators = this.validators[name];
    if(!validators) throw new Error('No entry  \'' + name + '\' in the given form description.')

    // Remove the current errors
    delete this.errors[name];

    validators.forEach(v => {
      if(!v.isValid(value)) {
        let errorsArray = this.errors[name] || [];
        errorsArray.push(v.errorName)
        this.errors[name] = errorsArray;
      }
    });

    this.updateFormStatus();

    // Call forceUpdate()
    if(forceUpdateFn) forceUpdateFn();
  }

  checkFieldExists = (key) => {
    if(this.validators[key] === undefined) throw new Error('Unknown field: \'' + key + '\'');
    return true;
  }

  updateFormStatus = () => {
    this.valid = Object.keys(this.errors).length === 0;
  }

  /* Return true if the given field has at least one error */
  hasErrors = (fieldName) => { this.checkFieldExists(fieldName); return this.errors[fieldName] !== undefined; }

  /* Return all the errors associated to the given field */
  getErrors = (fieldName) => { this.checkFieldExists(fieldName); return this.errors[fieldName] || []; }

  /* Return if a field has been modified by an user */
  isTouched = (fieldName) => { this.checkFieldExists(fieldName); return this.touched[fieldName]; }

  /* Return true if the given field has the given error */
  hasError = (fieldName, errorName) => {
    this.checkFieldExists(fieldName);
    if(!this.errors[fieldName]) return false;
    return this.errors.indexOf(err => err === errorName) !== -1;
  }

  isSelected = (fieldName, value) => {
    this.checkFieldExists(fieldName);
    let savedValue = this.values[fieldName];
    return Array.isArray(savedValue) ? savedValue.includes(value) : savedValue === value;
  }

  getValue = (fieldName) => {
    this.checkFieldExists(fieldName);
    return this.values[fieldName];
  }

  getValues = () => this.values;
  isValid = () => this.valid;
}
