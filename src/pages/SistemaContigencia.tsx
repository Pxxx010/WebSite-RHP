import { useState } from 'react';
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/SideBar";
import FormConsulta from "@/components/FormConsulta";
import FormCadastro from "@/components/FormCadastro";
import FormAlta from "@/components/FormAlta";
import FormTransferencia from "@/components/FormTransferencia";

type ViewType = 'consulta' | 'cadastro' | 'alta' | 'transferencia' | 'configuracao' | 'sair';

const Home: React.FC = () => {
  const [view, setView] = useState<ViewType>('consulta');

  const renderView = () => {
    switch (view) {
      case 'consulta':
        return <FormConsulta />;
      case 'cadastro':
        return <FormCadastro />;
      case 'alta':
        return <FormAlta />;
      case 'transferencia':
        return <FormTransferencia />;
      default:
        return <FormConsulta />;
    }
  };

  return (
    <main>
      <div className='BackgroundTotal'>
      <NavBar />
      <div className="AjusteSideBar">
        <Sidebar onSelect={setView} />
        {renderView()}
      </div>
      </div>
    </main>
  );
};

export default Home;
