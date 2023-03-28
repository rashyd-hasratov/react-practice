import React, { useState } from 'react';
import classNames from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const allProducts = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(({ id }) => (
    id === product.categoryId
  )); // find by product.categoryId
  const user = usersFromServer.find(({ id }) => (
    id === category.ownerId
  )); // find by category.ownerId

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [activeUserId, setActiveUserId] = useState(0);
  const [query, setQuery] = useState('');

  const visibleProducts = allProducts.filter((product) => {
    const { user, name } = product;

    return (activeUserId === 0 || user.id === activeUserId)
      && name.toLowerCase().includes(query.toLowerCase());
  });

  const reset = () => {
    setActiveUserId(0);
    setQuery('');
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                className={classNames(
                  { 'is-active': activeUserId === 0 },
                )}
                onClick={() => setActiveUserId(0)}
              >
                All
              </a>

              {usersFromServer.map((user) => {
                const { id, name } = user;

                return (
                  <a
                    key={id}
                    className={classNames(
                      { 'is-active': activeUserId === id },
                    )}
                    data-cy="FilterUser"
                    href="#/"
                    onClick={() => setActiveUserId(id)}
                  >
                    {name}
                  </a>
                );
              })}
              {/* <a
                data-cy="FilterUser"
                href="#/"
              >
                User 1
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className="is-active"
              >
                User 2
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
              >
                User 3
              </a> */}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {query !== '' && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setQuery('')}
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              {categoriesFromServer.map((categoryFromServer) => {
                const { title } = categoryFromServer;

                return (
                  <a
                    data-cy="Category"
                    className="button mr-2 my-1 is-info"
                    href="#/"
                  >
                    {title}
                  </a>
                );
              })}

              {/* <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 4
              </a> */}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={reset}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {visibleProducts.length > 0
            ? (
              <table
                data-cy="ProductTable"
                className="table is-striped is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        ID

                        <a href="#/">
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort" />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Product

                        <a href="#/">
                          <span className="icon">
                            <i
                              data-cy="SortIcon"
                              className="fas fa-sort-down"
                            />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Category

                        <a href="#/">
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort-up" />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        User

                        <a href="#/">
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort" />
                          </span>
                        </a>
                      </span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {visibleProducts.map((product) => {
                    const {
                      id,
                      name,
                      category,
                      user,
                    } = product;

                    return (
                      <tr key={id} data-cy="Product">
                        <td
                          className="has-text-weight-bold"
                          data-cy="ProductId"
                        >
                          {id}
                        </td>

                        <td data-cy="ProductName">
                          {name}
                        </td>
                        <td data-cy="ProductCategory">
                          <span role="img" aria-label="">
                            {category.icon}
                          </span>
                          {` - ${category.title}`}
                        </td>

                        <td
                          data-cy="ProductUser"
                          className={classNames(
                            { 'has-text-link': user.sex === 'm' },
                            { 'has-text-danger': user.sex === 'f' },
                          )}
                        >
                          {user.name}
                        </td>
                      </tr>
                    );
                  })}
                  {/* <tr data-cy="Product">
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      1
                    </td>

                    <td data-cy="ProductName">Milk</td>
                    <td data-cy="ProductCategory">
                      🍺 - Drinks
                    </td>

                    <td
                      data-cy="ProductUser"
                      className="has-text-link"
                    >
                      Max
                    </td>
                  </tr>

                  <tr data-cy="Product">
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      2
                    </td>

                    <td data-cy="ProductName">Bread</td>
                    <td data-cy="ProductCategory">🍞 - Grocery</td>

                    <td
                      data-cy="ProductUser"
                      className="has-text-danger"
                    >
                      Anna
                    </td>
                  </tr>

                  <tr data-cy="Product">
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      3
                    </td>

                    <td data-cy="ProductName">iPhone</td>
                    <td data-cy="ProductCategory">💻 - Electronics</td>

                    <td
                      data-cy="ProductUser"
                      className="has-text-link"
                    >
                      Roma
                    </td>
                  </tr> */}
                </tbody>
              </table>
            )
            : (
              <p data-cy="NoMatchingMessage">
                No products matching selected criteria
              </p>
            )
          }
        </div>
      </div>
    </div>
  );
};
