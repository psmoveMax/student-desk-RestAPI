document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#btn_add").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#main_add_form").classList.add("visible");
  });

  document.querySelector("#btn_form_close").addEventListener("click", () => {
    document.querySelector("#main_add_form").classList.remove("visible");
    document.querySelectorAll("input").forEach((el) => (el.value = ""));
  });








  // Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.
  document.querySelector('#main_add_form').addEventListener("submit", function (e) {
    e.preventDefault();
    let fio = document.getElementById('fio').value.trim();
    let fakultet = document.getElementById('fakultet').value.trim();
    let date_birth = document.getElementById('date_birth').value.trim();

    let date_learn = document.getElementById('date_learn').value.trim();
    let date_now = new Date();
    let date_student = new Date(date_birth);
    date_learn = new Date(date_learn);

    //Валидация даты рождения
    if (date_student.getFullYear() >= 1900) {
      //Валидация года обучения
      if ((date_learn.getFullYear() >= 2000 && date_learn.getFullYear() <= date_now.getFullYear()) && (date_now.getFullYear() > date_learn.getFullYear())) {
        let year = date_now.getFullYear() - date_student.getFullYear();

        //Сколько лет студенту
        if ((date_now.getMonth() < date_student.getMonth())
          || (date_now.getMonth() == date_student.getMonth() && date_now.getDay() > date_student.getDay())) {
          year = year - 1;
        }

        //Закончил или нет и какой курс
        let course = date_now.getFullYear() - date_learn.getFullYear() + 1;
        let learn_path;
        if (date_now.getMonth() < 9) {
          learn_path = `${date_learn.getFullYear()}-${date_learn.getFullYear() + 4} (${course - 1} курс)`;
        }


        if (course > 5) {
          learn_path = 'закончил';
        }

        e.target.reset();
        alert('Добавлен новый студент');
      } else {
        alert('Год начала обучения должен начинаться с 2000 года и не быть больше текущего года');
      }
    } else {
      alert('Вы ввели некорректную дату рождения');
    }

  });






});

// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.



// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.

function getStudentItem(student) {
  console.log(student);
  let table = document.querySelector('#table_main')['tBodies'][0];

  let table_list = document.createElement("tr");
  let fio_student = document.createElement("th");
  let fakultet_student = document.createElement("td");
  let date_birth = document.createElement("td");
  let learn_start = document.createElement("td");

  fio_student.innerHTML = `${student.name} ${student.surname} ${student.lastname}`;
  fakultet_student.innerHTML = `${student.faculty}`;
  date_birth.innerHTML = `${student.birthday}`;
  learn_start.innerHTML = `${student.studyStart}`;
  table_list.append(fio_student);
  table_list.append(fakultet_student);
  table_list.append(date_birth);
  table_list.append(learn_start);


  table.appendChild(table_list);


}


renderStudentsTable();
// Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.

async function renderStudentsTable() {

  const response = await fetch('http://localhost:3000/api/students');
  const studentList = await response.json();

  studentList.forEach(student => {
    const studentElement = getStudentItem(student);
  });


}

// Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.
function sort_func(sort_name) {
  let id;

  const regular_birth = /(\d{2}).(\d{2}).(\d{4})/;
  const regular_learn = /(\d{4})-(\d{4})/gm;
  switch (sort_name) {
    case 'fio':
      id = 'sort_fio';
      break;
    case 'fakultet':
      id = 'sort_fak';
      break;
    case 'birth':
      id = 'sort_birth';
      break;
    case 'learn':
      id = 'sort_learn';
      break;
  }




  for (let i = 0; i < document.querySelector('#header_table').children.length; i++) {
    if (document.querySelector('#header_table').children[i].children[0].innerHTML == '▼') {
      if (id != document.querySelector('#header_table').children[i].id) {
        //renderStudentsTable(studentsList);
        document.querySelector('#header_table').children[i].children[0].innerHTML = 'ᐁ';
      }
    }
  }

  if (sort_name == 'fio') {
    if (document.querySelector('#sort_fio_activity').innerHTML == 'ᐁ') {
      let table, rows, switching, i, x, y, shouldSwitch;
      table = document.getElementById("table_main");
      switching = true;

      while (switching) {

        switching = false;
        rows = table.getElementsByTagName("TR");

        for (i = 2; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TH")[0];
          y = rows[i + 1].getElementsByTagName("TH")[0];
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
        }
      }
      document.querySelector('#sort_fio_activity').innerHTML = '▼'
    } else {
      if (document.getElementById("search_fio").value == '' &&
        document.getElementById("search_fakultet").value == '' &&
        document.getElementById("search_year_start").value == '' &&
        document.getElementById("search_year_end").value == '') {
        renderStudentsTable(studentsList);
        document.querySelector('#sort_fio_activity').innerHTML = 'ᐁ';
      } else {
        document.getElementById("search_fio").value = '';
        document.getElementById("search_fakultet").value = '';
        document.getElementById("search_year_start").value = '';
        document.getElementById("search_year_end").value = '';
        renderStudentsTable(studentsList);
        document.querySelector('#sort_fio_activity').innerHTML = 'ᐁ';
      }
    }
  } else if (sort_name == 'fakultet') {
    if (document.querySelector('#sort_fak_activity').innerHTML == 'ᐁ') {
      let table, rows, switching, i, x, y, shouldSwitch;
      table = document.getElementById("table_main");
      switching = true;

      while (switching) {

        switching = false;
        rows = table.getElementsByTagName("TR");

        for (i = 2; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TD")[0];
          y = rows[i + 1].getElementsByTagName("TD")[0];
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
        }
      }
      document.querySelector('#sort_fak_activity').innerHTML = '▼'
    } else {
      if (document.getElementById("search_fio").value == '' &&
        document.getElementById("search_fakultet").value == '' &&
        document.getElementById("search_year_start").value == '' &&
        document.getElementById("search_year_end").value == '') {
        renderStudentsTable(studentsList);
        document.querySelector('#sort_fak_activity').innerHTML = 'ᐁ';
      } else {
        document.getElementById("search_fio").value = '';
        document.getElementById("search_fakultet").value = '';
        document.getElementById("search_year_start").value = '';
        document.getElementById("search_year_end").value = '';
        renderStudentsTable(studentsList);
        document.querySelector('#sort_fak_activity').innerHTML = 'ᐁ';
      }
    }
  } else if (sort_name == 'birth') {

    if (document.querySelector('#sort_birth_activity').innerHTML == 'ᐁ') {
      let table, rows, switching, i, x, y, shouldSwitch;
      table = document.getElementById("table_main");
      switching = true;

      while (switching) {

        switching = false;
        rows = table.getElementsByTagName("TR");

        for (i = 2; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TD")[1];
          y = rows[i + 1].getElementsByTagName("TD")[1];
          let xDate = new Date(`${x.innerHTML.match(regular_birth)[2]},${x.innerHTML.match(regular_birth)[1]},${x.innerHTML.match(regular_birth)[3]}`).getTime();
          let yDate = new Date(`${y.innerHTML.match(regular_birth)[2]},${y.innerHTML.match(regular_birth)[1]},${y.innerHTML.match(regular_birth)[3]}`).getTime();

          if (xDate > yDate) {
            shouldSwitch = true;
            break;
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
        }
      }
      document.querySelector('#sort_birth_activity').innerHTML = '▼'
    } else {
      if (document.getElementById("search_fio").value == '' &&
        document.getElementById("search_fakultet").value == '' &&
        document.getElementById("search_year_start").value == '' &&
        document.getElementById("search_year_end").value == '') {
        renderStudentsTable(studentsList);
        document.querySelector('#sort_birth_activity').innerHTML = 'ᐁ';
      } else {
        document.getElementById("search_fio").value = '';
        document.getElementById("search_fakultet").value = '';
        document.getElementById("search_year_start").value = '';
        document.getElementById("search_year_end").value = '';
        renderStudentsTable(studentsList);
        document.querySelector('#sort_birth_activity').innerHTML = 'ᐁ';
      }


    }
  } else if (sort_name == 'learn') {
    if (document.querySelector('#sort_learn_activity').innerHTML == 'ᐁ') {
      let table, rows, switching, i, x, y, shouldSwitch;
      table = document.getElementById("table_main");
      switching = true;

      while (switching) {

        switching = false;
        rows = table.getElementsByTagName("TR");

        for (i = 2; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TD")[2];
          y = rows[i + 1].getElementsByTagName("TD")[2];
          let xDate = x.innerHTML.match(regular_learn);
          let yDate = y.innerHTML.match(regular_learn);
          if (xDate != null && yDate != null) {
            if (xDate > yDate) {
              shouldSwitch = true;
              break;
            }
          } else if (xDate != null && yDate == null) {
            shouldSwitch = true;
            break;
          }

        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
        }
      }
      document.querySelector('#sort_learn_activity').innerHTML = '▼'
    } else {
      if (document.getElementById("search_fio").value == '' &&
        document.getElementById("search_fakultet").value == '' &&
        document.getElementById("search_year_start").value == '' &&
        document.getElementById("search_year_end").value == '') {
        renderStudentsTable(studentsList);
        document.querySelector('#sort_learn_activity').innerHTML = 'ᐁ';
      } else {
        document.getElementById("search_fio").value = '';
        document.getElementById("search_fakultet").value = '';
        document.getElementById("search_year_start").value = '';
        document.getElementById("search_year_end").value = '';
        renderStudentsTable(studentsList);
        document.querySelector('#sort_learn_activity').innerHTML = 'ᐁ';
      }
    }
  }




}


// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.


function search_func() {
  let fio_input, fak_input, start_input, filter, table, tr, td, i;
  fio_input = document.getElementById("search_fio");
  filter_fio = fio_input.value.toUpperCase();

  fak_input = document.getElementById("search_fakultet");
  filter_fak = fak_input.value.toUpperCase();


  start_input = document.getElementById("search_year_start");
  filter_start = start_input.value;

  end_input = document.getElementById("search_year_end");
  filter_end = end_input.value;
  const regular = /(\d{4})/gm;

  table = document.getElementById("table_main");
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    th_fio = tr[i].getElementsByTagName("th")[0];
    td_fak = tr[i].getElementsByTagName("td")[0];
    td_learn = tr[i].getElementsByTagName("td")[2];



    if (th_fio && td_fak && td_learn) {
      if (td_fak.innerHTML.toUpperCase().indexOf(filter_fak) > -1 &&
        th_fio.innerHTML.toUpperCase().indexOf(filter_fio) > -1) {
        if (filter_start == '' && filter_end == '') {
          tr[i].style.display = "";
        } else {
          if (td_learn.innerHTML.match(regular)) {
            if (filter_start != '' && filter_end != '') {
              if (filter_start == td_learn.innerHTML.match(regular)[0] &&
                filter_end == td_learn.innerHTML.match(regular)[1]) {
                tr[i].style.display = "";
              } else {
                tr[i].style.display = "none";
              }
            } else {
              if (filter_start == td_learn.innerHTML.match(regular)[0] ||
                filter_end == td_learn.innerHTML.match(regular)[1]) {
                tr[i].style.display = "";
              } else {
                tr[i].style.display = "none";
              }
            }
          } else {
            tr[i].style.display = "none";
          }
        }
      } else {
        tr[i].style.display = "none";
      }
    }
  }

}