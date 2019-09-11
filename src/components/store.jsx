import { createStore } from 'redux';
var reducers = require("./reducer.jsx").default;

const store = createStore(reducers);
export default store;
