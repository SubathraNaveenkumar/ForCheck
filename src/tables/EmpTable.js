import React from 'react';
import { useState, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { IoMdTrash, IoMdCreate } from 'react-icons/io';

const EmpTable = props => {
  const toggle = () => setModal(!modal);
  const [modal, setModal] = useState(false);
  return (
    <Fragment>
      <table className='table_height'>
        <thead>
          <tr>
            <th>Emp_Id</th>
            <th>Emp_Name</th>
            <th>Emp_Salary</th>
            <th>Emp_Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.employes.length > 0 ? (
            props.employes.map((user, ind) => ( //loop 
              <tr key={ind}> 
                <td>{user.id}</td>
                <td>{user.employee_name}</td>
                <td>{user.employee_salary}</td>
                <td>{user.employee_age}</td>
                <td>
                  <button
                    onClick={() => {
                      props.editRow(user);
                    }}
                    className='button muted-button'
                  >
                    <IoMdCreate />
                  </button>
                  <button onClick={toggle} className='button muted-button'>
                    <IoMdTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No employes</td>
            </tr>
          )}
        </tbody>
      </table>
     
      <Modal className = 'back' isOpen={modal} toggle={toggle} >
        <div className = 'modal'>
        <ModalHeader toggle={toggle}>Delete </ModalHeader>
        <ModalBody>Do you want to Delete?</ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={ () => 
             props.employes.map((user, ind) => (
              <p key={ind}>
                {props.deleteEmploy(user.id)} 
              </p>
            )) 
          }>
            Confirm
          </Button>{' '}
          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
        </div>
        
      </Modal>
    </Fragment>
  );
};

export default EmpTable;