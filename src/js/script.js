let btn = document.querySelector('.submit-btn');
let output = document.getElementById('output-block');
let clearAll = document.querySelector('.clean-all');
let removeBtn = document.querySelectorAll('.remove-btn');
let ckeckedBtn = document.querySelectorAll('.checked-btn');
let array = localStorage.getItem('id') ? JSON.parse(localStorage.getItem('id')) : [];

localStorage.setItem('id', JSON.stringify(array));
let data = JSON.parse(localStorage.getItem('id'));

const liContent = (val) => {
  let listItem = document.createElement('li');
  listItem.classList.add('task');

  listItem.textContent = val;
  output.appendChild(listItem);
  listItem.insertAdjacentHTML('beforeEnd', '<button class="btn btn__list remove-btn" onclick="removeItem(this)">Delete</button>');
};

btn.onclick = () => {
  let input = document.querySelector('.input-block');

  array.push(input.value);
  localStorage.setItem('id', JSON.stringify(array));
  liContent(input.value);
  input.value = '';
};

data.forEach(item => {
  liContent(item);
});


clearAll.onclick = () => {
  localStorage.clear('id');
  while (output.firstChild) {
    output.removeChild(output.firstChild);
  }
  array = [];
};

function removeItem(e){
  let li = document.querySelectorAll('.task');
  e.parentElement.remove();
  
  li.forEach(function(list, i) {
    list.addEventListener("click", function() {
      array.splice(i, 1);
      localStorage.setItem('id', JSON.stringify(array));
    });
  });
};

// function setData(e) {
//   let time = new Date();
//   let monthes=['01','02','03','04','05','06','07','08','09','10','11','12']; 
//   let month = time.getMonth();
//   let day = time.getDate();
//   let year = time.getFullYear();
//   let sec = time.getSeconds();

//   e.innerHTML = day + '.' + monthes[month] + '.' + year + '.' + sec;
// }

