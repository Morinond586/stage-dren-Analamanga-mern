import React from 'react';

const TestImprime = () => {
  const handlePrint = () => {
    const printSection = document.getElementById('print-section');
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('<style>@media print { .no-print { display: none; } }</style>'); // CSS for hiding elements not to be printed
    printWindow.document.write('</head><body >');
    printWindow.document.write(printSection.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div>
      <div id="print-section">
        <h1>Section à imprimer</h1>
        <p>Ceci est le contenu qui sera imprimé.</p>
      </div>
      <button onClick={handlePrint}>Imprimer la section</button>
      <div className="no-print">
        <p>Ceci est un contenu qui ne sera pas imprimé.</p>
      </div>
    </div>
  );
};

export default TestImprime;
