import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Customer } from '@/types/customer';

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (customer: Omit<Customer, 'id'>) => Promise<void>;
}

export const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^(?!.*\.\.)([a-zA-Z0-9._%+-])+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      await onSave({
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone,
      });
      
      setFormData({ name: '', email: '', phone: '' });
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Error saving customer:', error);
      alert('Failed to save customer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', email: '', phone: '' });
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title="Adicionar Novo Cliente">
      <form onSubmit={handleSubmit}>
        <Input
          label="Nome Completo"
          name="name"
          type="text"
          placeholder="Digite o nome do cliente"
          value={formData.name}
          onChange={handleChange}
          required
          error={errors.name}
          minLength={3}
          maxLength={100}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Digite o email do cliente"
          value={formData.email}
          onChange={handleChange}
          required
          error={errors.email}
        />

        <Input
          label="Telefone"
          name="phone"
          type="tel"
          placeholder="(99) 999999999"
          value={formData.phone}
          onChange={handleChange}
          required
          error={errors.phone}
        />

        <div className="flex gap-3 mt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            fullWidth
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};