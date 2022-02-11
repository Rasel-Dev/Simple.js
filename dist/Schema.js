"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var Schema = /** @class */ (function () {
    function Schema(schema) {
        this.schemaPropsType = ['type', 'require', 'match', 'length', 'lower', 'upper', 'errorMessage'];
        // schema generated error
        this._isSchemaErr = false;
        this._model = schema;
        this.schemaValidation();
        if (this._isSchemaErr)
            console.error(this._s['error']);
    }
    Schema.prototype.has = function (name) {
        return Object.prototype.hasOwnProperty.call(this._model, name);
    };
    // auto run program
    Schema.prototype.schemaValidation = function () {
        var _a, _b;
        for (var key in this._model) {
            var name_1 = this._model[key];
            if (!Object.prototype.hasOwnProperty.call(name_1, 'type')) {
                this._isSchemaErr = true;
                this._s = __assign(__assign({}, this._s), { error: (_a = {},
                        _a[key] = "[type] is required",
                        _a) });
            }
            else {
                for (var objKey in name_1) {
                    if (this.schemaPropsType.indexOf(objKey) === -1) {
                        this._isSchemaErr = true;
                        this._s = __assign(__assign({}, this._s), { error: (_b = {},
                                _b[key] = "\"".concat(objKey, "\" is not valid property"),
                                _b) });
                    }
                }
            }
        }
    };
    return Schema;
}());
exports.default = Schema;
