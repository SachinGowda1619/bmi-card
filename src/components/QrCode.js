import './QrCode.css'

import QRCode from "react-qr-code";
import html2pdf from 'html2pdf.js';

const handleQrDownload = () => {
    const element = document.getElementById('qr-container');

    html2pdf()
        .from(element)
        .set({
            margin: 10,
            filename: 'qr-code.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 4 },
            jsPDF: { unit: 'mm', format: 'a6', orientation: 'portrait' }
        })
        .save();
}

function QrCode() {
    return (
        <>
            <div className="Qr-container" id='qr-container'>
                <div className='Qr-Box'>
                    <QRCode
                        size={256}
                        style={{ height: "300px", width: "300px" }}
                        value={"https://SachinGowda1619.github.io/"}
                        bgColor='black'
                        fgColor='orange'
                    />
                </div>
                <div className='Qr-text'>
                    Scan here to download your card
                </div>
            </div>
            <div onClick={handleQrDownload} style={{justifySelf: 'center'}}>
                <button>
                    Download QR
                </button>
            </div>
        </>
    )
}

export default QrCode