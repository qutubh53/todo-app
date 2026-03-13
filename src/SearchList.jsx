import { BiSearchAlt } from "react-icons/bi";

function SearchList({searchTask}) {
	return (
		<div className="search_field p-relative">      	
    	<input type="text" placeholder="Search Your Task" onChange={(e)=> searchTask(e.target.value)} />
    	<BiSearchAlt />
    </div>
	)
}

export default SearchList;