import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Procesar = () => {
    const location = useLocation();
    const contenido = location.state ? location.state.contenido : [];
    const [currentPage, setCurrentPage] = useState(0);
    const [numpage, setNumpage] = useState("");
    const rowsPerPage = 25;

    // Calcular el total de páginas
    const totalPages = Math.ceil(contenido.length / rowsPerPage);

    // Cambiar a la página anterior
    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
    };

    // Cambiar a la página siguiente
    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages - 1));
    };

    // Buscar la página por número
    const handleSearchPage = () => {
        const pageNumber = parseInt(numpage, 10);
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber - 1);
        }
    };

    // Obtener datos de la página actual
    const startIndex = currentPage * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, contenido.length);
    const currentData = contenido.slice(startIndex, endIndex);

    return (
        <div>
            <h4>Conjunto de datos recopilados</h4>
            <br />

            <table className="table table-striped">
                <thead>
                    <tr>
                        {contenido[0] && contenido[0].map((item: any, index: number) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((row: any, index: number) => (
                        <tr key={index}>
                            {row.map((item: any, index: number) => (
                                <td key={index}>{item}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 0}>Anterior</button>
                <span> Página {currentPage + 1} de {totalPages} </span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>Siguiente</button>
                <input
                    type="number"
                    value={numpage}
                    onChange={(e) => setNumpage(e.target.value)}
                    min="1"
                    max={totalPages}
                />
                <button onClick={handleSearchPage}>Buscar</button>
            </div>
        </div>
    );
}

export default Procesar;
