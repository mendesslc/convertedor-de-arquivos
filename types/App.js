import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from './components/Header';
import FileConverter from './components/FileConverter';
import Footer from './components/Footer';
function App() {
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100", children: [_jsx(Header, {}), _jsx("main", { className: "container mx-auto px-4 py-8", children: _jsx(FileConverter, {}) }), _jsx(Footer, {})] }));
}
export default App;
