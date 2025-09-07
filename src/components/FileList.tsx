import React from 'react';
import { FileData, ConversionType } from '../types/types';
import { File, Download, Trash2, X } from 'lucide-react';
import { convertFile } from '../utils/fileConverter';

interface FileListProps {
  files: FileData[];
  conversionType: ConversionType;
  onFileRemove: (index: number) => void;
  onClearAll: () => void;
}

const FileList: React.FC<FileListProps> = ({
  files,
  conversionType,
  onFileRemove,
  onClearAll,
}) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleConvert = async (file: FileData, index: number) => {
    try {
      const result = await convertFile(file, conversionType);
      
      // Create download link
      const blob = new Blob([result.content], { type: result.mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro na conversão:', error);
      alert('Erro ao converter arquivo. Verifique se o formato está correto.');
    }
  };

  const handleConvertAll = async () => {
    for (let i = 0; i < files.length; i++) {
      await handleConvert(files[i], i);
      // Small delay between downloads to avoid browser blocking
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Arquivos ({files.length})
        </h3>
        <div className="flex space-x-2">
          {files.length > 1 && (
            <button
              onClick={handleConvertAll}
              className="bg-success hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Converter Todos</span>
            </button>
          )}
          <button
            onClick={onClearAll}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Limpar</span>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {files.map((file, index) => (
          <div key={index} className="file-item">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <File className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleConvert(file, index)}
                  className="bg-primary hover:bg-secondary text-white font-medium py-2 px-3 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Converter</span>
                </button>
                <button
                  onClick={() => onFileRemove(index)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;