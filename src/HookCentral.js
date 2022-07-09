// HookCentral
(() => {
  window.HookCentral = window.HookCentral || {
    initDone: false,
    handlers: null,
    globalHandlers: null,
    init: () => {
      if(!window.HookCentral.initDone) {
        window.HookCentral.initDone = true;
        window.HookCentral.handlers = {};
        window.HookCentral.global_handlers = {};
        window.addEventListener("storage", (evt) => {
          let storageKeyMatch;
          if(storageKeyMatch = evt.key.match(/^HookCentral\.(.*)$/)) {
            let key = storageKeyMatch[1];
            let data = window.localStorage.getItem(evt.key);
            try {
              data = JSON.parse(data);
              if(data && data.payload) {
                window.HookCentral.send(key, data.payload);
              } else {
                window.HookCentral.send(key, null);
              }
            } catch(e) {
              console.log("Failed to process payload", data);
            }
          }
        })
      }
    },
    _eventHandler: (evt) => {
      if(window.HookCentral.handlers[evt.type]) {
        let length = window.HookCentral.handlers[evt.type].length;
        for(let i = 0; i < length; i++) {
          let callback = window.HookCentral.handlers[evt.type][i];
          if(typeof(callback) === "function") {
            callback.call(null, evt.detail);
          }
        }
      }
    },
    _eventStorageHandler: (evt) => {
      if(window.HookCentral.globalHandlers[evt.type]) {
        let length = window.HookCentral.globalHandlers[evt.type].length;
        for(let i = 0; i < length; i++) {
          let callback = window.HookCentral.globalHandlers[evt.type][i];
          if(typeof(callback) === "function") {
            callback.call(null, evt.detail);
          }
        }
      }
    },
    subscribe: (evtName, callback) => {
      if(!window.HookCentral.handlers[evtName]) {
        window.removeEventListener(evtName, window.HookCentral._eventHandler);
        window.HookCentral.handlers[evtName] = [];
      }
      window.HookCentral.handlers[evtName].push(callback);
      window.addEventListener(evtName, window.HookCentral._eventHandler);
    },
    unsubscribe: (evtName, callback) => {

    },
    send: (evtName, payload) => {
      const sendEvent = new CustomEvent(evtName, {
        detail: payload
      });
      window.dispatchEvent(sendEvent);
    },
    globalSend: (evtName, payload, sendLocal = true) => {
      if(sendLocal) {
        window.HookCentral.send(evtName, payload);
      }
      const data = {
        payload: payload,
        timestamp: new Date()
      };
      window.localStorage.setItem("HookCentral." + evtName, JSON.stringify(data));
    }
  }
  window.HookCentral.init();
}
)();
