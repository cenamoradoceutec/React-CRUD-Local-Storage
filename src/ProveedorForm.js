import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

const ProveedorForm = ({ addProveedor, editProveedor, proveedorEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'Activo'
  });

  // Si el proveedor a editar cambia, actualiza el formulario
  useEffect(() => {
    if (proveedorEdit) {
      setFormData(proveedorEdit);
    } else {
      setFormData({ name: '', email: '', phone: '', company: '', status: 'Activo' });
    }
  }, [proveedorEdit]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formData.name || !formData.email || !formData.phone || !formData.company) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }

    if (proveedorEdit) {
      // Si estamos editando un proveedor existente
      editProveedor(formData);
    } else {
      // Si estamos agregando un nuevo proveedor
      addProveedor({ ...formData, id: uuidv4() });
    }

    // Reiniciar el formulario después de agregar o editar
    setFormData({ name: '', email: '', phone: '', company: '', status: 'Activo' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nombre del proveedor</label>
        <input 
          type="text" 
          name="name" 
          className="form-control" 
          value={formData.name} 
          onChange={handleChange} 
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Correo electrónico</label>
        <input 
          type="email" 
          name="email" 
          className="form-control" 
          value={formData.email} 
          onChange={handleChange} 
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Teléfono</label>
        <input 
          type="text" 
          name="phone" 
          className="form-control" 
          value={formData.phone} 
          onChange={handleChange} 
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Empresa</label>
        <input 
          type="text" 
          name="company" 
          className="form-control" 
          value={formData.company} 
          onChange={handleChange} 
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Estado</label>
        <select 
          name="status" 
          className="form-control" 
          value={formData.status} 
          onChange={handleChange}
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        {proveedorEdit ? 'Guardar cambios' : 'Agregar Proveedor'}
      </button>
    </form>
  );
};

export default ProveedorForm;
