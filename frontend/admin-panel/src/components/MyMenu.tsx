import { Menu } from 'react-admin';
import { Dashboard as DashboardIcon, ShoppingCart, List } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const MyMenu = () => {
  const navigate = useNavigate();

  return (
    <Menu>
      <Menu.DashboardItem />
      <Menu.Item to="/produto" primaryText="Produtos" leftIcon={<List />} />
      <Menu.Item to="/carrinho" primaryText="Carrinho" leftIcon={<ShoppingCart />} />
      <Menu.Item to="/pedidos" primaryText="Pedidos" leftIcon={<DashboardIcon />} />
    </Menu>
  );
};
