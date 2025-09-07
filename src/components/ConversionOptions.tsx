import React from 'react';
import { ConversionType } from '../types/types';
import { FileSpreadsheet, FileJson, FileText, File } from 'lucide-react';

interface ConversionOptionsProps {
  selectedConversion: ConversionType;
  onConversionChange: (conversion: ConversionType) => void;
}

const ConversionOptions: React.FC<ConversionOptionsProps> = ({
  selectedConversion,
  onConversionChange,
}) => {
  const conversions: Array<{
    id: ConversionType;
    label: string;
    description: string;
    icon: React.ReactNode;
    fromColor: string;
    toColor: string;
  }> = [
    {
      id: 'csv-to-xlsx',
      label: 'CSV → XLSX',
      description: 'Converta arquivos CSV para Excel',
      icon: <FileSpreadsheet className="h-5 w-5" />,
      fromColor: 'text-green-600',
      toColor: 'text-blue-600'
    },
    {
      id: 'xlsx-to-csv',
      label: 'XLSX → CSV',
      description: 'Converta arquivos Excel para CSV',
      icon: <FileSpreadsheet className="h-5 w-5" />,
      fromColor: 'text-blue-600',
      toColor: 'text-green-600'
    },
    {
      id: 'json-to-csv',
      label: 'JSON → CSV',
      description: 'Converta arquivos JSON para CSV',
      icon: <FileJson className="h-5 w-5" />,
      fromColor: 'text-yellow-600',
      toColor: 'text-green-600'
    },
    {
      id: 'csv-to-json',
      label: 'CSV → JSON',
      description: 'Converta arquivos CSV para JSON',
      icon: <FileJson className="h-5 w-5" />,
      fromColor: 'text-green-600',
      toColor: 'text-yellow-600'
    },
    {
      id: 'txt-to-pdf',
      label: 'TXT → PDF',
      description: 'Converta arquivos de texto para PDF',
      icon: <FileText className="h-5 w-5" />,
      fromColor: 'text-gray-600',
      toColor: 'text-red-600'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Escolha o tipo de conversão
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {conversions.map((conversion) => (
          <div
            key={conversion.id}
            onClick={() => onConversionChange(conversion.id)}
            className={`
              cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md
              ${selectedConversion === conversion.id
                ? 'border-primary bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <div className="flex items-center space-x-3">
              <div className={`
                p-2 rounded-lg
                ${selectedConversion === conversion.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}
              `}>
                {conversion.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {conversion.label}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {conversion.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversionOptions;