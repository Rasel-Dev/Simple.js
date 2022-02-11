
import Schema from './Schema';
class Validator extends Schema {
    // user input model object
    protected _input!: object;
    // user input generate error
    protected _isError: boolean = false;
    // user input generate error object
    protected _errors!: object;

    constructor(schemaObj: object) {
        super(schemaObj);
    }

    test(): void {
        // console.log(this._model);
    }

    body(input: object): void {
        this._input = input;
        this.validation();
    }

    validation(): void {
        for (const key in this._model) {
            const field: object = this._model[key as keyof typeof this._model];
            const isCustomMessageAvailable: boolean = Object.prototype.hasOwnProperty.call(field, 'errorMessage');
            // check require field first
            if (Object.prototype.hasOwnProperty.call(field, 'require')) {
                const require: boolean = field['require' as keyof typeof field];
                if (require && !this._input[key as keyof typeof this._input]) {
                    this._isError = true;
                    this._errors = {
                        ...this._errors,
                        [key]: isCustomMessageAvailable && Object.prototype.hasOwnProperty.call(field['errorMessage' as keyof typeof field], 'require') ? field['errorMessage' as keyof typeof field]['require' as keyof typeof field] : 'This field is required!'
                    }
                }
            }
            // type check
            const typeFunc: Function = field['type' as keyof typeof field];
            const typeName: string = String(typeFunc['name' as keyof typeof field]).toLowerCase();
            // console.log(typeof this._input[key as keyof typeof this._input] === typeName, !isNaN(+this._input[key as keyof typeof this._input]), (/[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/.test(this._input[key as keyof typeof this._input])));
            // console.log(!isNaN(+this._input[key as keyof typeof this._input]), this._input[key as keyof typeof this._input]);
            // console.log(!isNaN(+this._input[key as keyof typeof this._input]) || /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/.test(this._input[key as keyof typeof this._input]), this._input[key as keyof typeof this._input]);



            // String
            const strAcceptable: boolean = !isNaN(+this._input[key as keyof typeof this._input]) || /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/.test(this._input[key as keyof typeof this._input]);
            if (typeof this._input[key as keyof typeof this._input] === typeName && strAcceptable) {
                this._isError = true;
                this._errors = {
                    ...this._errors,
                    [key]: isCustomMessageAvailable && Object.prototype.hasOwnProperty.call(field['errorMessage' as keyof typeof field], 'type') ? field['errorMessage' as keyof typeof field]['type' as keyof typeof field] : 'This field must be character and number!'
                }
            }

        }

    }

    isValid(): boolean {
        return !this._isError;
    }

    errors(): object {
        return this._errors;
    }
}
export default Validator;