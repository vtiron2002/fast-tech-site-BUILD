import React, { useContext } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { UserContext } from "./Context";

export default function AddProduct() {
  const { state, setState, confirmAdd, cancelAdd } = useContext(UserContext);
  const placeholderImage = require("../images/noImagePlaceholder.jpg");

  const onChange = e => {
    setState({
      ...state,
      newItem: { ...state.newItem, [e.target.name]: e.target.value }
    });
  };

  return (
    <Modal isOpen={state.newItemModal} toggle={cancelAdd}>
      <ModalHeader toggle={undefined}>Add Product</ModalHeader>
      <ModalBody>
        <div
          style={{
            width: "100%",
            height: "200px",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <img
            className="img-thumbnail"
            src={state.newItem.image ? state.newItem.image : placeholderImage}
            alt={state.newItem.name}
            style={{ objectFit: "contain", height: "100%" }}
          />
        </div>
        <hr />
        <form>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              value={state.newItem.name}
              name="name"
              onChange={onChange}
              maxLength="28"
            />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              className="form-control"
              value={state.newItem.price}
              name="price"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="number"
              className="form-control"
              value={state.newItem.amount}
              name="amount"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label>Type:</label>
            <select
              id="inputState"
              className="form-control"
              name="type"
              onChange={onChange}
              value={state.newItem.type}
            >
              <option value={state.newItem.type}>
                Choose Type...
              </option>
              {state.types.map(type => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Image Url:</label>
            <input
              type="text"
              className="form-control"
              value={state.newItem.image}
              name="image"
              onChange={onChange}
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={confirmAdd}>
          Add Product
        </Button>
        <Button
          color="danger"
          onClick={() => setState({ ...state, newItemModal: false })}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
