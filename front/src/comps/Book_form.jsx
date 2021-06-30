import React,{Component} from 'react';

class Book_form extends Component
{
	constructor(props){
		super(props);
		this.state ={
			_title: "",
			_author: '',
			_year: 0
		};
	};


	save_data(self){
		self.setState({_title: '', _author: '', _year: '0'});
	}


	render(){
		return <div>
			<form method='POST' action='javascript:;' onSubmit={()=>{this.save_data(this)}}>
				<input type='text' placeholder='Book Title' value={this.state._title} onChange={(e)=>{this.setState({_title:e.target.value})}}/>
				<input type='text' placeholder='Book Author' value={this.state._author} onChange={(e)=>{this.setState({_author:e.target.value})}}/>
				<input type='text' placeholder='Book year' value={this.state._year} onChange={(e)=>{this.setState({_year:e.target.value})}}/>
				<input type='submit' value='Save'/>
			</form>
		</div>;
	}
}

Book_form.defaultProps ={
};

export default Book_form;