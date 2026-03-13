import {useState, useEffect} from 'react';
import { BiSearchAlt } from "react-icons/bi";

function TaskInput({taskSubmit, editTask, editIdx, taskUpdate}){

	const [inputTitle, setInputTitle] = useState('');
	const [inputDesc, setInputDesc] = useState('');
	const [btnEnable, setButtonEnable] = useState(false)

	useEffect(()=> {
		if(inputTitle.trim() && inputDesc.trim()) {
			setButtonEnable(true);
		}else {
			setButtonEnable(false);
		}
	}, [inputTitle, inputDesc])

	useEffect(()=> {
		if(editIdx !== null) {
			setInputTitle(editTask.title);
			setInputDesc(editTask.description);
		}

	}, [editIdx, editTask]);

	const submitTaskFunc = () => {
		if(editIdx === null) {
			taskSubmit(inputTitle, inputDesc);
			setInputTitle('');
			setInputDesc('');
		}
		else {
			taskUpdate(inputTitle, inputDesc);
			setInputTitle('');
			setInputDesc('');
		}
	}

	const keyPress = (e) => {
		if(e.keyCode === 13) {
			if (inputTitle.trim() && inputDesc.trim()) {
				return submitTaskFunc();
			}
		}
	}

  return (
    <div className="todo_field">
      <input type="text" value={inputTitle} placeholder="Enter Your Task Title" onChange={(eve)=> setInputTitle(eve.target.value)} onKeyDown={(e)=>keyPress(e)} />
      <input type="text" value={inputDesc} placeholder="Enter Your Task Description" onChange={(eve)=> setInputDesc(eve.target.value)} onKeyDown={(e)=>keyPress(e)} />
      {
      	editIdx === null ? (<input type="submit" value="Add Task" className="submit_btn" disabled={!btnEnable ? true : false} onClick={()=> submitTaskFunc()} onKeyDown={(e)=>keyPress(e)} />) : (<input type="submit" value="Update Task" className="submit_btn" disabled={!btnEnable ? true : false} onClick={()=> submitTaskFunc()} />)
      }
    </div>
  )
}

export default TaskInput;