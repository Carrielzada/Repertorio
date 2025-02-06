const Paragraph = ({ id, text, onEdit, onDelete }) => {
  return (
    <div className="paragraph-card">
      <p className="paragraph-text">{text}</p>
      <div className="paragraph-actions">
        <button 
          onClick={() => onEdit(id)}
          className="action-button edit-button"
        >
          Editar
        </button>
        <button 
          onClick={() => onDelete(id)}
          className="action-button delete-button"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default Paragraph;