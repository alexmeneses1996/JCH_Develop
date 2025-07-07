import React, { useRef } from 'react'
import { QRCode } from 'react-qrcode-logo';

const QRyWhatsapp = ({id_cedula}) => {
const url = `https://jcreamoshistoria.vercel.app/nuevoRegistroLink/ ${id_cedula}`; // ← cambia esto por tu link
    const canvasRef = useRef(null);


    const compartirEnWhatsapp = () => {
        const texto = encodeURIComponent(`¡Hola! Te comparto el formulario para que te puedas registrar: ${url}`);
        const linkWhatsapp = `https://wa.me/?text=${texto}`;
        window.open(linkWhatsapp, '_blank');
    };




    return (
        <div style={{ textAlign: 'center' }}>


            <QRCode
                value={url}
                size={200}
                logoImage="https://res.cloudinary.com/dqgbna4ni/image/upload/v1749935686/logo_xnitmu.png" // opcional
                logoWidth={40}
                logoHeight={40}
            />

            <div style={{ marginTop: '20px' }}>
                <button
                    onClick={compartirEnWhatsapp}
                    style={{
                        backgroundColor: '#25D366',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        fontSize: '16px',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Compartir por WhatsApp
                </button>
      
            </div>
        </div>
    );
};

export default QRyWhatsapp