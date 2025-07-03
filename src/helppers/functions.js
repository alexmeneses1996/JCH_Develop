import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToExcel = (data, fileName = 'reporte.xlsx') => {
  // 1. Convertir datos a hoja
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  // 2. Agregar la hoja al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

  // 3. Escribir el libro a un archivo binario
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // 4. Guardar el archivo
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, fileName);
};



export function capitalizarCadaPalabra(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(' ');
}


export function ordenarComuna(comunaDataRaw) {
  const comunaData = [...comunaDataRaw].sort((a, b) => {
  const numeroA = parseInt(a.name.toLowerCase().replace('comuna ', ''), 10);
  const numeroB = parseInt(b.name.toLowerCase().replace('comuna ', ''), 10);
  return numeroA - numeroB;
});

return comunaData
}


