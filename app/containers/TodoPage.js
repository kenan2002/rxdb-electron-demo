import React, { Component } from 'react';
import RxDB from 'rxdb';
import idbAdapter from 'pouchdb-adapter-idb';
import httpAdapter from 'pouchdb-adapter-http';
import { itemsSchema } from '../db/schemas';

RxDB.plugin(idbAdapter);
RxDB.plugin(httpAdapter);

const LoadingState = {
  INIT: 'init',
  CREATING_DB: 'creating-db',
  CREATING_COLLECTION: 'creating-collection',
  DONE: 'done'
};

class TodoPage extends Component {
  constructor(props) {
    super(props);
    this.db = null;
    this.state = {
      loadingState: LoadingState.INIT,
      todos: [],
      text: ''
    };
    this.unmounted = false;
  }

  async componentDidMount() {
    this.setState({
      loadingState: LoadingState.CREATING_DB
    });
    const db = await RxDB.create({
      name: 'todo',
      adapter: 'idb',
      password: 'my-password',
      multiInstance: false,
      queryChangeDetection: true
    });

    if (this.unmounted) {
      await db.destroy();
      return;
    }

    this.db = db;

    this.setState({
      loadingState: LoadingState.CREATING_COLLECTION
    });
    await db.collection({
      name: 'items',
      schema: itemsSchema
    });

    this.setState({
      loadingState: LoadingState.DONE
    });

    db.items.sync({
      remote: 'http://localhost:15115/db/items'
    });

    db.items
      .find()
      .sort('_id')
      .$.subscribe(items => {
        this.setState({
          todos: items
        });
      });
  }

  async componentWillUnmount() {
    if (this.db) {
      await this.db.destroy();
    }
    this.unmounted = true;
  }

  handleTextChange = event => {
    this.setState({
      text: event.target.value
    });
  };

  handleAddClick = async () => {
    const { text } = this.state;
    if (!text) {
      console.log('不能为空');
      return;
    }

    await this.db.items.insert({
      text
    });

    this.setState({
      text: ''
    });
  };

  render() {
    const { loadingState, todos, text } = this.state;
    if (loadingState !== LoadingState.DONE) {
      return <div>{loadingState}</div>;
    }

    return (
      <div>
        <h3>Todos:</h3>
        <ul>
          {todos.map(item => (
            // eslint-disable-next-line no-underscore-dangle
            <li key={item._id}>
              {item.text}
              <button
                type="button"
                style={{
                  display: 'inline-block',
                  color: '#DD6666',
                  marginLeft: 10
                }}
                onClick={() => {
                  item.remove();
                }}
              >
                x
              </button>
            </li>
          ))}
        </ul>
        <div>
          <input type="text" value={text} onChange={this.handleTextChange} />
          <input type="button" value="添加" onClick={this.handleAddClick} />
        </div>
      </div>
    );
  }
}

export default TodoPage;
