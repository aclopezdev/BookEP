import React, {useState} from "react";

export default function Book_form2(props)
{
	const [_title, set_title] = useState('');
	const [_author, set_author] = useState('');
	const [_year, set_year] = useState('0');

	const save_data = (e)=>
	{
		e.preventDefault();
		if(_title.replace(/\s/g, '') == "")
		{
			alert('Fill a title field');
			return;
		}
		if(_author.replace(/\s/g, '') == "")
		{
			alert('Fill a author field');
			return;
		}
		if(_year.replace(/(0)+/g, '0') == "0" || _year.replace(/\s/g, '') == "")
		{
			alert('Fill a year field');
			return;
		}

		const idata ={
			title: _title,
			author: _author,
			year: _year,
			user_id: props.user_id
		}

		fetch(
			'http://localhost:4000/api/books',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(idata)
			}
		).then(res=>
		{
			res.json().then((odata)=>{
				if(res.status != 200)
				{
					alert(odata.msg);
					return;
				}
				if(odata.error)
				{
					alert(odata.msg);
					return;
				}
				set_title('');
				set_author('');
				set_year('');
				props.onUpdateList();
				//console.log(odata);
			});
		});
	}

	return (
	<div>
		<form onSubmit={save_data}>
			<input type='text' placeholder='Book Title' value={_title} onChange={(e)=>{set_title(e.target.value)}}/>
			<input type='text' placeholder='Book Author' value={_author} onChange={(e)=>{set_author(e.target.value)}}/>
			<input type='text' placeholder='Book year' value={_year} onChange={(e)=>{set_year(e.target.value)}}/>
			<input type='submit' value='Save'/>
		</form>
	</div>
	);
}

Book_form2.defaultProps ={
}