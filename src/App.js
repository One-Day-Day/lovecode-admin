import React from 'react';

import './App.css';
import DefaultStore from './store';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import { Menu, Tabs, Table } from 'antd';
import './antd-theme.less';

function App() {
    return (
        <Provider store={DefaultStore}>
            <BrowserRouter>
                <div className="App">
                    <div className='aside'>
                        <Menu theme='dark' defaultSelectedKeys={['problem-management']}>
                            <Menu.Item key='problem-management'>
                                <span>问题管理</span>
                            </Menu.Item>
                        </Menu>
                    </div>
                    <div className='main'>
                        <Tabs type='editable-card'>
                            <Tabs.TabPane tab='问题管理' key='problem-management' closable={false}></Tabs.TabPane>
                        </Tabs>
                    </div>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
