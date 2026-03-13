import {useState, useEffect} from 'react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import SearchList from './SearchList';
import "./App.css";

function App(){
  const [taskList, setTaskList] = useState([]);
  const [editTask, setEditTask] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [searchTodo, setSearchTodo] = useState('')

  // add new task function 
  const taskSubmit = (inputTitle, inputDesc) => {
    const newTaskObj = {
      title: inputTitle,
      description: inputDesc,
      isDone: false
    }

    const taskAdded = [...taskList, newTaskObj]

    setTaskList(taskAdded);

    localStorage.setItem('saveLocalStorage', JSON.stringify(taskAdded))
  }

  // get data from localStorage 
  useEffect(()=>{
    const savedToLocal = JSON.parse(localStorage.getItem('saveLocalStorage'));

    if(savedToLocal){
      setTaskList(savedToLocal)
    }
  }, []);

  //  Delete task on click function
  const deleteTask = (idx) => {
    const filteredTask = taskList.filter((item, index) => {
      return index !== idx;
    });

    setTaskList(filteredTask);

    localStorage.setItem('saveLocalStorage', JSON.stringify(filteredTask))
  }

  // Task complete on click function
  const taskComplete = (idx) => {
    const updatedCompleted = taskList.map((itemCheck, index) => {
      if (idx === index) {
        return {
          ...itemCheck,
          isDone: !itemCheck.isDone
        }
      }
      return itemCheck;
    })

    setTaskList(updatedCompleted);
    localStorage.setItem("saveLocalStorage", JSON.stringify(updatedCompleted));
  }

  // Task Edit & Update on click function
  const taskEdit = (idx) => {
    setEditTask(taskList[idx])
    setEditIdx(idx);
  }

  const taskUpdate = (inputTitle, inputDesc) => {
    const taskUpdateList = taskList.map((itemUpdate, index)=> {
      if (editIdx === index) {
        return {
          ...itemUpdate,
          title: inputTitle,
          description: inputDesc
        }
      }
      return itemUpdate;
    }); 
    
    setTaskList(taskUpdateList);
    setEditIdx(null);
    localStorage.setItem("saveLocalStorage", JSON.stringify(taskUpdateList));
  }

  // search task in list 
  const searchTask = (eve) => {
    setSearchTodo(eve);
  }

  const taskListSearch = taskList.filter(searchItem=> {
    return searchItem.title.toLowerCase().includes(searchTodo.toLowerCase()) || searchItem.description.toLowerCase().includes(searchTodo.toLowerCase());
  });

  return (
    <div className="todo_container">
      <div className="todo_panel">
        <h1>My Daily Task</h1>
        <TaskInput taskUpdate={taskUpdate} editIdx={editIdx} editTask={editTask} taskSubmit={taskSubmit} />
        <SearchList searchTask={searchTask} />
        <TaskList taskEdit={taskEdit} taskComplete={taskComplete} deleteTask={deleteTask} taskList={searchTodo === '' ? taskList : taskListSearch} />
      </div>
    </div>
  )
}

export default App;