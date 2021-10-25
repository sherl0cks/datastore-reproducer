import {DataStore} from "aws-amplify";
import {SimpleTask} from "../models";
import {SaveStrategy} from "../App";

/**
 * This is the naive approach, and appears consistent with the docs on @key from
 * https://docs.amplify.aws/lib/datastore/relational/q/platform/js/.
 *
 * When the app is connected to a backend, you'll notice "ConditionalCheckFailedException" failures
 * with message "No existing item found in the data source"
 * because when writing the v1 record DataStore is executing an update when it should be running a create.
 *
 * You will also notice the inconsistent query behavior discussed in https://github.com/aws-amplify/amplify-js/issues/8810.
 */

export const addTaskWithCopy = async (taskDescription: string): Promise<void> => {
  const v0 = await DataStore.save(
    new SimpleTask({
      description: taskDescription,
      strategy: SaveStrategy.DataStoreCopyOf,
      version: 0
    })
  );
  const v1 = await DataStore.save(
    SimpleTask.copyOf(v0, draft => {
      draft.version = 1
    })
  );
}
