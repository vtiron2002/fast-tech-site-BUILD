import React, { useContext } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { UserContext } from './Context';

export default function EditProduct() {
  const { state, setState, confirmEdit, cancelEdit, deleteItem } = useContext(
    UserContext
  );

  const onChange = (e) => {
    const targetName = e.target.name;
    if (targetName === 'price' || targetName === 'amount') {
      setState({
        ...state,
        itemToEdit: {
          ...state.itemToEdit,
          [e.target.name]: parseFloat(e.target.value),
        },
      });
    } else {
      setState({
        ...state,
        itemToEdit: { ...state.itemToEdit, [targetName]: e.target.value },
      });
    }
  };

  return (
    <Modal isOpen={state.editItemModal} toggle={cancelEdit}>
      <ModalHeader toggle={undefined}>
        Edit Item - {state.itemToEdit.name}
      </ModalHeader>
      <ModalBody>
        <div
          style={{
            width: '100%',
            height: '200px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            className='img-thumbnail'
            src={state.itemToEdit.image}
            alt={state.itemToEdit.name}
            style={{ objectFit: 'contain', height: '100%' }}
          />
        </div>
        <hr />
        <form>
          <div className='form-group'>
            <label>Name:</label>
            <input
              type='text'
              className='form-control'
              value={state.itemToEdit.name}
              name='name'
              onChange={onChange}
              maxLength='28'
            />
          </div>
          <div className='form-group'>
            <label>Price:</label>
            <input
              type='number'
              className='form-control'
              value={state.itemToEdit.price}
              name='price'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label>Amount:</label>
            <input
              type='number'
              className='form-control'
              value={state.itemToEdit.amount}
              name='amount'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label>Type:</label>
            <select
              id='inputState'
              className='form-control'
              name='type'
              onChange={onChange}
            >
              <option value={state.itemToEdit.type}>Choose Type...</option>
              {state.types.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label>Image Url:</label>
            <input
              type='text'
              className='form-control'
              value={state.itemToEdit.image}
              name='image'
              onChange={onChange}
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color='danger' onClick={deleteItem}>
          Delete Item
        </Button>
        <Button color='success' onClick={confirmEdit}>
          Confirm Edit
        </Button>
        <Button
          color='outline-danger'
          onClick={() => setState({ ...state, editItemModal: false })}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
