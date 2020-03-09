import React, { useState, Fragment, useEffect } from 'react'
import EmpAdd from './forms/EmpAdd'
import EmpEdit from './forms/EmpEdit'
import EmpTable from './tables/EmpTable'
import axios from 'axios'

const App = () => {

	const empsData = [
		{ id: 1, employee_name: 'John', employee_salary: 25000, employee_age: 25 }
	]

	const initialEmployState = { id: null, employee_name: '', employee_salary: '', employee_age: '' }

	const [employes, setEmp] = useState(empsData)

	const [currentEmp, setcurrentEmp] = useState(initialEmployState)

	const [editing, setEditing] = useState(false)

	const addEmply = user => {
		user.id = employes.length + 1
		setEmp([...employes, user])
	}

	const deleteEmploy = (id) => {
		setEditing(false)
		setEmp(employes.filter(user => user.id !== id))
	}

	const updateEmploy = (id, updatedUser) => {
		setEditing(false)
		setEmp(employes.map(user => (user.id === id ? updatedUser : user)))
	}

	const editRow = user => {
		setEditing(true)
		setcurrentEmp({ id: user.id, employee_name: user.employee_name, employee_salary: user.employee_salary, employee_age: user.employee_age })
	}

	useEffect(() => {
		axios.get('http://dummy.restapiexample.com/api/v1/employees')
			.then(response => {
				setEmp(response.data.data)
			})
			.catch(error => {
				console.log(error)
			})
	}, [])

	return (
		<div className='container app_background'>
			<h2 className='title'>Employee Details</h2>
			<div className='flex-row'>
				<div className='flex-large'>
					{editing ? ( // true
						<Fragment>
							<h3>Employees Details</h3>
							<EmpEdit
								editing={editing} // true r fa
								setEditing={setEditing} //
								currentEmp={currentEmp}  // currt det
								updateEmploy={updateEmploy} // after edit call
							/>
						</Fragment>
					) : (
							<Fragment>
								<h3>New Employee</h3>
								<EmpAdd addEmply={addEmply} />
							</Fragment>
						)}
				</div>
				<div className='flex-large'>
					<h3>Employee Data</h3>
					<EmpTable employes={employes} editRow={editRow} deleteEmploy={deleteEmploy} />
				</div>
			</div>

		</div>
	)
}

export default App
