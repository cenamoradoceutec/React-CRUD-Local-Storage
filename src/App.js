import React, { useState, useEffect } from 'react';
import ProveedorForm from './ProveedorForm';
import ProveedorList from './ProveedorList';
import Swal from 'sweetalert2';

const App = () => {
  const [proveedores, setProveedores] = useState([]);
  const [editingProveedor, setEditingProveedor] = useState(null);

  // Cargar proveedores desde localStorage cuando el componente se monta
  useEffect(() => {
    const storedProveedores = localStorage.getItem('proveedores');
    if (storedProveedores) {
      setProveedores(JSON.parse(storedProveedores)); // Cargar los proveedores almacenados
    }
  }, []);

  // Guardar cambios en localStorage cada vez que la lista de proveedores cambia
  useEffect(() => {
    localStorage.setItem('proveedores', JSON.stringify(proveedores));
  }, [proveedores]);

  const addProveedor = (proveedor) => {
    const updatedProveedores = [...proveedores, proveedor];
    setProveedores(updatedProveedores);
    Swal.fire('Proveedor agregado', 'El proveedor ha sido agregado con éxito', 'success');
  };

  const editProveedor = (updatedProveedor) => {
    const updatedProveedores = proveedores.map((prov) =>
      prov.id === updatedProveedor.id ? updatedProveedor : prov
    );
    setProveedores(updatedProveedores);
    Swal.fire('Proveedor actualizado', 'Los datos del proveedor han sido actualizados', 'success');
    setEditingProveedor(null); // Limpiar el estado de edición después de actualizar
  };

  const deleteProveedor = (id) => {
    const updatedProveedores = proveedores.filter((prov) => prov.id !== id);
    setProveedores(updatedProveedores);
    Swal.fire('Proveedor eliminado', 'El proveedor ha sido eliminado', 'error');
  };

  const handleEdit = (proveedor) => {
    setEditingProveedor(proveedor); // Establecer el proveedor que se está editando
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Gestión de Proveedores</h1>
      <ProveedorForm 
        addProveedor={addProveedor} 
        editProveedor={editProveedor} 
        proveedorEdit={editingProveedor} 
      />
      <ProveedorList 
        proveedores={proveedores} 
        handleEdit={handleEdit} 
        deleteProveedor={deleteProveedor} 
      />
    </div>
  );
};

export default App;
