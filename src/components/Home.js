import { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { PDFDocument } from 'pdf-lib';

import './Home.css';

import BmiCard from './BmiCard';
import appData from '../utility/utility';

function Home() {
    const [number, setNumber] = useState('');

    const removePageFromPDFBlob = async (pdfBlob, pageToRemove) => {
        const arrayBuffer = await pdfBlob.arrayBuffer();
        const originalPdf = await PDFDocument.load(arrayBuffer);

        const newPdf = await PDFDocument.create();
        const totalPages = originalPdf.getPageCount();

        for (let i = 0; i < totalPages; i++) {
            if (i === pageToRemove) continue;
            const [copiedPage] = await newPdf.copyPages(originalPdf, [i]);
            newPdf.addPage(copiedPage);
        }

        const modifiedBytes = await newPdf.save();
        return new Blob([modifiedBytes], { type: 'application/pdf' });
    };

    const generatePDFBlob = async (elementId) => {
        const element = document.getElementById(elementId);

        return await html2pdf()
            .from(element)
            .set({
                margin: 10,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a5', orientation: 'portrait' },
            })
            .outputPdf('blob');
    };

    const handleSubmit = async () => {

        const element1 = document.getElementById(appData.traineesData[number] ? 'bmiCard-container' : 'no-data-found');
        const element2 = document.getElementById(appData.traineesData[number] ? 'bmiCard-container2' : 'no-data-found');

        const A5_HEIGHT_MM = 210;
        const mmToPx = (mm) => mm / 0.264583;
        const a5HeightPx = mmToPx(A5_HEIGHT_MM);

        const contentHeightPx1 = element1.offsetHeight;
        const contentHeightPx2 = element2.offsetHeight;

        const scaleH1 = a5HeightPx / contentHeightPx1;
        const scaleH2 = a5HeightPx / contentHeightPx2;

        const scale1 = Math.min(1, scaleH1 ? 0.85 : 1);
        element1.style.transform = `scaleY(${scale1})`;
        element1.style.transformOrigin = 'top left';

        const scale2 = Math.min(1, scaleH2 ? 0.85 : 1);
        element2.style.transform = `scaleY(${scale2})`;
        element2.style.transformOrigin = 'top left';

        const blob1 = await generatePDFBlob('bmiCard-container');
        const blob2 = await generatePDFBlob('bmiCard-container2');

        const bytes1 = await blob1.arrayBuffer();
        const bytes2 = await blob2.arrayBuffer();

        const mergedPdf = await PDFDocument.create();
        const pdf1 = await PDFDocument.load(bytes1);
        const pdf2 = await PDFDocument.load(bytes2);

        const copiedPages1 = await mergedPdf.copyPages(pdf1, pdf1.getPageIndices());
        copiedPages1.forEach((page) => mergedPdf.addPage(page));

        const copiedPages2 = await mergedPdf.copyPages(pdf2, pdf2.getPageIndices());
        copiedPages2.forEach((page) => mergedPdf.addPage(page));

        const mergedBytes = await mergedPdf.save();

        let mergedBlob = new Blob([mergedBytes], { type: 'application/pdf' });

        mergedBlob = await removePageFromPDFBlob(mergedBlob, 1);
        mergedBlob = await removePageFromPDFBlob(mergedBlob, 2);

        const link = document.createElement('a');
        link.href = URL.createObjectURL(mergedBlob);
        link.download = 'Bmi-Card.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="home">
            <h1 className="home-title">
                Enter your number
            </h1>
            <div className="home-input">
                <input
                    type="number"
                    placeholder="Phone number"
                    value={number}
                    max={10}
                    onChange={e => setNumber(e.target.value)}
                    pattern="-?[0-9]+"
                />
                <button onClick={handleSubmit} disabled={number.length === 10 && appData.traineesData[number] ? false : true}>
                    Download
                </button>
            </div>
            <div style={{display:'none'}}>
                {number.length === 10 && <BmiCard number={number} />}
            </div>
            {number.length === 10 && !appData.traineesData[number] &&
                <div className='error-banner'>
                    Oops!!! No data found
                </div>
            }
            {number.length > 0 && number.length !== 10 &&
                <div className='error-banner'>
                    Enter a valid 10 digit number
                </div>
            }
        </div>
    );
}

export default Home;
