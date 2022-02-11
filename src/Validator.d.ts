class Validator {
    private _!: object;
    private select!: string;
    constructor(obj: object) {
        this._ = obj;
    }

    has(name: string): boolean {
        return Object.prototype.hasOwnProperty.call(this._, name);
    }

    body(name: string): this {
        this.select = name;
        console.log(this.select);

        return this;
    }

    isEmpty(): Boolean {
        return String(this._[this.select as keyof object]).trim() === '';
    }

    isValidStrig(): boolean {
        return /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/.test(this._[this.select as keyof object]);
    }

    isEmail(): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this._[this.select as keyof object]);
    }

    isPhone(): boolean {
        return /^[0]?(1)[3456789]\d{8}$/.test(this._[this.select as keyof object]);
    }

    value() {
        return String(this._[this.select as keyof object]).trim();
    }
}

export default Validator;