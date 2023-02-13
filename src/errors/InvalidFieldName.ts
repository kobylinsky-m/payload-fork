import { Field } from '../fields/config/types';
import APIError from './APIError';

class InvalidFieldName extends APIError {
  constructor(field: Field, fieldName: string) {
    super(`Field ${field.label} has invalid name '${fieldName}'. Field names can not include periods (.) and must be alphanumeric.`);
  }
}

export default InvalidFieldName;
