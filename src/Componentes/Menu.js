import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  IconDashboard, 
  IconFileDescription, 
  IconBuilding, 
  IconClipboardList,
  IconChartBar,
  IconGavel,
  IconUsers,
  IconLogout,
  IconChevronRight,
  IconFiles,
  IconPackage,
  IconClipboard,
  IconAlertTriangle
} from '@tabler/icons-react';
import '../Estilos/Menu.css';

const MenuItem = ({ icon, text, to, hasSubmenu, isOpen, onClick, children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="menu-item" onClick={onClick}>
        {icon}
        <span>{text}</span>
        {hasSubmenu && (
          <IconChevronRight 
            className={`submenu-arrow ${isOpen ? 'rotated' : ''}`}
            size={16}
          />
        )}
        {to && <NavLink to={to} className="menu-link" />}
      </div>
      {hasSubmenu && isOpen && (
        <div className="submenu">
          {children}
        </div>
      )}
    </motion.div>
  );
};

const Menu = () => {
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const menuItems = [
    { icon: <IconDashboard />, text: 'Dashboard', to: '/dashboard' },
    { icon: <IconFileDescription />, text: 'Solicitudes', to: '/solicitudes' },
    {
      icon: <IconBuilding />,
      text: 'Establecimientos',
      hasSubmenu: true,
      submenuItems: [
        { text: 'Lista de Establecimientos', to: '/establecimientos' },
        { text: 'Inspecciones Pendientes', to: '/establecimientos/pendientes' }
      ]
    },
    { icon: <IconClipboardList />, text: 'Inspecciones', to: '/inspecciones' },
    { icon: <IconPackage />, text: 'Lotes de Productos', to: '/lotes' },
    { icon: <IconChartBar />, text: 'Resultados', to: '/resultados' },
    { icon: <IconGavel />, text: 'Sanciones', to: '/sanciones' },
    { icon: <IconFiles />, text: 'Documentos', to: '/documentos' },
    { icon: <IconClipboard />, text: 'Normativas', to: '/normativas' },
    { icon: <IconAlertTriangle />, text: 'Alertas', to: '/alertas' },
  ];

  return (
    <motion.div 
      className="menu-container"
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="menu-header">
        <h2>Dashboard</h2>
      </div>

      <div className="menu-items">
        {menuItems.map((item, index) => (
          <MenuItem 
            key={index} 
            icon={item.icon} 
            text={item.text} 
            to={item.hasSubmenu ? null : item.to}
            hasSubmenu={item.hasSubmenu}
            isOpen={item.hasSubmenu && openSubmenu}
            onClick={item.hasSubmenu ? () => setOpenSubmenu(!openSubmenu) : null}
          >
            {item.hasSubmenu && item.submenuItems.map((subItem, subIndex) => (
              <NavLink 
                key={subIndex} 
                to={subItem.to}
                className="submenu-item"
              >
                {subItem.text}
              </NavLink>
            ))}
          </MenuItem>
        ))}
      </div>

      <div className="menu-footer">
        <MenuItem 
          icon={<IconUsers />} 
          text="Usuarios" 
          to="/usuarios"
        />
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <button 
            className="logout-button"
            onClick={handleLogout}
          >
            <IconLogout />
            <span>Cerrar sesión</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Menu;
