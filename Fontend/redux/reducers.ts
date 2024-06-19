import { persistCombineReducers } from 'redux-persist';
import { PostReducer } from './post/reducers';
import { ChatReducer } from './chat/reducers';
const storage = require('redux-persist/lib/storage').default;
const reducers = {
    post: PostReducer,
    chat : ChatReducer,
};

const persistConfig = {
  key: 'root',
  storage,
};

// Setup Reducers
export const persistedRootReducer = persistCombineReducers(persistConfig, reducers);

export type RootState = ReturnType<typeof persistedRootReducer>;

export default persistedRootReducer;
