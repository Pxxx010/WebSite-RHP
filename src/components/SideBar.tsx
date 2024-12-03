// Sidebar.tsx
import React from 'react';

type ViewType = 'consulta' | 'cadastro' | 'alta' | 'transferencia' | 'configuracao' | 'sair';

interface SidebarProps {
  onSelect: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h3>Gestão do Paciente</h3>
        <ul>
          <li onClick={() => onSelect('consulta')}>Consulta de Paciente</li>
          <li onClick={() => onSelect('cadastro')}>Cadastro de Paciente</li>
          <li onClick={() => onSelect('transferencia')}>Transferência de Leito</li>
          <li onClick={() => onSelect('alta')}>Alta Hospitalar</li>
        </ul>
      </div>
      <div className="sidebar-section">
        <h3>Outros</h3>
        <ul>
          <li onClick={() => onSelect('configuracao')}>Configuração</li>
          <li style={{ color: 'red' }} onClick={() => onSelect('sair')}>Sair</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
