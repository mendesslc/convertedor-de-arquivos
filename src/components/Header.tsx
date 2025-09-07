import React from 'react';
import { FileText, ArrowRightLeft } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="bg-primary p-2 rounded-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <ArrowRightLeft className="h-6 w-6 text-gray-400" />
            <div className="bg-success p-2 rounded-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Conversor de Arquivos
          </h1>
          <p className="text-gray-600 mt-2">
            Converta seus arquivos entre diferentes formatos de forma rápida e segura
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;