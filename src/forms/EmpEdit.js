import React, { useState, useEffect } from 'react'

const EmpEdit = props => {
  const [user, setUser] = useState(props.currentEmp) 

    useEffect(
      () => {
        setUser(props.currentEmp)
      }, [props]
    )

    const error = { nameErr: '', salErr: '', ageErr: '' }

	const [validation, setValidation] = useState(error);

    const handleInputChange = event => {
      const { name, value } = event.target
      setUser({ ...user, [name]: value })
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
				//console.log(validation);
				if (constnamerr === '' && constsalrr === '' && constagerr === '') {
          			props.updateEmploy(user.id, user)
					//setUser(initialEmployState)
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


        <button>Update</button>
        <button onClick={() => props.setEditing(false)} className='button muted-button'>
          Cancel
        </button>
      </form>
  )
}

export default EmpEdit
