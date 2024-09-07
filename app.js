const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ""){
        alert("You should write something");
    } else {
        let li = document.createElement('li');
        li.innerHTML = `<span>${inputBox.value}</span>`;
        
        // Create and append the "End Date" label
        const endDateLabel = document.createElement('span');
        endDateLabel.textContent = 'Last Date:';
        endDateLabel.classList.add('end-date-label');
        li.appendChild(endDateLabel);
        
        // Create and append the date picker
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.classList.add('date-picker');
        li.appendChild(dateInput);
        
        let img = document.createElement('img');
        img.src = "notcheck.png";
        img.classList.add("close");
        li.appendChild(img);
        
        listContainer.appendChild(li);
        inputBox.value = "";
        saveData();
    }
}

listContainer.addEventListener('click',(e) =>{
    if (e.target.tagName === 'LI' && !e.target.classList.contains('editing')) {
        e.target.classList.toggle("checked"); 
        saveData();
    } else if (e.target.tagName === 'IMG'){
        e.target.parentElement.remove();
        saveData();
    }
});

listContainer.addEventListener('dblclick', (e) => {
    if (e.target.tagName === 'SPAN' && !e.target.parentElement.classList.contains('editing')) {
        const li = e.target.parentElement;
        li.classList.add('editing');
        const input = document.createElement('input');
        input.type = 'text';
        input.value = e.target.textContent;
        input.classList.add('edit-input');
        li.innerHTML = '';
        li.appendChild(input);
        input.focus();
    }
});

listContainer.addEventListener('blur', (e) => {
    if (e.target.tagName === 'INPUT' && e.target.classList.contains('edit-input')) {
        const li = e.target.parentElement;
        const span = document.createElement('span');
        span.textContent = e.target.value;
        li.innerHTML = '';
        li.appendChild(span);
        
        // Recreate and append the "End Date" label and date picker
        const endDateLabel = document.createElement('span');
        endDateLabel.textContent = 'Last Date:';
        endDateLabel.classList.add('end-date-label');
        li.appendChild(endDateLabel);
        
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.classList.add('date-picker');
        li.appendChild(dateInput);
        
        const img = document.createElement('img');
        img.src = "notcheck.png";
        img.classList.add("close");
        li.appendChild(img);
        
        li.classList.remove('editing');
        saveData();
    }
}, true);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showList() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showList();
