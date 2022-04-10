import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(passwordKey: string, confirmPasswordKey: string) {
    return (formGroup: FormGroup) => {
      let password = formGroup.controls[passwordKey];
      let confirmPassword = formGroup.controls[confirmPasswordKey];
  
      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
      return {};
    }
}