const form = document.getElementById('from_main');
const nombreInput = document.getElementById('nombreInput');
const emailInput = document.getElementById('emailInput');
const tableBody = document.getElementById('tableBody');

let data = JSON.parse(localStorage.getItem('formData') )|| []; 

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = nombreInput.value;
    const email = emailInput.value;

    if(nombre && email) {
        const newData = {nombre, email};
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
        form.reset();
    }
})

function saveDataToLocalStorage(){
    localStorage.setItem("formData",JSON.stringify(data));

}

function renderTable(){
    tableBody.innerHTML = '';

    data.forEach(function(item,index) {
        const row = document.createElement('tr');
        const nombreCell = document.createElement('td');
        const emailCell  = document.createElement('td');
        const accionCell = document.createElement('td');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        nombreCell.textContent = item.nombre;
        emailCell.textContent  = item.email;
        editButton.textContent = 'Edit';
        deleteButton.textContent = 'Delete';

        editButton.classList.add('button', 'button--secundario');
        deleteButton.classList.add('button', 'button--terciario');

        editButton.addEventListener('click', function(){
            editData(index);
        })

        deleteButton.addEventListener('click', function(){
            deletaData(index);
        })

        accionCell.appendChild(editButton);
        accionCell.appendChild(deleteButton);

        row.appendChild(nombreCell);
        row.appendChild(emailCell);
        row.appendChild(accionCell);

        tableBody.appendChild(row);

    })
}

function editData(index){
    const item = data[index];
    nombreInput.value = item.nombre;
    emailInput.value = item.email;
    data.splice(index,1);
    saveDataToLocalStorage();
    renderTable();
}

function deletaData(index){
    data.splice(index,1);
    saveDataToLocalStorage();
    renderTable();
}

renderTable();