"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Schema_1 = __importDefault(require("./Schema"));
var Validator = /** @class */ (function (_super) {
    __extends(Validator, _super);
    function Validator(schemaObj) {
        var _this = _super.call(this, schemaObj) || this;
        // user input generate error
        _this._isError = false;
        return _this;
    }
    Validator.prototype.test = function () {
        // console.log(this._model);
    };
    Validator.prototype.body = function (input) {
        this._input = input;
        this.validation();
    };
    Validator.prototype.validation = function () {
        var _a, _b;
        for (var key in this._model) {
            var field = this._model[key];
            var isCustomMessageAvailable = Object.prototype.hasOwnProperty.call(field, 'errorMessage');
            // check require field first
            if (Object.prototype.hasOwnProperty.call(field, 'require')) {
                var require = field['require'];
                if (require && !this._input[key]) {
                    this._isError = true;
                    this._errors = __assign(__assign({}, this._errors), (_a = {}, _a[key] = isCustomMessageAvailable && Object.prototype.hasOwnProperty.call(field['errorMessage'], 'require') ? field['errorMessage']['require'] : 'This field is required!', _a));
                }
            }
            // type check
            var typeFunc = field['type'];
            var typeName = String(typeFunc['name']).toLowerCase();
            // console.log(typeof this._input[key as keyof typeof this._input] === typeName, !isNaN(+this._input[key as keyof typeof this._input]), (/[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/.test(this._input[key as keyof typeof this._input])));
            // console.log(!isNaN(+this._input[key as keyof typeof this._input]), this._input[key as keyof typeof this._input]);
            // console.log(!isNaN(+this._input[key as keyof typeof this._input]) || /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/.test(this._input[key as keyof typeof this._input]), this._input[key as keyof typeof this._input]);
            // String
            var strAcceptable = !isNaN(+this._input[key]) || /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/.test(this._input[key]);
            if (typeof this._input[key] === typeName && strAcceptable) {
                this._isError = true;
                this._errors = __assign(__assign({}, this._errors), (_b = {}, _b[key] = isCustomMessageAvailable && Object.prototype.hasOwnProperty.call(field['errorMessage'], 'type') ? field['errorMessage']['type'] : 'This field must be character and number!', _b));
            }
        }
    };
    Validator.prototype.isValid = function () {
        return !this._isError;
    };
    Validator.prototype.errors = function () {
        return this._errors;
    };
    return Validator;
}(Schema_1.default));
exports.default = Validator;
