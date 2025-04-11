const LOCALHOST = 'http://127.0.0.1:5000';

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

const updateTableHeaders = ({columns}) => {
  const headerRow = document.getElementById('table-header');

  headerRow.innerHTML = '';

  columns.forEach((column) => {
    const th = document.createElement('th');
    th.textContent = column;
    headerRow.appendChild(th);
  });
};

const insertList = ({data, columns}) => {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';  

  data.forEach((item) => {
    const row = document.createElement('tr');

    columns.forEach((column) => {
      const cell = document.createElement('td');
      cell.textContent = formatField({field: item[column]}) || '-';
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
};

const updateList = async (type = 'services') => {
  const data = await getList({ type });
  const { headerRow, tableBody } = getTableElements();

  if (!headerRow || !tableBody) return;

  headerRow.innerHTML = '';
  tableBody.innerHTML = '';

  updateTable({ type, data });
};

const updateTable = ({ type, data }) => {
  if (data.length === 0) displayNoDataMessage({type});
  else displayTable();
  
  updateTableHeaders({ columns: types[type].headers});
  insertList({data, columns: types[type].fields});
};

const displayTable = () => {
  const { tableContainer, noDataMessage } = getTableStructure();

  tableContainer.style.display = 'block';
  noDataMessage.style.display = 'none';
};

const displayNoDataMessage = ({type}) => {
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

    const type = event.target.dataset.type;
    updateList(type);
  });
});

document.addEventListener('DOMContentLoaded', () => updateList());

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
  } catch (e) {
    console.error('Error fetching services:', error);
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

const formatField = ({field}) => {
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