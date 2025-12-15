type TranslationMap = Record<string, string>;

const errorTranslations: TranslationMap = {
  'Invalid JSON body.': 'Corpo JSON inválido.',
  'API Error: Bad Request': 'Erro na requisição.',
  'API Error: Not Found': 'Não encontrado.',
  'API Error: Conflict': 'Conflito detectado.',
  'API Error: Unprocessable Entity': 'Dados inválidos.',
  'API Error: Internal Server Error': 'Erro interno do servidor.',
  
  'Missing data for required field.': 'Campo obrigatório não fornecido.',
  'Not a valid email address.': 'Endereço de e-mail inválido.',
  'Length must be between 1 and 10.': 'Quantidade deve estar entre 1 e 10.',
  
  'Email already registered.': 'E-mail já cadastrado.',
  
  'Phone number already registered.': 'Número de telefone já cadastrado.',
  'The provided phone number is invalid.': 'O número de telefone fornecido é inválido.',
  
  'A service must be registered before registering an employee.': 'Um serviço deve ser cadastrado antes de criar um funcionário(a).',
  'Provided services were not found.': 'Serviços informados não foram encontrados.',
  'Service already registered.': 'Serviço já cadastrado.',
  
  'Provided employee was not found.': 'Funcionário(a) informado não foi encontrado.',
  
  'Provided customer was not found.': 'Cliente informado não foi encontrado.',
  
  'Date is outside of allowed range.': 'Data fora do período permitido.',
  'Hour is outside of working hours.': 'Horário fora do expediente.',
  'Customer already has an appointment at this time.': 'Cliente já possui um agendamento neste horário.',
  'Employee already has an appointment at this time.': 'Funcionário(a) já possui um agendamento neste horário.',
  'Selecetd date is unavailable.': 'Horário selecionado não está disponível.',
  'Appointment not found.': 'Agendamento não encontrado.',
  
  'customer not found.': 'Cliente não encontrado.',
  'employee not found.': 'Funcionário(a) não encontrado.',
  'service not found.': 'Serviço não encontrado.',
  'appointment not found.': 'Agendamento não encontrado.',
  
  'Invalid appointment id.': 'ID de agendamento inválido.',
  'Invalid customer id.': 'ID de cliente inválido.',
  'Invalid employee id.': 'ID de funcionário(a) inválido.',
  'Invalid service id.': 'ID de serviço inválido.',
  'Invalid id.': 'ID inválido.',
  
  'No valid fields to update.': 'Nenhum campo válido para atualizar.',
};

const patternTranslations: Array<{ pattern: RegExp; replacement: string }> = [
  {
    pattern: /Employee with ID (\d+) not found\./,
    replacement: 'Funcionário(a) com ID $1 não encontrado.',
  },
  {
    pattern: /Customer with ID (\d+) not found\./,
    replacement: 'Cliente com ID $1 não encontrado.',
  },
  {
    pattern: /Service with ID (\d+) not found\./,
    replacement: 'Serviço com ID $1 não encontrado.',
  },
  {
    pattern: /Appointment with ID (\d+) not found\./,
    replacement: 'Agendamento com ID $1 não encontrado.',
  },
  {
    pattern: /Field '(.+)' must be of type (.+)\./,
    replacement: "Campo '$1' deve ser do tipo $2.",
  },
  {
    pattern: /Date must be between now and (\d+) days in advance\./,
    replacement: 'A data deve estar entre agora e $1 dias no futuro.',
  },
  {
    pattern: /Price must be between (\d+) and (\d+) cents\./,
    replacement: 'O preço deve estar entre R$ $1 e R$ $2 (em centavos).',
  },
  {
    pattern: /Appointments must be between (.+) and (.+)\./,
    replacement: 'Agendamentos devem ser entre $1 e $2.',
  },
  {
    pattern: /Cannot delete customer\. It has (\d+) future appointment\(s\)\./,
    replacement: 'Não é possível excluir o cliente. Ele possui $1 agendamento(s) futuro(s).',
  },
  {
    pattern: /Status must be one of: (.+)\./,
    replacement: 'Status deve ser um dos seguintes: $1.',
  },
  {
    pattern: /Invalid status\. Must be one of: (.+)/,
    replacement: 'Status inválido. Deve ser um dos seguintes: $1',
  },
  {
    pattern: /Invalid (.+)\./,
    replacement: '$1 inválido.',
  },
];

const fieldTranslations: TranslationMap = {
  'name': 'nome',
  'email': 'e-mail',
  'phone_number': 'telefone',
  'phone': 'telefone',
  'date': 'data',
  'customer_id': 'cliente',
  'employee_id': 'funcionário(a)',
  'services_ids': 'serviços',
  'service': 'serviço',
  'price': 'preço',
  'duration': 'duração',
};

export function translateError(message: string): string {
  if (errorTranslations[message]) return errorTranslations[message];
  
  for (const { pattern, replacement } of patternTranslations) {
    if (pattern.test(message)) return message.replace(pattern, replacement);
  }
  
  return message;
}

export function translateFieldName(field: string): string {
  return fieldTranslations[field] || field;
}

export function translateApiError(error: unknown): string {
  if (typeof error === 'string') return translateError(error);
  
  if (error instanceof Error) return translateError(error.message);
  
  if (typeof error === 'object' && error !== null) {
    const apiError = error as { 
      message?: string; 
      errors?: { 
        json?: Record<string, string[]> | string[] 
      } 
    };
    
    if (apiError.errors?.json) {
      if (Array.isArray(apiError.errors.json)) return translateError(apiError.errors.json[0] || 'Erro desconhecido') 
      else {
        const firstField = Object.keys(apiError.errors.json)[0];
        const firstError = apiError.errors.json[firstField]?.[0];
        if (firstError)return translateError(firstError);
      }
    }
    
    if (apiError.message)return translateError(apiError.message);
  }
  
  return 'Ocorreu um erro inesperado';
}

export function translateFieldErrors(
  errors: Record<string, string[]>
): Record<string, string> {
  const translated: Record<string, string> = {};
  
  for (const [field, messages] of Object.entries(errors)) {
    const translatedField = translateFieldName(field);
    const translatedMessage = translateError(messages[0]);
    translated[translatedField] = translatedMessage;
  }
  
  return translated;
}
