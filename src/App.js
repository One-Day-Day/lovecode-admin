import React from 'react';

import './App.css';
import DefaultStore from './store';
import {Provider} from 'react-redux';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {Menu} from 'antd';
import './antd-theme.less';
import ProblemListContainer from './containers/problem-management/list'
import LoginContainer from './containers/login';

function PrivateRoute({children, ...rest}) {
    return (
      <Route
          {...rest}
          render={({location}) => DefaultStore.getState().auth.token === null ? <Redirect to={{pathname:'/login', from: location}}/> : children}
      />
    );
}

function App() {
    return (
        <Provider store={DefaultStore}>
            <BrowserRouter>
                <div className='App'>
                    <Route path='/login'>
                        <LoginContainer/>
                    </Route>
                    <PrivateRoute path='/admin'>
                        <div className='aside'>
                            <Menu theme='dark' defaultSelectedKeys={['problem-management']}>
                                <Menu.Item key='problem-management'>
                                    <span>问题管理</span>
                                </Menu.Item>
                            </Menu>
                        </div>
                        <div className='main'>
                            <Switch>
                                <Route path='/admin/problems' component={ProblemListContainer}/>
                            </Switch>
                        </div>
                    </PrivateRoute>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
