import RxDB from 'rxdb';
import RxDBServerPlugin from 'rxdb/plugins/server';
import adapter from 'pouchdb-adapter-node-websql';
import { itemsSchema } from './schemas';

RxDB.plugin(RxDBServerPlugin);
RxDB.plugin(adapter);

export default async function initDB() {
  const db = await RxDB.create({
    name: 'todo',
    adapter: 'websql',
    password: 'my-password',
    multiInstance: false
  });

  await db.collection({
    name: 'items',
    schema: itemsSchema
  });

  const serverState = db.server({
    path: '/db',
    port: 15115
  });

  console.log(serverState);
}
