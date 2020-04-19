import React, { useContext } from "react";
import { UserContext } from "./Context";
import {
  Card,
  CardImg,
  CardBody,
  CardSubtitle,
  CardText,
  CardHeader,
  CardFooter
} from "reactstrap";

const placeholderImage = require("../images/noImagePlaceholder.jpg");

export default function Product({ item }) {
  const { state, setState, toggleEdit } = useContext(UserContext);

  const addCommas = () => {
    if (item.price) {
      return item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  };

  const removeItem = () => {
    if (window.confirm(`Are you sure you want to remove ${item.name}?`)) {
      // fetch(`/products/remove/${item._id}`, {
      //   method: 'DELETE',
      // });
      const newItems = state.items.filter(i => i._id !== item._id);
      setState({ ...state, items: newItems });
    }
  };

  return (
    <div
      key={item._id}
      className=""
      style={{ display: "flex", flex: 1, maxHeight: "500px" }}
    >
      <Card className="shadow border rounded-lg" style={{ minWidth: "100%" }}>
        <div className="image-container">
          <CardImg
            src={item.image ? item.image : placeholderImage}
            alt="Image Not Found"
            style={{ maxHeight: "70%", width: "100%", objectFit: "contain" }}
          />
        </div>
        <CardHeader tag="h3">{item.name}</CardHeader>
        <CardBody>
          <CardSubtitle className="text-muted">{item.type}</CardSubtitle>
          <CardText className="h3 text-success">${addCommas()}</CardText>
          <CardText>
            <span className="h5 text-danger">{item.amount}</span> in stock
          </CardText>
        </CardBody>
        <CardFooter>
          <div className="btn-group w-100">
            <button
              className="btn btn-outline-dark"
              onClick={() => toggleEdit(item._id)}
            >
              Edit
            </button>
            <button className="btn btn-outline-danger" onClick={removeItem}>
              Remove
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
