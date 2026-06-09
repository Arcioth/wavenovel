const events = new Map();

export function on(event, callback) {
  if (!events.has(event)) {
    events.set(event, new Set());
  }
  events.get(event).add(callback);
}

export function off(event, callback) {
  if (events.has(event)) {
    events.get(event).delete(callback);
  }
}

export function emit(event, payload) {
  if (events.has(event)) {
    for (const callback of events.get(event)) {
      try {
        callback(payload);
      } catch (e) {
        console.error(`Error in event listener for ${event}:`, e);
      }
    }
  }
}
