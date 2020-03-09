import React, { useState } from 'react'
import axios from 'axios'

const EmpAdd = props => {

	const initialEmployState = { id: '', employee_name: '', employee_salary: '', employee_age: '' }

	const error = { nameErr: '', salErr: '', ageErr: '' }


	//const pushTable = { id:'',	employee_name:'',	employee_salary:'',	employee_age:'' }

	//const [ pushValue, setPush ] = useState(pushTable)

	const [validation, setValidation] = useState(error);

	const [user, setUser] = useState(initialEmployState)

	const handleInputChange = event => {
		const { name, value } = event.target
		setUser({ ...user, [name]: value }) // curr obj value get array
	}

	const postData = {
		name:user.employee_name,
		salary: user.employee_salary,
		age: user.employee_age
	}


	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				let constnamerr = '';
				let constsalrr = '';
				let constagerr = '';
				if (!user.employee_name) {
					constnamerr = 'Name should not be empty...';
				}
				else if (!user.employee_name.match(/^[a-zA-Z]+$/)) {
					constnamerr = 'Name should be characters...';
				}
				if (!user.employee_salary) {
					constsalrr = 'Salary should not be empty...';
				}
				else if (!user.employee_salary.match(/^[0-9]+$/)) {
					constsalrr = 'Salary should be number...';
				}
				if (!user.employee_age) {
					constagerr = 'Age should not be empty...';
				}
				else if (!user.employee_age.match(/^[0-9]+$/)) {
					constagerr = 'Age should be number...';
				}
				setValidation({ ...validation, nameErr: constnamerr, salErr: constsalrr, ageErr: constagerr });

					axios.post('http://dummy.restapiexample.com/api/v1/create', postData)
					.then(response => {
						console.log('To push', response.data)
						//console.log('currentData', postData)
					})
					.catch(error => {
						console.log(error)
					})
					let pushTable = {
						id: postData.id,
						employee_name: postData.name,
						employee_salary: postData.salary,
						employee_age: postData.age
					}

					//console.log(validation);
				if (constnamerr === '' && constsalrr === '' && constagerr === '') {
					props.addEmply(pushTable)
					
					setUser(initialEmployState)
				}
			}}
		>
		
			<label>Employee Id</label>
			<input type='text' name='id' value={user.id} onChange={handleInputChange} />

			<label>Employee Name</label>
			<input type='text' name='employee_name' value={user.employee_name} onChange={handleInputChange} />
			<label className='error'>{validation.nameErr}</label>

			<label>Employee Salary</label>
			<input type='text' name='employee_salary' value={user.employee_salary} onChange={handleInputChange} />
			<label className='error'>{validation.salErr}</label>

			<label>Employee Age</label>
			<input type='text' name='employee_age' value={user.employee_age} onChange={handleInputChange} />
			<label className='error'>{validation.ageErr}</label>

			<button>Create</button>
		</form>
	)
}

export default EmpAdd
