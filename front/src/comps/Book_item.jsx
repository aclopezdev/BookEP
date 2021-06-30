import React, {useState, useEffect} from "react";

export default function Book_item(props)
{
	const [_edit, set_edit] = useState(false);
	const [_title, set_title] = useState('');
	const [_author, set_author] = useState('');
	const [_year, set_year] = useState('0');

	const remove = ()=>
	{
		fetch(`http://localhost:4000/api/books/${props.data._id}`,
			{
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({id: props.data._id})
			}).then(res=>
			{
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
					props.onUpdateList();
				});
			});
	}

	const edit = (e)=>
	{
		e.preventDefault();
		const idata ={
			id: props.data._id,
			title: _title,
			author: _author,
			year: _year
		}

		fetch(`http://localhost:4000/api/books/${props.data._id}`,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(idata)
			}).then(res=>
			{
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
					props.onUpdateList();
				});
			});
	}

	useEffect(()=>
		{
			set_title(props.data.Title);
			set_author(props.data.Author);
			set_year(props.data.Year);
		}, []);

	return (
	<div>
		<div>
			{_edit === true ? 
				<form onSubmit={edit}>
					<input type='text' value={_title} onChange={(e)=>{set_title(e.target.value)}}/>
					<input type='text' value={_author} onChange={(e)=>{set_author(e.target.value)}}/>
					<input type='text' value={_year} onChange={(e)=>{set_year(e.target.value)}}/>
					<input type='submit' value='Save' />
					<button onClick={()=>{set_edit(false)}}>Cancel</button>
				</form>
				: 
				<div>
					<span className='data_book'>{props.data.Title}</span> 
					<span className='data_book'>{props.data.Author}</span>
					<span className='data_book'>{props.data.Year}</span>
					<button onClick={()=>{set_edit(true)}}>Edit</button>
					<button onClick={remove}>Remove</button>
				</div>
			}
		</div>
	</div>
	);
}

Book_item.defaultProps ={
}