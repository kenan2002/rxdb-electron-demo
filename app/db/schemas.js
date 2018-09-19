/* eslint-disable import/prefer-default-export */
export const itemsSchema = {
  title: 'todo item schema',
  version: 0,
  description: 'describes a todo item',
  type: 'object',
  properties: {
    text: {
      type: 'string'
    }
  }
};
