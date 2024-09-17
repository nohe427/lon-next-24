import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';
export const connectorConfig: ConnectorConfig;

export type TimestampString = string;

export type UUIDString = string;

export type Int64String = string;

export type DateString = string;


export interface CreateStoreItemResponse {
  storeItem_insert: StoreItem_Key;
}

export interface CreateStoreItemVariables {
  ref: string;
  name: string;
  aisle: number;
  cat: string;
  msrp: number;
  embeddingAttr: string;
}

export interface ListAllStoreItemsLimitResponse {
  storeItems: ({
    ref: string;
  } & StoreItem_Key)[];
}

export interface ListAllStoreItemsLimitVariables {
  offset: number;
}

export interface ListStoreItemsResponse {
  storeItems_descEmbedding_similarity: ({
    ref: string;
    name: string;
    aisle: number;
    category: string;
    msrp: number;
  } & StoreItem_Key)[];
}

export interface ListStoreItemsVariables {
  query: string;
}

export interface StoreItem_Key {
  ref: string;
  __typename?: 'StoreItem_Key';
}



/* Allow users to create refs without passing in DataConnect */
export function createStoreItemRef(vars: CreateStoreItemVariables): MutationRef<CreateStoreItemResponse, CreateStoreItemVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createStoreItemRef(dc: DataConnect, vars: CreateStoreItemVariables): MutationRef<CreateStoreItemResponse,CreateStoreItemVariables>;

export function createStoreItem(vars: CreateStoreItemVariables): MutationPromise<CreateStoreItemResponse, CreateStoreItemVariables>;
export function createStoreItem(dc: DataConnect, vars: CreateStoreItemVariables): MutationPromise<CreateStoreItemResponse,CreateStoreItemVariables>;


/* Allow users to create refs without passing in DataConnect */
export function listStoreItemsRef(vars: ListStoreItemsVariables): QueryRef<ListStoreItemsResponse, ListStoreItemsVariables>;
/* Allow users to pass in custom DataConnect instances */
export function listStoreItemsRef(dc: DataConnect, vars: ListStoreItemsVariables): QueryRef<ListStoreItemsResponse,ListStoreItemsVariables>;

export function listStoreItems(vars: ListStoreItemsVariables): QueryPromise<ListStoreItemsResponse, ListStoreItemsVariables>;
export function listStoreItems(dc: DataConnect, vars: ListStoreItemsVariables): QueryPromise<ListStoreItemsResponse,ListStoreItemsVariables>;


/* Allow users to create refs without passing in DataConnect */
export function listAllStoreItemsLimitRef(vars: ListAllStoreItemsLimitVariables): QueryRef<ListAllStoreItemsLimitResponse, ListAllStoreItemsLimitVariables>;
/* Allow users to pass in custom DataConnect instances */
export function listAllStoreItemsLimitRef(dc: DataConnect, vars: ListAllStoreItemsLimitVariables): QueryRef<ListAllStoreItemsLimitResponse,ListAllStoreItemsLimitVariables>;

export function listAllStoreItemsLimit(vars: ListAllStoreItemsLimitVariables): QueryPromise<ListAllStoreItemsLimitResponse, ListAllStoreItemsLimitVariables>;
export function listAllStoreItemsLimit(dc: DataConnect, vars: ListAllStoreItemsLimitVariables): QueryPromise<ListAllStoreItemsLimitResponse,ListAllStoreItemsLimitVariables>;


