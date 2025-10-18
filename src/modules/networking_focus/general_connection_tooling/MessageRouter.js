// import * as scene1Handlers from './handlers/scene1';
// import * as birdSceneHandler from './../scenes/birds/handlers/birdSceneHandler';
import * as commonHandlers from './handlers/common';

// Dev note: Going forward, handlers should use this import structure with an index.js file per scene.
// import GridSceneHandler from './../scenes/simple_grid/handlers';

const HANDLERS = {
  common: commonHandlers,
  // scene1: scene1Handlers,
  // birdScene: birdSceneHandler,
  // scene2: scene2Handlers,
  // gridScene: GridSceneHandler
};

export const routeMessage = (fromPeerId, message) => {
  const { scene, type, payload } = message;

  const handlers = HANDLERS[scene] || {};
  const handler = handlers[type] || commonHandlers[type];
  // const handler = null

  if (handler) {
    handler(fromPeerId, payload);
  } else {
    console.log(handler)
    console.log(handlers)

    console.warn(`No handler for message: ${scene}/${type}`);
  }
};
