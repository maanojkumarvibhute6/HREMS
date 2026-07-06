import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchFieldsValidator(sourceField: string, targetField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const sourceValue = control.get(sourceField)?.value;
        const targetValue = control.get(targetField)?.value;

        if (!sourceValue || !targetValue) {
            return null;
        }

        return sourceValue === targetValue ? null : { fieldsMismatch: true };
    }
}
