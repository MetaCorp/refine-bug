import { Refine } from '@pankod/refine-core';
import {
  notificationProvider,
  ErrorComponent,
  AuthPage,
} from '@pankod/refine-antd';
import { dataProvider, liveProvider } from '@pankod/refine-supabase';
import routerProvider from '@pankod/refine-react-router-v6';
import { GoogleOutlined } from '@ant-design/icons';

import '@pankod/refine-antd/dist/reset.css';

import { PostList } from 'pages/posts';
import { supabaseClient } from 'utility';
import authProvider from 'authProvider';

import { Layout } from 'layout/Layout';

const App: React.FC = () => {
  return (
    <Refine
      dataProvider={dataProvider(supabaseClient)}
      liveProvider={liveProvider(supabaseClient)}
      routerProvider={{
        ...routerProvider,
        routes: [
          {
            path: '/register',
            element: <AuthPage type="register" />,
          },
          {
            path: '/forgot-password',
            element: <AuthPage type="forgotPassword" />,
          },
          {
            path: '/update-password',
            element: <AuthPage type="updatePassword" />,
          },
        ],
      }}
      authProvider={authProvider}
      LoginPage={() => (
        <AuthPage
          type="login"
          providers={[
            {
              name: 'google',
              label: 'Sign in with Google',
              icon: <GoogleOutlined style={{ fontSize: 18, lineHeight: 0 }} />,
            },
          ]}
          formProps={{
            initialValues: {
              email: 'info@refine.dev',
              password: 'refine-supabase',
            },
          }}
        />
      )}
      resources={[
        {
          name: 'posts',
          list: PostList,
        },
      ]}
      options={{ liveMode: 'auto' }}
      notificationProvider={notificationProvider}
      Layout={Layout}
      catchAll={<ErrorComponent />}
    />
  );
};

export default App;
