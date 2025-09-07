import React, { useCallback, useState } from 'react';
import { Upload, File, AlertCircle } from 'lucide-react';
import { FileData } from '../types/types';

interface FileUploadProps {
  onFilesAdded: (files: FileData[]) => void;
  acceptedFormats: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesAdded, acceptedFormats }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFiles = useCallback(async (fileList: FileList) => {
    const filesArray = Array.from(fileList);
    const processedFiles: FileData[] = [];

    for (const file of filesArray) {
      try {
        const content = await readFileContent(file);
        processedFiles.push({
          name: file.name,
          size: file.size,
          type: file.type,
          content,
          originalFile: file
        });
      } catch (err) {
        console.error(`Erro ao processar arquivo ${file.name}:`, err);
        setError(`Erro ao processar arquivo ${file.name}`);
      }
    }

    if (processedFiles.length > 0) {
      onFilesAdded(processedFiles);
      setError(null);
    }
  }, [onFilesAdded]);

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  }, [processFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Adicionar arquivos
      </h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <span className="text-red-700 text-sm">{error}</span>
        </div>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
          ${isDragOver
            ? 'border-primary bg-blue-50 border-solid'
            : 'border-gray-300 hover:border-gray-400'
          }
        `}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className={`
            p-4 rounded-full
            ${isDragOver ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}
          `}>
            <Upload className="h-8 w-8" />
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-900">
              Arraste seus arquivos aqui
            </p>
            <p className="text-sm text-gray-500 mt-1">
              ou clique para selecionar
            </p>
          </div>

          <input
            type="file"
            multiple
            accept={acceptedFormats}
            onChange={handleFileInput}
            className="hidden"
            id="file-input"
          />
          
          <label
            htmlFor="file-input"
            className="convert-button cursor-pointer inline-flex items-center space-x-2"
          >
            <File className="h-4 w-4" />
            <span>Selecionar Arquivos</span>
          </label>

          <p className="text-xs text-gray-400">
            Formatos aceitos: {acceptedFormats.replace(/\./g, '').toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;