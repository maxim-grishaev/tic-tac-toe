// @flow
export const TYPES = {
  NEXT_MOVE: 'next move',
  STATE: 'state',
  PLAYER_READY: 'dependant player ready'
};

export type TMessageType = $Values<typeof TYPES>;

export type Message = {
  type: string,
  payload: *
};

export const createMessage = (type: TMessageType, payload: *): Message => ({ type, payload });
export const sendMessage = (window: Object, json: *) => window.postMessage(json, '*');
export const subscribe = (callback: Function) =>
  window.addEventListener('message', ({ data }: { data: Message }) => {
    const action: Message = data;
    if (action.type && action.payload) {
      callback(action);
    }
  });
