import RxDB from 'rxdb';
import adapter from 'pouchdb-adapter-idb';
import { itemsSchema } from '../db/schemas';

RxDB.plugin(adapter);

(async function initDB() {
  const db = await RxDB.create({
    name: 'todo',
    adapter: 'idb',
    password: 'my-password'
  });

  await db.collection({
    name: 'items',
    schema: itemsSchema
  });

  db.items.$.subscribe(changeEvent => console.log(changeEvent));
})();
