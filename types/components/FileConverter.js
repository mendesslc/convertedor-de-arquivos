import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import FileUpload from './FileUpload';
import ConversionOptions from './ConversionOptions';
import FileList from './FileList';
const FileConverter = () => {
    const [files, setFiles] = useState([]);
    const [selectedConversion, setSelectedConversion] = useState('csv-to-xlsx');
    const handleFilesAdded = (newFiles) => {
        setFiles(prev => [...prev, ...newFiles]);
    };
    const handleFileRemove = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };
    const handleClearAll = () => {
        setFiles([]);
    };
    return (_jsx("div", { className: "max-w-4xl mx-auto", children: _jsxs("div", { className: "bg-white rounded-xl shadow-lg p-8", children: [_jsx(ConversionOptions, { selectedConversion: selectedConversion, onConversionChange: setSelectedConversion }), _jsx("div", { className: "mt-8", children: _jsx(FileUpload, { onFilesAdded: handleFilesAdded, acceptedFormats: getAcceptedFormats(selectedConversion) }) }), files.length > 0 && (_jsx("div", { className: "mt-8", children: _jsx(FileList, { files: files, conversionType: selectedConversion, onFileRemove: handleFileRemove, onClearAll: handleClearAll }) }))] }) }));
};
const getAcceptedFormats = (conversionType) => {
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
