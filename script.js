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
    { label: 'Email', name: 'email', type: 'email', placeholder: 'fulanodetal@test.com' },
  ],
  employees: [
    { label: 'Nome', name: 'name', placeholder: 'Ciclano de Tal' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'ciclanodetal@test.com' },
  ],
  appointments: [
    { label: 'Cliente', name: 'customer' },
    { label: 'Serviço', name: 'service' },
    { label: 'Data', name: 'date', type: 'date' },
  ],
};

const updateTableHeaders = ({ columns }) => {
  const headerRow = document.getElementById('table-header');

  headerRow.innerHTML = '';

  columns.forEach((column) => {
    const th = document.createElement('th');
    th.textContent = column;
    headerRow.appendChild(th);
  });
};

const insertList = ({ data, columns }) => {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';

  data.forEach((item) => {
    const row = document.createElement('tr');

    columns.forEach((column) => {
      const cell = document.createElement('td');
      cell.textContent = formatField({ field: item[column] }) || '-';
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
};

const updateList = async ({ type }) => {
  const data = await getList({ type });
  const { headerRow, tableBody } = getTableElements();

  if (!headerRow || !tableBody) return;

  headerRow.innerHTML = '';
  tableBody.innerHTML = '';

  updateTable({ type, data });
};

const updateTable = ({ type, data }) => {
  if (data.length === 0) displayNoDataMessage({ type });
  else displayTable();

  updateTableHeaders({ columns: types[type].headers });
  insertList({ data, columns: types[type].fields });
};

const displayTable = () => {
  const { tableContainer, noDataMessage } = getTableStructure();

  tableContainer.style.display = 'block';
  noDataMessage.style.display = 'none';
};

const displayNoDataMessage = ({ type }) => {
  const { tableContainer, noDataMessage } = getTableStructure();

  tableContainer.style.display = 'none';
  noDataMessage.style.display = 'block';
  noDataMessage.innerHTML = `Ainda não existem ${translateOptions.get(type)} cadastrados.`;
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
  generateForm({type});
  modalOverlay.style.display = 'flex';
};

const closeModal = () => {
  modalOverlay.style.display = 'none';
};

const updateButtonText = (text) => {
  document.querySelector(".open-modal-btn").textContent = text;
}

const generateForm = ({type}) => {
  const dynamicForm = document.getElementById('dynamic-form');
  const translatedType = translateOptions.get(type);

  document.getElementById('modal-title').textContent =
    `Novo ${translatedType.charAt(0).toUpperCase() + translatedType.slice(1, translatedType.length - 1)}`;
  dynamicForm.innerHTML = '';

  fieldsByType[type].forEach((field) => {
    const inputGroup = document.createElement('div');
    inputGroup.innerHTML = `
      <label>${field.label}</label>
      <input type='${field.type || 'text'}' name='${field.name}' placeholder='${field.placeholder}' required />
    `;
    dynamicForm.appendChild(inputGroup);
  });

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.id = 'submit-btn';
  submitButton.textContent = 'Enviar';
  dynamicForm.appendChild(submitButton);

  dynamicForm.onsubmit = async (e) => {
    const form = e.target;

    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form));
    if (formData.price) formData.price = parseInt(formData.price, 10);
    await postData({ type, body: formData });
    modalOverlay.style.display = 'none';
    updateList({ type });
  };
}

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
        console.error("API Error:", data);
        throw new Error(data.errors ? JSON.stringify(data.errors) : "Unknown error");
    }
  } catch (error) {
    console.error("Request failed:", error);
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
