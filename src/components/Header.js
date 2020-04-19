import React, { useContext, useState } from "react";
import { UserContext } from "./Context";
import { Link } from "react-router-dom";

export default function Header() {
  const { setState, state } = useContext(UserContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const lowAndHighSort = ["Low to High", "High to Low"];

  const onSearch = e => {
    e.preventDefault();
    if (searchTerm.length > 0) {
      document.querySelector(".searchBtn").click();
    } else {
      document.querySelector(".allP").click();
    }
  };

  const closeDropdown = () => {
    document
      .querySelector("body")
      .addEventListener("click", () => setDropdown(false));
  };
  closeDropdown();

  return (
    <nav
      className='navbar navbar-light sticky-top border-bottom border-primary'
      style={{ background: '#e6e6e6' }}
    >
      <div className='container'>
        <Link to='/fast-tech-site-BUILD/' className='navbar-brand'>
          <h1 className='m-0 font-weight-light'>Fast Tech</h1>
        </Link>
        <div className='row flex-fill'>
          <div className='col-md-2 offset-md-3'>
            <div className='dropdown'>
              <button
                className='btn btn-secondary btn-block dropdown-toggle'
                onClick={() => setDropdown(!dropdown)}
              >
                Sort by
              </button>

              <div className={`dropdown-menu ${dropdown && 'show'}`}>
                <Link
                  onClick={() => setDropdown(false)}
                  className='dropdown-item allP'
                  to='/fast-tech-site-BUILD/'
                >
                  All Products
                </Link>
                {state.types.map((type) => (
                  <Link
                    onClick={() => setDropdown(false)}
                    key={type}
                    className='dropdown-item'
                    to={`/fast-tech-site-BUILD/${type}`}
                  >
                    {type}
                  </Link>
                ))}
                <hr className='my-2' />
                {lowAndHighSort.map((sort) => (
                  <Link
                    onClick={() => setDropdown(false)}
                    to={`/fast-tech-site-BUILD/${sort}`}
                    key={sort}
                    className='dropdown-item'
                  >
                    {sort}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className='col-md-4'>
            <form className='' onSubmit={onSearch}>
              <input
                className='form-control'
                type='search'
                placeholder='Search'
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <Link
                hidden
                to={`/fast-tech-site-BUILD/search/${searchTerm}`}
                className='btn btn-primary mx-2 searchBtn'
              >
                Search
              </Link>
            </form>
          </div>

          <div className='col-md-3'>
            <button
              className='btn btn-primary btn-block'
              onClick={() => setState({ ...state, newItemModal: true })}
            >
              Add to Inventory
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
