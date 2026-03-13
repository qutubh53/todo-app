import { BiPencil } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";

function TaskList({taskList, deleteTask, taskComplete, taskEdit}){
  return (
    <ul className="todo_panel_list">
    	{taskList ? taskList.map((item, index)=>{
    		return (
    			<li key={index}>
    				<input type="checkbox" checked={item.isDone} onChange={()=> taskComplete(index)} />
		      	<div style={{textDecoration: item.isDone ? "line-through" : 'none'}}>
			      	<h4>{item.title}</h4>
			      	<p>{item.description}</p>
		      	</div>
		      	<div className="p-relative">
		      	{item.isDone ? (<span className="tagmark">Completed</span>) : ''}
			      	<BiPencil onClick={() => taskEdit(index)} />
			      	<BiTrash onClick={() => deleteTask(index)} />
		      	</div>
		      </li>
    		)
    	}): ''}
    </ul>
  )
}

export default TaskList;