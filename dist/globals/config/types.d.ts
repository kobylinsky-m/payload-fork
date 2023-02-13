import React from 'react';
import { Model, Document } from 'mongoose';
import { DeepRequired } from 'ts-essentials';
import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { PayloadRequest } from '../../express/types';
import { Access, Endpoint, GeneratePreviewURL } from '../../config/types';
import { Field } from '../../fields/config/types';
import { IncomingGlobalVersions, SanitizedGlobalVersions } from '../../versions/types';
export declare type TypeWithID = {
    id: string;
};
export declare type BeforeValidateHook = (args: {
    data?: any;
    req?: PayloadRequest;
    originalDoc?: any;
}) => any;
export declare type BeforeChangeHook = (args: {
    data: any;
    req: PayloadRequest;
    originalDoc?: any;
}) => any;
export declare type AfterChangeHook = (args: {
    doc: any;
    previousDoc: any;
    req: PayloadRequest;
}) => any;
export declare type BeforeReadHook = (args: {
    doc: any;
    req: PayloadRequest;
}) => any;
export declare type AfterReadHook = (args: {
    doc: any;
    req: PayloadRequest;
    query?: {
        [key: string]: any;
    };
    findMany?: boolean;
}) => any;
export interface GlobalModel extends Model<Document> {
    buildQuery: (query: unknown, locale?: string) => Record<string, unknown>;
}
export declare type GlobalConfig = {
    slug: string;
    label?: Record<string, string> | string;
    graphQL?: {
        name?: string;
    };
    /**
     * Options used in typescript generation
     */
    typescript?: {
        /**
         * Typescript generation name given to the interface type
         */
        interface?: string;
    };
    preview?: GeneratePreviewURL;
    versions?: IncomingGlobalVersions | boolean;
    hooks?: {
        beforeValidate?: BeforeValidateHook[];
        beforeChange?: BeforeChangeHook[];
        afterChange?: AfterChangeHook[];
        beforeRead?: BeforeReadHook[];
        afterRead?: AfterReadHook[];
    };
    endpoints?: Omit<Endpoint, 'root'>[];
    access?: {
        read?: Access;
        readDrafts?: Access;
        readVersions?: Access;
        update?: Access;
    };
    fields: Field[];
    admin?: {
        description?: string | (() => string);
        group?: string;
        hideAPIURL?: boolean;
        components?: {
            views?: {
                Edit?: React.ComponentType<any>;
            };
        };
    };
};
export interface SanitizedGlobalConfig extends Omit<DeepRequired<GlobalConfig>, 'fields' | 'versions' | 'graphQL'> {
    fields: Field[];
    versions: SanitizedGlobalVersions;
    graphQL?: {
        name?: string;
        type: GraphQLObjectType;
        mutationInputType: GraphQLNonNull<any>;
        versionType?: GraphQLObjectType;
    };
}
export declare type Globals = {
    Model: GlobalModel;
    config: SanitizedGlobalConfig[];
};
