// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { SimpleTask, DynamoStyleTask } = initSchema(schema);

export {
  SimpleTask,
  DynamoStyleTask
};