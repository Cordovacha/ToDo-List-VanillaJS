const formulario = document.getElementById("formulario");
const input = document.getElementById("input");
const listaTarea = document.getElementById("lista-tareas");
const template = document.getElementById("template").content;
const fragment = document.createDocumentFragment();

let tareas = {};

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem('tareas')) {
    tareas = JSON.parse(localStorage.getItem('tareas'))
  }

  pintarTareas();
});

listaTarea.addEventListener("click", (e) => {
  btnAccion(e);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  setTarea(e);
});

const setTarea = (e) => {
  const texto = e.target.querySelector("input").value;
  if (input.value.trim() === "") {
    console.log("esta vacio");
    return input.focus();
  }
  const tarea = {
    id: Date.now(),
    texto: texto,
    estado: false,
  };
  tareas[tarea.id] = tarea;
  //console.log(tareas);
  pintarTareas();

  formulario.reset();
  e.target.querySelector("input").focus();
};

const pintarTareas = () => {

  localStorage.setItem('tareas', JSON.stringify(tareas))

  if (Object.values(tareas).length === 0) {
    listaTarea.innerHTML = `<div class="alert alert-primary text-center">No hay tareas Pendientes</div>`;
    return;
  }

  listaTarea.innerHTML = "";
  Object.values(tareas).forEach((tarea) => {
    listaTarea.innerHTML = "";
    const clone = template.cloneNode(true);
    clone.querySelector("p").textContent = tarea.texto;

    if (tarea.estado) {
      clone
        .querySelector(".alert")
        .classList.replace("alert-warning", "alert-primary");
      clone
        .querySelectorAll(".fa-solid")[0]
        .classList.replace("fa-circle-check", "fa-rotate-left");
      clone.querySelector("p").style.textDecoration = "line-through";
    }

    clone.querySelectorAll(".fa-solid ")[0].dataset.id = tarea.id;
    clone.querySelectorAll(".fa-solid ")[1].dataset.id = tarea.id;
    fragment.appendChild(clone);
  });
  listaTarea.appendChild(fragment);
};

const btnAccion = (e) => {
  e.preventDefault();
  /*   console.log(e.target.classList.contains('fa-circle-check')); */
  if (e.target.classList.contains("fa-circle-check")) {
    // console.log(e.target.dataset.id);
    tareas[e.target.dataset.id].estado = true;
    pintarTareas();
  }
  if (e.target.classList.contains("fa-circle-minus")) {
    delete tareas[e.target.dataset.id];
    pintarTareas();
  }
  if (e.target.classList.contains("fa-rotate-left")) {
    tareas[e.target.dataset.id].estado = false;
    pintarTareas();
  }

  e.stopPropagation();
};
