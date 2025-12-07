import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  isLoading?: boolean;
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  isLoading = false,
}: DeleteConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="p-6">
        <div className="flex flex-col items-center py-8">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Você tem certeza desta ação?</h3>
          
          <p className="text-gray-500 text-center mb-2">
            {description}
          </p>
          
        </div>

        <div className="flex gap-4 justify-center mt-8">
          <Button
            onClick={onClose}
            disabled={isLoading}
            variant="secondary"
            fullWidth
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            variant="danger"
            fullWidth
          >
            {isLoading ? 'Deletando...' : 'Deletar'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
