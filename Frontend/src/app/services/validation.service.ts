export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config: any = {
      required: 'Required',
      email: 'Invalid email address',
      invalidPassword:
        'Invalid password. Password must be at least 6 characters long, and contain a number.',
      minlength: `Minimum length ${validatorValue.requiredLength}`,
      passwordMismatch: 'Password Mismatch',
      invalidPercentage: 'Enter a percentage between 0 and 100',
      widthExceed: 'Restrict upto 2 decimals',
    };

    return config[validatorName];
  }

  static emailValidator(control: any) {
    if (control.value == null) {
      return 0;
    }
    // RFC 2822 compliant regex
    if (
      typeof control.value != 'undefined' &&
      control.value.match(
        /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/
      )
    ) {
      return 0;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  static passwordValidator(control: any) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { invalidPassword: true };
    }
  }

  static passwordMatchValidator(control: any) {
    /*return control.get('password').value === control.get('confirm_password').value
        ? null : {'passwordMismatch': true};*/
    return true;
  }

  static percentageValidator(control: any) {
    if (
      typeof control.value !== 'undefined' &&
      control.value >= 0 &&
      control.value <= 100
    ) {
      return 0;
    } else {
      return { invalidPercentage: true };
    }
  }

  static limitFloatWidth(control: any) {
    if (
      typeof control.value !== 'undefined' &&
      control.value.match(/^\d+(\.\d{0,2})?$/)
    ) {
      return 0;
    } else {
      return { widthExceed: true };
    }
  }
}
