import React, { useEffect, useState, } from 'react'


//Crear el componente 

const Tareas = () => {
  const [texto, setTexto] = useState("");
  const [saveTask, setsaveTask] = useState([]);
  useEffect(() => {
    toDoList();
  }, []);

  function toDoList() {

    fetch("https://playground.4geeks.com/todo/users/jppe1994")
      .then((response) => {
        if (response.status === 404) {
          crearUsuario()
        }else return response.json()
      })
      .then((data) => setsaveTask(data.todos))
      .catch(error => console.log(error));
  }
  //funcion crea el usuario y una vez creado llama a la función todolist que son sus tareas.
  function crearUsuario (){
    fetch("https://playground.4geeks.com/todo/users/jppe1994", {
      method: 'POST',
      headers: { "Content-Type": "application/json" }
    })

      .then((response) => {
        return response.json()
      })
      .then((data) => toDoList())
      .catch(error => console.log(error));
  };
  const saveChange = event => {
    setTexto(event.target.value);
  };

  const addTask = (e) => {
    if (e.key === "Enter" && texto != '') {


      fetch('https://playground.4geeks.com/todo/todos/jppe1994', {
        method: 'POST',
        body: JSON.stringify({ label: texto }),
        headers: { "Content-Type": "application/json" }
      })
        .then(() => {
          toDoList()
          setTexto('')
        })
        .catch(error => console.log(error));
    }
  }

  const deleteTasck = taskId => {
    fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
      method: 'DELETE',
      headers: { 'Accept': 'application/json' }
    })
      .then(() => toDoList())
      .catch(error => console.error(error));
  };

  return (
    <>


      <div className='container flex-colum justify-content-center col-sm-12' >
        <label htmlFor="taskInput" className="fs-3">
          <i className="fa-solid fa-pencil"></i>
          Añade tu tarea a realizar
          <i className="fa-solid fa-pencil"></i>
        </label>

        <input
          type="text"
          className='form-control'
          id='taskIntro'
          onChange={saveChange}
          value={texto}
          onKeyDown={addTask}
          placeholder="que quieres hacer"></input>

        <div className='col-sm-12'>
          <ul>{saveTask.map(task => (

            <li key={task.id}>
              {task.label}

              <button onClick={() => deleteTasck(task.id)} className='Delete'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-square" viewBox="0 0 16 16">
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </button>







            </li>))




          }


          </ul>
        </div>


      </div>




      <div className='col-sm-12'>
        {saveTask.length === 0 && (
          <li className="list-group-item counterTask fw-bold">No tienes tareas pendientes</li>
        )}
      </div>
      <div className='col-sm-12'>
        {saveTask.length} task
      </div>
      <div className='text-center col-sm-12'>

        <button>
          Agregar usuario
        </button>

      </div>


    </>

  )
}

export default Tareas

