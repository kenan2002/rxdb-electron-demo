import RxDB from '../db/rxdb';
import { itemsSchema } from '../db/schemas';

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
