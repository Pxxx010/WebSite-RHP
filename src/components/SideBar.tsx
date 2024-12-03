import React from 'react';

type ViewType = 'consulta' | 'cadastro' | 'alta' | 'transferencia' | 'configuracao' | 'sair';

interface SidebarProps {
  onSelect: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h3 className="section-title">Gestão do Paciente</h3>
        <ul className="sidebar-list">
          <li className="sidebar-item" onClick={() => onSelect('consulta')}>Consulta de Paciente</li>
          <li className="sidebar-item" onClick={() => onSelect('cadastro')}>Cadastro de Paciente</li>
          <li className="sidebar-item" onClick={() => onSelect('transferencia')}>Transferência de Leito</li>
          <li className="sidebar-item" onClick={() => onSelect('alta')}>Alta Hospitalar</li>
        </ul>
      </div>
      <div className="sidebar-section">
        <h3 className="section-title">Outros</h3>
        <ul className="sidebar-list">
          <li className="sidebar-item" onClick={() => onSelect('configuracao')}>Configuração</li>
          <li className="sidebar-item logout" onClick={() => onSelect('sair')}>Sair</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
