"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const executeAccess_1 = __importDefault(require("../../auth/executeAccess"));
const defaultAccess_1 = __importDefault(require("../../auth/defaultAccess"));
const UnathorizedError_1 = __importDefault(require("../../errors/UnathorizedError"));
async function findOne(args) {
    const { overrideAccess, req, req: { payload: { preferences: { Model }, }, }, user, key, } = args;
    if (!user) {
        throw new UnathorizedError_1.default(req.t);
    }
    if (!overrideAccess) {
        await (0, executeAccess_1.default)({ req }, defaultAccess_1.default);
    }
    const filter = {
        key,
        user: user.id,
        userCollection: user.collection,
    };
    const doc = await Model.findOne(filter);
    if (!doc)
        return null;
    return doc;
}
exports.default = findOne;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZE9uZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wcmVmZXJlbmNlcy9vcGVyYXRpb25zL2ZpbmRPbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSw2RUFBcUQ7QUFDckQsNkVBQXFEO0FBQ3JELHFGQUE4RDtBQUU5RCxLQUFLLFVBQVUsT0FBTyxDQUFDLElBQXVCO0lBQzVDLE1BQU0sRUFDSixjQUFjLEVBQ2QsR0FBRyxFQUNILEdBQUcsRUFBRSxFQUNILE9BQU8sRUFBRSxFQUNQLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUN2QixHQUNGLEVBQ0QsSUFBSSxFQUNKLEdBQUcsR0FDSixHQUFHLElBQUksQ0FBQztJQUVULElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxNQUFNLElBQUksMEJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3BDO0lBRUQsSUFBSSxDQUFDLGNBQWMsRUFBRTtRQUNuQixNQUFNLElBQUEsdUJBQWEsRUFBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLHVCQUFhLENBQUMsQ0FBQztLQUM3QztJQUVELE1BQU0sTUFBTSxHQUFHO1FBQ2IsR0FBRztRQUNILElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtRQUNiLGNBQWMsRUFBRSxJQUFJLENBQUMsVUFBVTtLQUNoQyxDQUFDO0lBRUYsTUFBTSxHQUFHLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXhDLElBQUksQ0FBQyxHQUFHO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFFdEIsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRUQsa0JBQWUsT0FBTyxDQUFDIn0=