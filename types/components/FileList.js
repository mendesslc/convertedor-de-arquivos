import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { File, Download, Trash2, X } from 'lucide-react';
import { convertFile } from '../utils/fileConverter';
const FileList = ({ files, conversionType, onFileRemove, onClearAll, }) => {
    const formatFileSize = (bytes) => {
        if (bytes === 0)
            return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    const handleConvert = async (file, index) => {
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
        }
        catch (error) {
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
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("h3", { className: "text-lg font-semibold text-gray-900", children: ["Arquivos (", files.length, ")"] }), _jsxs("div", { className: "flex space-x-2", children: [files.length > 1 && (_jsxs("button", { onClick: handleConvertAll, className: "bg-success hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2", children: [_jsx(Download, { className: "h-4 w-4" }), _jsx("span", { children: "Converter Todos" })] })), _jsxs("button", { onClick: onClearAll, className: "bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2", children: [_jsx(X, { className: "h-4 w-4" }), _jsx("span", { children: "Limpar" })] })] })] }), _jsx("div", { className: "space-y-3", children: files.map((file, index) => (_jsx("div", { className: "file-item", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "bg-blue-100 p-2 rounded-lg", children: _jsx(File, { className: "h-5 w-5 text-blue-600" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-900", children: file.name }), _jsx("p", { className: "text-sm text-gray-500", children: formatFileSize(file.size) })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("button", { onClick: () => handleConvert(file, index), className: "bg-primary hover:bg-secondary text-white font-medium py-2 px-3 rounded-lg transition-colors flex items-center space-x-2", children: [_jsx(Download, { className: "h-4 w-4" }), _jsx("span", { children: "Converter" })] }), _jsx("button", { onClick: () => onFileRemove(index), className: "bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors", children: _jsx(Trash2, { className: "h-4 w-4" }) })] })] }) }, index))) })] }));
};
export default FileList;
