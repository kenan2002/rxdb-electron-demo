import RxDB from 'rxdb';
import idbAdapter from 'pouchdb-adapter-idb';

RxDB.plugin(idbAdapter);

export default RxDB;
