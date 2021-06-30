import React, {useState, useEffect} from "react";

export default function Login_signup(props)
{
	const [_email, set_email] = useState('');
	const [_pass, set_pass] = useState('');

	const [_email2, set_email2] = useState('');
	const [_pass2, set_pass2] = useState('');

	const login = (e)=>
	{
		e.preventDefault();
		if(_email.replace(/\s/g, '') == "")
		{
			alert('Fill a Email field');
			return;
		}
		if(_pass.replace(/\s/g, '') == "")
		{
			alert('Fill a password field');
			return;
		}

		const idata ={
			email: _email,
			pass: _pass,
			cmd: 'login'
		}

		fetch(
			'http://localhost:4000/api/users',
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
				set_email('');
				set_pass('');
				props.onLogin(odata.user_id);
				console.log(odata.user_id);
			});
		});
	}
	const signup = (e)=>
	{
		e.preventDefault();
		if(_email2.replace(/\s/g, '') == "")
		{
			alert('Fill a Email field');
			return;
		}
		if(_pass2.replace(/\s/g, '') == "")
		{
			alert('Fill a password field');
			return;
		}

		const idata ={
			email: _email2,
			pass: _pass2,
			cmd: 'signup'
		}

		fetch(
			'http://localhost:4000/api/users',
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
				set_email2('');
				set_pass2('');
				props.onLogin(odata.user_id);
			});
		});
	}


	return (
	<div>
		<h1>Hello</h1>
		<div>
			<h3>Login</h3>
			<form onSubmit={login}>
				<input type='text' placeholder='Email' onChange={(e)=>{set_email(e.target.value)}} /><br/>
				<input type='password' placeholder='Password' onChange={(e)=>{set_pass(e.target.value)}} /><br/>
				<input type='submit' value='Login'/>
			</form>
		</div>

		<div>
			<h3>Sign Up</h3>
			<form onSubmit={signup}>
				<input type='text' placeholder='Email' onChange={(e)=>{set_email2(e.target.value)}} /><br/>
				<input type='password' placeholder='Password' onChange={(e)=>{set_pass2(e.target.value)}} /><br/>
				<input type='submit' value='Sign Up'/>
			</form>
		</div>
	</div>
	);
}

Login_signup.defaultProps ={
}