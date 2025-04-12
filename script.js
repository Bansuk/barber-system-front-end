const LOCALHOST = 'http://127.0.0.1:5000';
let type = 'services';

const types = {
  services: {
    headers: ['Nome', 'Preço'],
    fields: ['name', 'price'],
  },
  customers: {
    headers: ['Nome', 'E-mail'],
    fields: ['name', 'email'],
  },
  employees: {
    headers: ['Nome', 'E-mail'],
    fields: ['name', 'email'],
  },
  appointments: {
    headers: ['Data'],
    fields: ['date'],
  },
};

const fieldsByType = {
  services: [
    { label: 'Nome', name: 'name', placeholder: 'Corte de Cabelo Masculino' },
    { label: 'Preço', name: 'price', type: 'number', placeholder: 5500 },
  ],
  customers: [
    { label: 'Nome', name: 'name', placeholder: 'Fulano de Tal' },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'fulanodetal@test.com',
    },
  ],
  employees: [
    { label: 'Nome', name: 'name', placeholder: 'Ciclano de Tal' },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'ciclanodetal@test.com',
    },
    {
      label: 'Serviços',
      name: 'services',
      type: 'dropdown',
      multiple: true,
      source: 'services',
    },
  ],
  appointments: [
    {
      label: 'Cliente',
      name: 'customer_id',
      type: 'dropdown',
      source: 'customers',
    },
    {
      label: 'Funcionário',
      name: 'employee_id',
      type: 'dropdown',
      source: 'employees',
    },
    {
      label: 'Serviço',
      name: 'services_ids',
      type: 'dropdown',
      multiple: true,
      source: 'services',
    },
    { label: 'Data', name: 'date', type: 'datetime' },
  ],
};

const createTableCell = ({ content }) => {
  const cell = document.createElement('td');
  cell.textContent = formatField({ field: content }) || '-';
  return cell;
};

const createHeaderCell = ({ headerText }) => {
  const th = document.createElement('th');
  th.textContent = headerText;
  return th;
};

const clearElement = ({ element }) => {
  if (element) {
    element.innerHTML = '';
  }
};

const updateTableHeaders = ({ columns }) => {
  const headerRow = document.getElementById('table-header');
  if (!headerRow) return;

  clearElement({ element: headerRow });

  const fragment = document.createDocumentFragment();
  columns.forEach((column) => {
    fragment.appendChild(createHeaderCell({ headerText: column }));
  });

  headerRow.appendChild(fragment);
};

const insertList = ({ data, columns }) => {
  const tableBody = document.getElementById('table-body');
  if (!tableBody) return;

  clearElement({ element: tableBody });

  const fragment = document.createDocumentFragment();

  data.forEach((item) => {
    const row = document.createElement('tr');

    columns.forEach((column) => {
      row.appendChild(createTableCell({ content: item[column] }));
    });

    fragment.appendChild(row);
  });

  tableBody.appendChild(fragment);
};

const toggleTableVisibility = (showTable, type = null) => {
  const { tableContainer, noDataMessage } = getTableStructure();

  if (!tableContainer || !noDataMessage) return;

  tableContainer.style.display = showTable ? 'block' : 'none';
  noDataMessage.style.display = showTable ? 'none' : 'block';

  if (!showTable && type) {
    noDataMessage.textContent = `Ainda não existem ${translateOptions.get(type)} cadastrados.`;
  }
};

const updateTable = ({ type, data }) => {
  if (!type || !types[type]) return;

  const hasData = Array.isArray(data) && data.length > 0;
  toggleTableVisibility(hasData, type);

  if (hasData) {
    updateTableHeaders({ columns: types[type].headers });
    insertList({ data, columns: types[type].fields });
  }
};

const updateList = async ({ type }) => {
  try {
    const data = await getList({ type });
    updateTable({ type, data });
  } catch (error) {
    console.error('Failed to update list:', error);
    toggleTableVisibility(false, type);
  }
};

/*
  --------------------------------------------------------------------------------------
  DOM Manipulation
  --------------------------------------------------------------------------------------
*/

document.querySelectorAll('.nav-btn').forEach((btn) => {
  btn.addEventListener('click', (event) => {
    document
      .querySelectorAll('.nav-btn')
      .forEach((btn) => btn.classList.remove('selected'));
    event.target.classList.add('selected');

    type = event.target.dataset.type;
    updateList({ type });
  });
});

document.addEventListener('DOMContentLoaded', () => updateList({ type }));

const modalOverlay = document.getElementById('modalOverlay');

const openModal = () => {
  generateForm({ type });
  modalOverlay.style.display = 'flex';
};

const closeModal = () => {
  modalOverlay.style.display = 'none';
};

const updateButtonText = (text) => {
  document.querySelector('.open-modal-btn').textContent = text;
};

const generateForm = async ({ type }) => {
  const dynamicForm = document.getElementById('dynamic-form');
  const modalTitle = document.getElementById('modal-title');
  const translatedType = translateOptions.get(type);

  dynamicForm.innerHTML = '';
  modalTitle.textContent = `Novo ${formatTypeForTitle({ translatedType })}`;

  for (const field of fieldsByType[type]) {
    const inputGroup = await createInputGroup({ field });
    dynamicForm.appendChild(inputGroup);
  }

  dynamicForm.appendChild(createSubmitButton());
  dynamicForm.appendChild(createErrorContainer());

  dynamicForm.onsubmit = handleFormSubmit({ type });
};

const handleFormSubmit =
  ({ type }) =>
  async (e) => {
    e.preventDefault();

    const form = e.target;
    const errorContainer = document.getElementById('error-container');

    const formData = new FormData(form);
    const formObject = {};

    for (const [key, value] of formData.entries()) {
      if (form.elements[key].multiple) {
        if (!formObject[key]) {
          formObject[key] = [];
        }
        formObject[key].push(value);
      } else {
        formObject[key] = value;
      }
    }

    const processedData = processFormData({ formData: formObject });

    errorContainer.style.display = 'none';
    errorContainer.innerHTML = '';

    try {
      await postData({ type, body: processedData });
      modalOverlay.style.display = 'none';
      updateList({ type });
    } catch (error) {
      displayErrors({ errorContainer, error });
    }
  };

const displayErrors = ({ errorContainer, error }) => {
  errorContainer.style.display = 'block';

  try {
    const errorData = JSON.parse(error.message);

    if (typeof errorData.json === 'object' && errorData.json !== null) {
      Object.entries(errorData.json).forEach(([field, msgArray]) => {
        if (Array.isArray(msgArray)) {
          msgArray.forEach((msg) => {
            const errorMsg = document.createElement('p');
            errorMsg.textContent = `${field}: ${msg}`;
            errorContainer.appendChild(errorMsg);
          });
        }
      });
    }
  } catch (parseError) {
    errorContainer.textContent = error.message;
  }
};

const createErrorContainer = () => {
  const errorMessage = document.createElement('div');
  errorMessage.id = 'error-container';
  errorMessage.className = 'error-container';
  errorMessage.style.display = 'none';
  return errorMessage;
};

const createSubmitButton = () => {
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.id = 'submit-btn';
  submitButton.textContent = 'Enviar';
  return submitButton;
};

const createInputGroup = async ({ field }) => {
  const inputGroup = document.createElement('div');
  const label = document.createElement('label');
  label.textContent = field.label;
  inputGroup.appendChild(label);

  if (field.type === 'dropdown') {
    const select = document.createElement('select');
    select.name = field.name;
    select.required = true;

    if (field.multiple) {
      select.multiple = true;
      select.size = 3;
    }

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Selecione...';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    try {
      const data = await getList({ type: field.source });

      data.forEach((item) => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        select.appendChild(option);
      });
    } catch (error) {
      console.error(`Failed to load ${field.source} data for dropdown:`, error);

      const errorMsg = document.createElement('div');
      errorMsg.classList.add('error-message');
      errorMsg.textContent = `Não foi possível carregar os dados de ${field.source}.`;
      inputGroup.appendChild(errorMsg);
    }

    inputGroup.appendChild(select);
  } else if (field.type === 'datetime') {
    const datetimeContainer = document.createElement('div');

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.name = 'date_part';
    dateInput.required = true;
    dateInput.min = new Date().toISOString().split('T')[0];

    const timeInput = document.createElement('input');
    timeInput.type = 'time';
    timeInput.name = 'time_part';
    timeInput.required = true;
    timeInput.step = 1800;

    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = field.name;

    const updateHiddenField = () => {
      if (dateInput.value && timeInput.value) {
        hiddenInput.value = `${dateInput.value} ${timeInput.value}:00`;
      }
    };

    dateInput.addEventListener('change', updateHiddenField);
    timeInput.addEventListener('change', updateHiddenField);

    datetimeContainer.appendChild(dateInput);
    datetimeContainer.appendChild(timeInput);
    datetimeContainer.appendChild(hiddenInput);

    inputGroup.appendChild(datetimeContainer);
  } else {
    const input = document.createElement('input');
    input.type = field.type || 'text';
    input.name = field.name;
    input.placeholder = field.placeholder;
    input.required = true;
    inputGroup.appendChild(input);
  }

  return inputGroup;
};

/*
  --------------------------------------------------------------------------------------
  Services
  --------------------------------------------------------------------------------------
*/

const getList = async ({ type }) => {
  try {
    const response = await fetch(`${LOCALHOST}/${type}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();

    if (!Array.isArray(data)) throw new Error('Invalid response format');

    return data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return null;
  }
};

const postData = async ({ type, body }) => {
  try {
    const response = await fetch(`${LOCALHOST}/${postOptions.get(type)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', data);
      throw new Error(
        data.errors ? JSON.stringify(data.errors) : 'Unknown error',
      );
    }
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
};

/*
  --------------------------------------------------------------------------------------
  Helpers
  --------------------------------------------------------------------------------------
*/

const translateOptions = new Map([
  ['services', 'serviços'],
  ['customers', 'clientes'],
  ['employees', 'funcionários'],
  ['appointments', 'agendamentos'],
]);

const postOptions = new Map([
  ['services', 'service'],
  ['customers', 'customer'],
  ['employees', 'employee'],
  ['appointments', 'appointment'],
]);

const formatField = ({ field }) => {
  if (typeof field !== 'number') return field;
  return formatPrice({ price: field });
};

const formatPrice = ({ price }) => {
  return (price / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

const getTableElements = () => {
  return {
    headerRow: document.getElementById('table-header'),
    tableBody: document.getElementById('table-body'),
  };
};

const getTableStructure = () => {
  return {
    tableContainer: document.getElementById('table-wrapper'),
    noDataMessage: document.getElementById('no-data-message'),
  };
};

const processFormData = ({ formData }) => {
  const processedData = { ...formData };

  if (processedData.price) {
    processedData.price = parseInt(processedData.price, 10);
  }

  if (
    processedData.services_ids &&
    typeof processedData.services_ids === 'string'
  ) {
    processedData.services_ids = processedData.services_ids.split(',');
  }

  if (processedData.date_part && processedData.time_part) {
    delete processedData.date_part;
    delete processedData.time_part;
  }

  return processedData;
};

const formatTypeForTitle = ({ translatedType }) => {
  return (
    translatedType.charAt(0).toUpperCase() +
    translatedType.slice(1, translatedType.length - 1)
  );
};
