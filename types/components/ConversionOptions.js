import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileSpreadsheet, FileJson, FileText } from 'lucide-react';
const ConversionOptions = ({ selectedConversion, onConversionChange, }) => {
    const conversions = [
        {
            id: 'csv-to-xlsx',
            label: 'CSV → XLSX',
            description: 'Converta arquivos CSV para Excel',
            icon: _jsx(FileSpreadsheet, { className: "h-5 w-5" }),
            fromColor: 'text-green-600',
            toColor: 'text-blue-600'
        },
        {
            id: 'xlsx-to-csv',
            label: 'XLSX → CSV',
            description: 'Converta arquivos Excel para CSV',
            icon: _jsx(FileSpreadsheet, { className: "h-5 w-5" }),
            fromColor: 'text-blue-600',
            toColor: 'text-green-600'
        },
        {
            id: 'json-to-csv',
            label: 'JSON → CSV',
            description: 'Converta arquivos JSON para CSV',
            icon: _jsx(FileJson, { className: "h-5 w-5" }),
            fromColor: 'text-yellow-600',
            toColor: 'text-green-600'
        },
        {
            id: 'csv-to-json',
            label: 'CSV → JSON',
            description: 'Converta arquivos CSV para JSON',
            icon: _jsx(FileJson, { className: "h-5 w-5" }),
            fromColor: 'text-green-600',
            toColor: 'text-yellow-600'
        },
        {
            id: 'txt-to-pdf',
            label: 'TXT → PDF',
            description: 'Converta arquivos de texto para PDF',
            icon: _jsx(FileText, { className: "h-5 w-5" }),
            fromColor: 'text-gray-600',
            toColor: 'text-red-600'
        }
    ];
    return (_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-900 mb-6", children: "Escolha o tipo de convers\u00E3o" }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4", children: conversions.map((conversion) => (_jsx("div", { onClick: () => onConversionChange(conversion.id), className: `
              cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md
              ${selectedConversion === conversion.id
                        ? 'border-primary bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'}
            `, children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `
                p-2 rounded-lg
                ${selectedConversion === conversion.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}
              `, children: conversion.icon }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold text-gray-900", children: conversion.label }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: conversion.description })] })] }) }, conversion.id))) })] }));
};
export default ConversionOptions;
