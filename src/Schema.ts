export default class Schema {
    protected schemaPropsType: string[] = ['type', 'require', 'match', 'length', 'lower', 'upper', 'errorMessage'];
    // main model object
    protected _model!: object;
    // schema info object
    private _s!: object;
    // schema generated error
    private _isSchemaErr: boolean = false;
    constructor(schema: object) {
        this._model = schema;
        this.schemaValidation();
        if (this._isSchemaErr) console.error(this._s['error' as keyof typeof this._s]);
    }

    has(name: string): boolean {
        return Object.prototype.hasOwnProperty.call(this._model, name);
    }
    // auto run program
    schemaValidation(): void {
        for (const key in this._model) {
            const name: object = this._model[key as keyof typeof this._model];
            if (!Object.prototype.hasOwnProperty.call(name, 'type')) {
                this._isSchemaErr = true;
                this._s = {
                    ...this._s,
                    error: {
                        [key]: "[type] is required"
                    }
                };
            } else {
                for (const objKey in name) {
                    if (this.schemaPropsType.indexOf(objKey) === -1) {
                        this._isSchemaErr = true;
                        this._s = {
                            ...this._s,
                            error: {
                                [key]: `"${objKey}" is not valid property`
                            }
                        };
                    }
                }
            }

        }
    }
}