import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import { FileData, ConversionType, ConversionResult } from '../types/types';

export const convertFile = async (
  file: FileData,
  conversionType: ConversionType
): Promise<ConversionResult> => {
  switch (conversionType) {
    case 'csv-to-xlsx':
      return convertCsvToXlsx(file);
    case 'xlsx-to-csv':
      return convertXlsxToCsv(file);
    case 'json-to-csv':
      return convertJsonToCsv(file);
    case 'csv-to-json':
      return convertCsvToJson(file);
    case 'txt-to-pdf':
      return convertTxtToPdf(file);
    default:
      throw new Error(`Tipo de conversão não suportado: ${conversionType}`);
  }
};

const convertCsvToXlsx = (file: FileData): ConversionResult => {
  const parsed = Papa.parse(file.content, { header: true });
  const worksheet = XLSX.utils.json_to_sheet(parsed.data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
  const xlsxBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const filename = file.name.replace(/\.[^/.]+$/, '') + '.xlsx';
  
  return {
    content: xlsxBuffer,
    filename,
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  };
};

const convertXlsxToCsv = (file: FileData): ConversionResult => {
  const arrayBuffer = new Uint8Array(
    atob(file.content.split(',')[1])
      .split('')
      .map(char => char.charCodeAt(0))
  );
  
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const csvContent = XLSX.utils.sheet_to_csv(worksheet);
  
  const filename = file.name.replace(/\.[^/.]+$/, '') + '.csv';
  
  return {
    content: csvContent,
    filename,
    mimeType: 'text/csv'
  };
};

const convertJsonToCsv = (file: FileData): ConversionResult => {
  const jsonData = JSON.parse(file.content);
  const csvContent = Papa.unparse(jsonData);
  const filename = file.name.replace(/\.[^/.]+$/, '') + '.csv';
  
  return {
    content: csvContent,
    filename,
    mimeType: 'text/csv'
  };
};

const convertCsvToJson = (file: FileData): ConversionResult => {
  const parsed = Papa.parse(file.content, { header: true });
  const jsonContent = JSON.stringify(parsed.data, null, 2);
  const filename = file.name.replace(/\.[^/.]+$/, '') + '.json';
  
  return {
    content: jsonContent,
    filename,
    mimeType: 'application/json'
  };
};

const convertTxtToPdf = (file: FileData): ConversionResult => {
  const pdf = new jsPDF();
  const lines = file.content.split('\n');
  
  let yPosition = 20;
  const lineHeight = 10;
  const pageHeight = pdf.internal.pageSize.height;
  const margin = 20;
  
  lines.forEach((line) => {
    if (yPosition > pageHeight - margin) {
      pdf.addPage();
      yPosition = 20;
    }
    
    // Split long lines to fit page width
    const splitLines = pdf.splitTextToSize(line, 170);
    splitLines.forEach((splitLine: string) => {
      if (yPosition > pageHeight - margin) {
        pdf.addPage();
        yPosition = 20;
      }
      pdf.text(splitLine, 20, yPosition);
      yPosition += lineHeight;
    });
  });
  
  const pdfBuffer = pdf.output('arraybuffer');
  const filename = file.name.replace(/\.[^/.]+$/, '') + '.pdf';
  
  return {
    content: pdfBuffer,
    filename,
    mimeType: 'application/pdf'
  };
};