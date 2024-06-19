import { persistStore } from 'redux-persist';
import {persistedRootReducer} from './reducers';
import rootSaga from './rootSaga';
import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

// Setup Middlewares
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

// Create Store
const store = configureStore({
  reducer: persistedRootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middleware),
    devTools: 'production' !== 'production',
});

// Start rootSaga
sagaMiddleware.run(rootSaga);

// Setup Store persistence
// const persistor = persistStore(store, null);

// export {store, persistor};
export {store};
