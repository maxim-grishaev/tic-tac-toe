export const TYPES = {
  NEXT_MOVE: 'next move',
  STATE: 'state'
};
export const createMessage = (type, payload) => ({ type, payload });
export const sendMessage = (window, json) => window.postMessage(json, '*');
export const subscribe = callback =>
  window.addEventListener('message', e => {
    console.log('[16:55:52] messages.js >>> ', e);
    const action = e.data;
    if (action.type && action.payload) {
      callback(action);
    }
  });
