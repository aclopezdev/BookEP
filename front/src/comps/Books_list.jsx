import React, {useState, useEffect} from "react";
import Book_item from './Book_item'

export default function Books_list(props)
{
	const [_count, set_count] = useState(0);
	const [_fyear, set_fyear] = useState((new Date()).getFullYear() - 10);
	const [_buffer, set_buffer] = useState([]);



	const get_data = ()=>
	{
		fetch(
			'http://localhost:4000/api/books',
			{
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			}
		).then(res=>
		{
			set_buffer((_buffer)=>[]);
			res.json().then((data)=>{
				if(res.status != 200)
				{
					alert(data.msg);
					return;
				}
				if(data.error)
				{
					alert(data.msg);
					return;
				}
				data.data.forEach((el, i)=>{
					set_buffer((_buffer)=>[..._buffer, el]);
				});
				set_count(data.data.length);
			});
		});
	};

	const filter_by_year = (e)=>
	{
		e.preventDefault();
		fetch(
			`http://localhost:4000/api/books/getbyyear/${_fyear}`,
			{
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			}
		).then(res=>
		{
			set_buffer((_buffer)=>[]);
			res.json().then((data)=>{
				if(res.status != 200)
				{
					alert(data.msg);
					return;
				}
				if(data.error)
				{
					alert(data.msg);
					return;
				}
				data.data.forEach((el, i)=>{
					set_buffer((_buffer)=>[..._buffer, el]);
				});
				set_count(data.data.length);
			});
		});
	};

	useEffect(()=>
		{
			if(props.update){
				props.onUpdatedList();
				get_data();
			}
		}, [props.update]);

	return (
	<div>
		<h2>Books collection ({_count})</h2>
		<form onSubmit={filter_by_year}>
			<input type='text' value={_fyear} onChange={(e)=>{set_fyear(e.target.value)}} />
		</form>
		{_count === 0 ? 
			( <h3>Loading...</h3> ) :  
			( _buffer.map((el, id)=>
					{ 
						return <Book_item key={id} data={el} onUpdateList={()=>{props.onUpdateList()}} />
					}
				) 
			)
		}
	</div>
	);
}

Books_list.defaultProps ={
}