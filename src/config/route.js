import React from 'react';
import TabsContainer from '../containers/base/TabsContainer';
import TabsManager from '../containers/base/TabsManager';
import ProblemListContainer from '../containers/problem-management/list';

const routes = [
  {
    title: '问题管理',
    key: 'problem-management',
    path: '/admin/problem-management/problems',
    // eslint-disable-next-line react/display-name
    render: () => {
      const manager = new TabsManager();
      manager.addTabPane({
        component: ProblemListContainer,
        options: { closable: false, tab: '问题列表' },
      });
      return (<TabsContainer manager={manager} />);
    },
  },
];

export default routes;
