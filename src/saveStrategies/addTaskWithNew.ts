import {DataStore} from "aws-amplify";
import {DynamoStyleTask} from "../models";
import {SaveStrategy} from "../App";
import { v4 as uuid4 } from 'uuid';

/**
 * This approach appears to work, but it's confusing for developers because model.id is only valuable as internal
 * primary key to datastore, and application code must pass around pk as the actual id.
 *
 * Given the way @key is described in https://docs.amplify.aws/lib/datastore/relational/q/platform/js/, and the way
 * developers have worked with the version control pattern for years, this behavior feels like a bug in datastore
 * and should be fixed.
 */

export const addTaskWithNew = async (newTaskDescription: string) => {
  const v0 = await DataStore.save(
    new DynamoStyleTask({
      description: newTaskDescription,
      strategy: SaveStrategy.DataStoreNew,
      pk: uuid4(),
      sk: 0,
      version: 0
    })
  );
  const v1 = await DataStore.save(
    new DynamoStyleTask(DynamoStyleTask.copyOf(v0, draft => {
      draft.sk = 1
      draft.version = 1
    }))
  );
}
