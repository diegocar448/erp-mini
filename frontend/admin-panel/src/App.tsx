import { Admin, Resource, CustomRoutes } from 'react-admin';
import { Route } from 'react-router-dom';

import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';

import { ProdutoList } from './pages/produto/ProdutoList';
import { ProdutoCreate } from './pages/produto/ProdutoCreate';
import { ProdutoEdit } from './pages/produto/ProdutoEdit';
import { ProdutoShow } from './pages/produto/ProdutoShow';

import CarrinhoPage from './pages/CarrinhoPage';
import PedidosPage from './pages/PedidosPage';

import { MyLayout } from './components/MyLayout';
import { CarrinhoProvider } from './context/CarrinhoContext';

const App = () => (
  <CarrinhoProvider>
    <Admin
      layout={MyLayout}
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
    >
      <CustomRoutes>
        <Route path="/carrinho" element={<CarrinhoPage />} />
        <Route path="/pedidos" element={<PedidosPage />} />
      </CustomRoutes>

      <CustomRoutes noLayout>
        <Route path="/register" element={<RegisterPage />} />
      </CustomRoutes>

      <Resource
        name="produto"
        list={ProdutoList}
        create={ProdutoCreate}
        edit={ProdutoEdit}
        show={ProdutoShow}
      />
    </Admin>
  </CarrinhoProvider>
);

export default App;
