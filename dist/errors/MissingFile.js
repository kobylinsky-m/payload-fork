"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const APIError_1 = __importDefault(require("./APIError"));
class MissingFile extends APIError_1.default {
    constructor(t) {
        super(t ? t('error:noFilesUploaded') : 'No files were uploaded.', http_status_1.default.BAD_REQUEST);
    }
}
exports.default = MissingFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlzc2luZ0ZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZXJyb3JzL01pc3NpbmdGaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQXFDO0FBRXJDLDBEQUFrQztBQUVsQyxNQUFNLFdBQVksU0FBUSxrQkFBUTtJQUNoQyxZQUFZLENBQWE7UUFDdkIsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLHlCQUF5QixFQUFFLHFCQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDNUYsQ0FBQztDQUNGO0FBRUQsa0JBQWUsV0FBVyxDQUFDIn0=