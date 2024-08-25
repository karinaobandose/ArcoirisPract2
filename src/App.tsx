import React from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { usePapaParse } from 'react-papaparse';

import { Button } from 'react-bootstrap';

function App() {
    const [txtArchi, setTxtArchi] = useState(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    let navigate = useNavigate()

    const { readString } = usePapaParse();

    const CargarArchivo = (event: any) => {
        setTxtArchi(event.target.files[0]);
    }

    const ProcesarArchivo = () => {
        if(txtArchi != null) {
            const reader = new FileReader();

            reader.onload = async (e) => {
                if(e.target == null) return;
                const csv = e.target.result as string;
                // @ts-ignore
                const results = readString(csv);
                // @ts-ignore
                navigate('/procesar', {state: {contenido: results.data}});
            }

            reader.readAsText(txtArchi);
        }
    }

    return (
        <div>
            <h4>Lectura de archivo</h4>
            <input type="file" onChange={CargarArchivo}/>
            <br/>
            <Button variant="primary" onClick={ProcesarArchivo}>
                        Procesar archivo
            </Button>
        </div>
    );
}

export default App;
