import React from 'react';
import { Shield, Zap, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Shield className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-semibold text-gray-900">100% Seguro</h3>
            <p className="text-gray-600 text-sm">
              Todos os arquivos são processados localmente no seu navegador
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Zap className="h-8 w-8 text-success mb-2" />
            <h3 className="font-semibold text-gray-900">Rápido</h3>
            <p className="text-gray-600 text-sm">
              Conversões instantâneas sem necessidade de upload
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Globe className="h-8 w-8 text-warning mb-2" />
            <h3 className="font-semibold text-gray-900">Gratuito</h3>
            <p className="text-gray-600 text-sm">
              Use quantas vezes quiser, sem limites ou custos
            </p>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Conversor de Arquivos - MendessDev. Seus dados permanecem privados e seguros.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;