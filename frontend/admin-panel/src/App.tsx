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

import { ProdutoList } from './pages/produto/ProdutoList';
import { ProdutoCreate } from './pages/produto/ProdutoCreate';
import { ProdutoEdit } from './pages/produto/ProdutoEdit';
import { ProdutoShow } from './pages/produto/ProdutoShow';

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
      name="produto"
      list={ProdutoList}
      create={ProdutoCreate}
      edit={ProdutoEdit}
      show={ProdutoShow}
    />

  </Admin>
);
