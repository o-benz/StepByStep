import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
    selector: 'app-formly-field-stepper',
    templateUrl: './formly-field-stepper.component.html',
    styleUrls: ['./formly-field-stepper.component.scss'],
})
export class FormlyFieldStepperComponent extends FieldType {
    constructor(private router: Router) { // Inject Router
        super();
    }

    isValid(field: FormlyFieldConfig): boolean {
        if (field.key && field.formControl) {
            return field.formControl.valid;
        }

        return field.fieldGroup ? field.fieldGroup.every((f) => this.isValid(f)) : true;
    }

    get isModifyPage(): boolean {
        return this.router.url.includes('/modify-resident');
    }
}
