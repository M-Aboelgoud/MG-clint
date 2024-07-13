import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import '../App.css'; // Import the CSS file

const DownloadButton = ({ forms }) => {
    const downloadExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Forms');

        worksheet.columns = [
            { header: 'Name', key: 'name', width: 30 },
            { header: 'Phone Number', key: 'phoneNumber', width: 20 },
            { header: 'location', key: 'location', width: 20 },
            { header: 'contact Date', key: 'contactDate', width: 20 },
        ];

        forms.forEach(form => {
            worksheet.addRow({
                name: form.name,
                phoneNumber: form.phoneNumber,
                location: form.location,
                contactDate: new Date(form.contactDate).toISOString().split('T')[0]
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'forms.xlsx');
    };

    return <button className="download-button" onClick={downloadExcel}>Download Excel</button>;
};

export default DownloadButton;
