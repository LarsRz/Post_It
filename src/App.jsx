import React, { useState, useEffect } from 'react';
import Postit from './Postit';
import './App.css';

const App = () => {
  const [postits, setPostits] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [importante, setImportante] = useState(false);

  useEffect(() => {
    const postitsGuardados = JSON.parse(localStorage.getItem('postits')) || [];
    setPostits(postitsGuardados);
  }, []);

  useEffect(() => {
    localStorage.setItem('postits', JSON.stringify(postits));
  }, [postits]);

  const agregarPostit = (e) => {
    e.preventDefault();
    if (!descripcion.trim()) {
      alert('La descripción es obligatoria');
      return;
    }

    const nuevoPostit = {
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      importante,
      rotacion: (Math.random() * 10 - 5).toFixed(2)
    };

    setPostits([...postits, nuevoPostit]);
    setTitulo('');
    setDescripcion('');
    setImportante(false);
  };

  const eliminarPostit = (indice) => {
    const nuevosPostits = postits.filter((_, i) => i !== indice);
    setPostits(nuevosPostits);
  };

  return (
    <div className="app-wrapper">
      <h1 className="titulo-fijo">Recordatorios Post It!</h1>

      <form onSubmit={agregarPostit} className="formulario-fijo">
        <label htmlFor="titulo" className="etiqueta">Título (opcional)</label>
        <input
          id="titulo"
          type="text"
          placeholder="Ej: Lista de Compras, Cosas por hacer ,etc."
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="campo"
        />

        <label htmlFor="descripcion" className="etiqueta">Descripción <span className="obligatorio">*</span></label>
        <textarea
          id="descripcion"
          placeholder="Ej: Ir al Supermercado, Realizar Trabajo Front End, etc."
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="campo area"
        />

        <div className="check-contenedor">
          <input
            type="checkbox"
            id="importante"
            checked={importante}
            onChange={(e) => setImportante(e.target.checked)}
          />
          <label htmlFor="importante">Importante</label>
        </div>

        <button type="submit" className="btn-agregar">Agregar Post-it</button>
      </form>

      <div className="grilla-postits">
        {postits.map((postit, indice) => (
          <Postit key={indice} postit={postit} eliminar={() => eliminarPostit(indice)} />
        ))}
      </div>
    </div>
  );
};

export default App;














