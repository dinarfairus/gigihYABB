import './App.css';

import { Provider } from 'react-redux';

import store from './store/store';
import AppRouter from './routes/Router';

//Switch in domVs5 = Routes in domVs6

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
