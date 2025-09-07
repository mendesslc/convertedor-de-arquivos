import React, { useState } from 'react';
import FileUpload from './FileUpload';
import ConversionOptions from './ConversionOptions';
import FileList from './FileList';
import { FileData, ConversionType } from '../types/types';

const FileConverter: React.FC = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [selectedConversion, setSelectedConversion] = useState<ConversionType>('csv-to-xlsx');

  const handleFilesAdded = (newFiles: FileData[]) => {
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleFileRemove = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setFiles([]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <ConversionOptions
          selectedConversion={selectedConversion}
          onConversionChange={setSelectedConversion}
        />
        
        <div className="mt-8">
          <FileUpload
            onFilesAdded={handleFilesAdded}
            acceptedFormats={getAcceptedFormats(selectedConversion)}
          />
        </div>

        {files.length > 0 && (
          <div className="mt-8">
            <FileList
              files={files}
              conversionType={selectedConversion}
              onFileRemove={handleFileRemove}
              onClearAll={handleClearAll}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const getAcceptedFormats = (conversionType: ConversionType): string => {
  switch (conversionType) {
    case 'csv-to-xlsx':
      return '.csv';
    case 'xlsx-to-csv':
      return '.xlsx,.xls';
    case 'json-to-csv':
      return '.json';
    case 'csv-to-json':
      return '.csv';
    case 'txt-to-pdf':
      return '.txt';
    default:
      return '*';
  }
};

export default FileConverter;