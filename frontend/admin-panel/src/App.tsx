// src/App.tsx
import React from 'react';
import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  CustomRoutes,
} from 'react-admin';
import { Route } from 'react-router-dom';
import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';

export const App = () => (
  <Admin    
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}
  >
    {/* rota pública de registro, sem layout do Admin */}
    <CustomRoutes noLayout>
      <Route path="/register" element={<RegisterPage />} />
    </CustomRoutes>

    {/* recursos protegidos */}
    <Resource
      name="users"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
  </Admin>
);
