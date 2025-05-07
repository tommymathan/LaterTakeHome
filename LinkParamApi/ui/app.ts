interface Link {
  original_url: string;
  updated_url: string;
}

type Params = Record<string, string>;

async function fetchLinks(): Promise<void> {
  try {
    const resp = await fetch('http://localhost:3000/links');
    const data: { links: Link[] } = await resp.json();
    const list = document.getElementById('links-list')!;
    list.innerHTML = '';

    data.links.forEach((link) => {
      const li = document.createElement('li');
      li.className = 'bg-white p-3 rounded shadow-sm';
      li.innerHTML =
        `<p class="break-all"><span class=\"font-medium\">Original:</span> ${link.original_url}</p>` +
        `<p class="break-all"><span class=\"font-medium\">Updated:</span> ${link.updated_url}</p>`;
      list.appendChild(li);
    });
  } catch (e) {
    console.error('Error fetching links', e);
  }
}

function addParameterRow(): void {
  const container = document.getElementById('params-container')!;
  const template = container.querySelector('.param-row')!.cloneNode(true) as HTMLElement;
  
  // Clear any values in the cloned inputs
  const inputs = template.querySelectorAll('input');
  inputs.forEach(input => input.value = '');
  
  // Show the remove button for all rows
  const removeButtons = document.querySelectorAll('.remove-param');
  removeButtons.forEach(btn => (btn as HTMLElement).classList.remove('hidden'));
  
  // Show the remove button in the new row
  const newRemoveBtn = template.querySelector('.remove-param') as HTMLElement;
  newRemoveBtn.classList.remove('hidden');
  
  // Add the new row to the container
  container.appendChild(template);
}

function removeParameterRow(event: Event): void {
  const button = event.target as HTMLElement;
  const row = button.closest('.param-row') as HTMLElement;
  
  // Only remove if there's more than one parameter row
  const allRows = document.querySelectorAll('.param-row');
  if (allRows.length > 1) {
    row.remove();
  }
}

async function appendParameters(event: Event): Promise<void> {
  event.preventDefault();

  const urlInput = document.getElementById('url') as HTMLInputElement;
  const url = urlInput.value;
  
  // Collect all parameter key-value pairs
  const params: Params = {};
  const paramRows = document.querySelectorAll('.param-row');
  
  paramRows.forEach(row => {
    const keyInput = row.querySelector('.param-key') as HTMLInputElement;
    const valueInput = row.querySelector('.param-value') as HTMLInputElement;
    
    if (keyInput.value && valueInput.value) {
      params[keyInput.value] = valueInput.value;
    }
  });

  try {
    const res = await fetch('http://localhost:3000/append-parameters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, params })
    });
    const data = await res.json();

    const resultDiv = document.getElementById('result')!;
    const resultPre = document.getElementById('result-json')!;
    resultPre.textContent = JSON.stringify(data, null, 2);
    resultDiv.classList.remove('hidden');

    await fetchLinks();
  } catch (e) {
    console.error('Error appending parameters', e);
  }
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Fetch initial links
  fetchLinks();
  
  // Set up form submission handler
  const form = document.getElementById('add-form');
  if (form) {
    form.addEventListener('submit', appendParameters);
  }
  
  // Set up add parameter button
  const addParamBtn = document.getElementById('add-param-btn');
  if (addParamBtn) {
    addParamBtn.addEventListener('click', addParameterRow);
  }
  
  // Set up event delegation for remove parameter buttons
  const paramsContainer = document.getElementById('params-container');
  if (paramsContainer) {
    paramsContainer.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('remove-param')) {
        removeParameterRow(event);
      }
    });
  }
});