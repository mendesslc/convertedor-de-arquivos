import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileText, ArrowRightLeft } from 'lucide-react';
const Header = () => {
    return (_jsx("header", { className: "bg-white shadow-sm border-b", children: _jsxs("div", { className: "container mx-auto px-4 py-6", children: [_jsx("div", { className: "flex items-center justify-center", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "bg-primary p-2 rounded-lg", children: _jsx(FileText, { className: "h-8 w-8 text-white" }) }), _jsx(ArrowRightLeft, { className: "h-6 w-6 text-gray-400" }), _jsx("div", { className: "bg-success p-2 rounded-lg", children: _jsx(FileText, { className: "h-8 w-8 text-white" }) })] }) }), _jsxs("div", { className: "text-center mt-4", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Conversor de Arquivos" }), _jsx("p", { className: "text-gray-600 mt-2", children: "Converta seus arquivos entre diferentes formatos de forma r\u00E1pida e segura" })] })] }) }));
};
export default Header;
