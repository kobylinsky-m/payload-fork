"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensurePublishedCollectionVersion = void 0;
const enforceMaxVersions_1 = require("./enforceMaxVersions");
const afterRead_1 = require("../fields/hooks/afterRead");
const ensurePublishedCollectionVersion = async ({ payload, config, req, id, docWithLocales, }) => {
    // If there are no newer drafts,
    // And the current doc is published,
    // We need to keep a version of the published document
    if ((docWithLocales === null || docWithLocales === void 0 ? void 0 : docWithLocales._status) === 'published') {
        const VersionModel = payload.versions[config.slug];
        const moreRecentDrafts = await VersionModel.find({
            parent: {
                $eq: docWithLocales.id,
            },
            updatedAt: {
                $gt: docWithLocales.updatedAt,
            },
        }, {}, {
            lean: true,
            leanWithId: true,
            sort: {
                updatedAt: 'desc',
            },
        });
        if ((moreRecentDrafts === null || moreRecentDrafts === void 0 ? void 0 : moreRecentDrafts.length) === 0) {
            const version = await (0, afterRead_1.afterRead)({
                depth: 0,
                doc: docWithLocales,
                entityConfig: config,
                req,
                overrideAccess: true,
                showHiddenFields: true,
                flattenLocales: false,
            });
            try {
                await VersionModel.create({
                    parent: id,
                    version,
                    autosave: false,
                });
            }
            catch (err) {
                payload.logger.error(`There was an error while saving a version for the ${config.slug} with ID ${id}.`);
                payload.logger.error(err);
            }
            if (config.versions.maxPerDoc) {
                (0, enforceMaxVersions_1.enforceMaxVersions)({
                    id,
                    payload,
                    Model: VersionModel,
                    slug: config.slug,
                    entityType: 'collection',
                    max: config.versions.maxPerDoc,
                });
            }
        }
    }
};
exports.ensurePublishedCollectionVersion = ensurePublishedCollectionVersion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5zdXJlUHVibGlzaGVkQ29sbGVjdGlvblZlcnNpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmVyc2lvbnMvZW5zdXJlUHVibGlzaGVkQ29sbGVjdGlvblZlcnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsNkRBQTBEO0FBRTFELHlEQUFzRDtBQVUvQyxNQUFNLGdDQUFnQyxHQUFHLEtBQUssRUFBRSxFQUNyRCxPQUFPLEVBQ1AsTUFBTSxFQUNOLEdBQUcsRUFDSCxFQUFFLEVBQ0YsY0FBYyxHQUNULEVBQWlCLEVBQUU7SUFDeEIsZ0NBQWdDO0lBQ2hDLG9DQUFvQztJQUNwQyxzREFBc0Q7SUFFdEQsSUFBSSxDQUFBLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxPQUFPLE1BQUssV0FBVyxFQUFFO1FBQzNDLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRW5ELE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxZQUFZLENBQUMsSUFBSSxDQUFDO1lBQy9DLE1BQU0sRUFBRTtnQkFDTixHQUFHLEVBQUUsY0FBYyxDQUFDLEVBQUU7YUFDdkI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsR0FBRyxFQUFFLGNBQWMsQ0FBQyxTQUFTO2FBQzlCO1NBQ0YsRUFDRCxFQUFFLEVBQ0Y7WUFDRSxJQUFJLEVBQUUsSUFBSTtZQUNWLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLElBQUksRUFBRTtnQkFDSixTQUFTLEVBQUUsTUFBTTthQUNsQjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQSxnQkFBZ0IsYUFBaEIsZ0JBQWdCLHVCQUFoQixnQkFBZ0IsQ0FBRSxNQUFNLE1BQUssQ0FBQyxFQUFFO1lBQ2xDLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBQSxxQkFBUyxFQUFDO2dCQUM5QixLQUFLLEVBQUUsQ0FBQztnQkFDUixHQUFHLEVBQUUsY0FBYztnQkFDbkIsWUFBWSxFQUFFLE1BQU07Z0JBQ3BCLEdBQUc7Z0JBQ0gsY0FBYyxFQUFFLElBQUk7Z0JBQ3BCLGdCQUFnQixFQUFFLElBQUk7Z0JBQ3RCLGNBQWMsRUFBRSxLQUFLO2FBQ3RCLENBQUMsQ0FBQztZQUVILElBQUk7Z0JBQ0YsTUFBTSxZQUFZLENBQUMsTUFBTSxDQUFDO29CQUN4QixNQUFNLEVBQUUsRUFBRTtvQkFDVixPQUFPO29CQUNQLFFBQVEsRUFBRSxLQUFLO2lCQUNoQixDQUFDLENBQUM7YUFDSjtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNaLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHFEQUFxRCxNQUFNLENBQUMsSUFBSSxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3hHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzNCO1lBRUQsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtnQkFDN0IsSUFBQSx1Q0FBa0IsRUFBQztvQkFDakIsRUFBRTtvQkFDRixPQUFPO29CQUNQLEtBQUssRUFBRSxZQUFZO29CQUNuQixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7b0JBQ2pCLFVBQVUsRUFBRSxZQUFZO29CQUN4QixHQUFHLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTO2lCQUMvQixDQUFDLENBQUM7YUFDSjtTQUNGO0tBQ0Y7QUFDSCxDQUFDLENBQUM7QUFqRVcsUUFBQSxnQ0FBZ0Msb0NBaUUzQyJ9