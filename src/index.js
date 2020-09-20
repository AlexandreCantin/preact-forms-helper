export const validateField = (updateFunc, form, fieldName) => {
  return function(event) {
    // Name
    fieldName = fieldName || event.target.name;
    form.checkFieldExists(fieldName);

    // Type
    let fieldType = event.target.tagName === 'SELECT' ? event.target.multiple ? 'select.multiple' : 'select' : undefined;
    if(!fieldType) fieldType = event.target.type || 'text';

    // Value
    let value = event.target.value;
    if((fieldType === 'number' || fieldType === 'range' ) && value !== '' && +value !== 'NaN') value = +value; // Convert as an integer if needed
    else if (fieldType === 'select.multiple') value = Array.from(event.target.selectedOptions).map(opt => opt.value); // As array if multiple values

    let newValue = form.saveField(fieldName, value);
    // Check and forceUpdate
    form.validateField(fieldName, newValue, () => updateFunc())
  };
}

export { default as Form } from './form';
export { default as Validators } from './validators';
