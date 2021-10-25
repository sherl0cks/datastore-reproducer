import {DataStore} from "aws-amplify";
import {SimpleTask} from "../models";
import produce from "immer";
import {SaveStrategy} from "../App";

/**
 * After reading through source of DataStore, I began to wonder if the metadata was some how confusing the
 * storage adapter into thinking that the new @model instance was actually the same item. So here we try to create
 * a new item, and then use Immer.
 */

export const addTaskWithImmer = async (newTaskDescription: string) => {
  const v0 = await DataStore.save(
    new SimpleTask({
      description: newTaskDescription,
      strategy: SaveStrategy.Immer,
      version: 0
    })
  );
  const v1 = new SimpleTask({
      description: newTaskDescription,
      strategy: SaveStrategy.Immer,
      version: 1
    })
  const v1WithCorrectId = produce(v1, draft => {
    draft.id = v0.id
  })
  await DataStore.save(v1WithCorrectId)
}
