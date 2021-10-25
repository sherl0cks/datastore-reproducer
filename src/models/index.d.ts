import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type SimpleTaskMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type DynamoStyleTaskMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class SimpleTask {
  readonly id: string;
  readonly version: number;
  readonly description?: string;
  readonly strategy?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<SimpleTask, SimpleTaskMetaData>);
  static copyOf(source: SimpleTask, mutator: (draft: MutableModel<SimpleTask, SimpleTaskMetaData>) => MutableModel<SimpleTask, SimpleTaskMetaData> | void): SimpleTask;
}

export declare class DynamoStyleTask {
  readonly id: string;
  readonly pk: string;
  readonly sk: number;
  readonly version: number;
  readonly description?: string;
  readonly strategy?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<DynamoStyleTask, DynamoStyleTaskMetaData>);
  static copyOf(source: DynamoStyleTask, mutator: (draft: MutableModel<DynamoStyleTask, DynamoStyleTaskMetaData>) => MutableModel<DynamoStyleTask, DynamoStyleTaskMetaData> | void): DynamoStyleTask;
}