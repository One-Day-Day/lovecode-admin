import React from 'react';

import './App.css';
import DefaultStore from './store';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Menu} from 'antd';
import './antd-theme.less';
import ProblemListContainer from './containers/problem-management/list'

function App() {
    return (
        <Provider store={DefaultStore}>
            <BrowserRouter>
                <div className='App'>
                    <div className='aside'>
                        <Menu theme='dark' defaultSelectedKeys={['problem-management']}>
                            <Menu.Item key='problem-management'>
                                <span>问题管理</span>
                            </Menu.Item>
                        </Menu>
                    </div>
                    <div className='main'>
                        <Switch>
                            <Route path='/problems' component={ProblemListContainer}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
