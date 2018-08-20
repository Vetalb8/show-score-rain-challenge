import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { loggers } from 'redux-act'
import reducers from './reducers'

import App from './components/App/App'


const logger = createLogger({
  ...loggers.reduxLogger,
});

const store = createStore(
  reducers,
  compose(
    applyMiddleware(logger),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

const rootEl = document.getElementById('root')

const render = (Component) =>
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    rootEl
  )

render(App)

if (module.hot) {
  module.hot.accept('./components/App/App', () => {
    render(App)
  })

  module.hot.accept('./reducers', () => {
    return store.replaceReducer(reducers);
  });
}

