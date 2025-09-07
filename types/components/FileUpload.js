import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState } from 'react';
import { Upload, File, AlertCircle } from 'lucide-react';
const FileUpload = ({ onFilesAdded, acceptedFormats }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [error, setError] = useState(null);
    const processFiles = useCallback(async (fileList) => {
        const filesArray = Array.from(fileList);
        const processedFiles = [];
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
            }
            catch (err) {
                console.error(`Erro ao processar arquivo ${file.name}:`, err);
                setError(`Erro ao processar arquivo ${file.name}`);
            }
        }
        if (processedFiles.length > 0) {
            onFilesAdded(processedFiles);
            setError(null);
        }
    }, [onFilesAdded]);
    const readFileContent = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    };
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragOver(false);
        processFiles(e.dataTransfer.files);
    }, [processFiles]);
    const handleFileInput = useCallback((e) => {
        if (e.target.files) {
            processFiles(e.target.files);
        }
    }, [processFiles]);
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);
    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);
    return (_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Adicionar arquivos" }), error && (_jsxs("div", { className: "mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2", children: [_jsx(AlertCircle, { className: "h-5 w-5 text-red-500" }), _jsx("span", { className: "text-red-700 text-sm", children: error })] })), _jsx("div", { onDrop: handleDrop, onDragOver: handleDragOver, onDragLeave: handleDragLeave, className: `
          border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
          ${isDragOver
                    ? 'border-primary bg-blue-50 border-solid'
                    : 'border-gray-300 hover:border-gray-400'}
        `, children: _jsxs("div", { className: "flex flex-col items-center space-y-4", children: [_jsx("div", { className: `
            p-4 rounded-full
            ${isDragOver ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}
          `, children: _jsx(Upload, { className: "h-8 w-8" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-lg font-medium text-gray-900", children: "Arraste seus arquivos aqui" }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: "ou clique para selecionar" })] }), _jsx("input", { type: "file", multiple: true, accept: acceptedFormats, onChange: handleFileInput, className: "hidden", id: "file-input" }), _jsxs("label", { htmlFor: "file-input", className: "convert-button cursor-pointer inline-flex items-center space-x-2", children: [_jsx(File, { className: "h-4 w-4" }), _jsx("span", { children: "Selecionar Arquivos" })] }), _jsxs("p", { className: "text-xs text-gray-400", children: ["Formatos aceitos: ", acceptedFormats.replace(/\./g, '').toUpperCase()] })] }) })] }));
};
export default FileUpload;
