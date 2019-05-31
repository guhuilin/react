import React from 'react';
import ReactDOM from 'react-dom';
import "lib-flexible"
import './index.css';
import { Provider } from 'mobx-react'
import stores from './store/index';
import 'antd/lib/date-picker/style/css';
import 'antd-mobile/dist/antd-mobile.css';
import RouterConfig from './router/routerConfig';
import FastClick from 'fastclick';
import './util/animate.css'
FastClick.attach(document.body);

ReactDOM.render(<Provider {...stores}><RouterConfig /></Provider>, document.getElementById('root'));



