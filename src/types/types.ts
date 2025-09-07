export interface FileData {
  name: string;
  size: number;
  type: string;
  content: string;
  originalFile: File;
}

export type ConversionType = 
  | 'csv-to-xlsx'
  | 'xlsx-to-csv'
  | 'json-to-csv'
  | 'csv-to-json'
  | 'txt-to-pdf';

export interface ConversionResult {
  content: string | ArrayBuffer;
  filename: string;
  mimeType: string;
}