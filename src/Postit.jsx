import React from 'react';

const Postit = ({ postit, eliminar }) => {
  const { titulo, descripcion, importante, rotacion } = postit;

  return (
    <div
      className={`card postit ${importante ? 'postit-importante' : ''}`}
      style={{ transform: `rotate(${rotacion}deg)` }}
    >
      <div className="card-body position-relative">
        <button
          onClick={eliminar}
          className="btn-close position-absolute top-0 end-0 m-2"
          aria-label="Eliminar nota"
        />
        {titulo && <h5 className="card-title">{titulo}</h5>}
        <p className="card-text">{descripcion}</p>
      </div>
    </div>
  );
};

export default Postit;
