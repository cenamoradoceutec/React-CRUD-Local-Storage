import React from 'react';

const ProveedorList = ({ proveedores, handleEdit, deleteProveedor }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Empresa</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {proveedores.length > 0 ? (
          proveedores.map((proveedor) => (
            <tr key={proveedor.id}>
              <td>{proveedor.name}</td>
              <td>{proveedor.email}</td>
              <td>{proveedor.phone}</td>
              <td>{proveedor.company}</td>
              <td>{proveedor.status}</td>
              <td>
                <button 
                  className="btn btn-warning btn-sm me-2" 
                  onClick={() => handleEdit(proveedor)}
                >
                  Editar
                </button>
                <button 
                  className="btn btn-danger btn-sm" 
                  onClick={() => deleteProveedor(proveedor.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center">No hay proveedores</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ProveedorList;
