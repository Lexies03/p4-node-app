import ImageDelete from "../../assets/delete.png";
import ImageEdit from "../../assets/edit.png";
import ImageDone from "../../assets/done.png";

const BudgetGroceryPage = ({
  exceedError,
  totalBudget,
  budget,
  listHeader,
  errorBudget,
  handleChange,
  handleSubmit,
  handleBudget,
  form,
  totalAmount,
  currentGrocery,
  setBudget,
  removeBudget,
  putBudget,
  selectedGrocery,
  doneBudget,
  clearText,
  getUpdateBudget,
}) => {
  return (
    <div className="budget-grocery-main-container">
      <h1 className="budget-header">Budget Grocery</h1>
      <div className="form-add-budget">
        <input
          type="text"
          placeholder="Enter your budget"
          id="budget"
          value={budget}
          onChange={(event) => {
            setBudget(event.target.value);
          }}
          className="budget-input budgetFont"
        />
        <button onClick={handleBudget} className="btn-add-budget budgetFont">
          {totalBudget ? "Update" : "Budget"}
        </button>
      </div>

      <form className="budget-form" onSubmit={handleSubmit}>
        <div className="line"></div>

        <div className="form-add-product">
          <label htmlFor="name">Product:</label>
          <input
            type="text"
            placeholder="Enter product"
            id="name"
            onChange={handleChange}
            value={form.name}
            className="budget-input budgetFont"
          />

          <label htmlFor="price">Price:</label>
          <input
            type="text"
            placeholder="Enter price"
            id="price"
            onChange={handleChange}
            value={form.price}
            className="budget-input budgetFont"
          />

          <select className="budgetFont">
            <option>Quantity:</option>
            <option>Kilo:</option>
            <option>Meter:</option>
          </select>
          <input
            type="text"
            placeholder="Enter a number"
            id="quantity"
            onChange={handleChange}
            value={form.quantity}
            className="budget-input budgetFont"
          />

          <label htmlFor="total">Total:</label>
          <label
            className="budget-total"
            id="total"
            value={form.price * form.quantity}
          >
            {form.price * form.quantity}
          </label>
        </div>

        {errorBudget.errorGeneral && (
          <p className="error-message">Please input a valid grocery.</p>
        )}
        <div className="btnFormContainer">
          <input
            className="btn-add-product budgetFont btnRed"
            type="submit"
            value={
              selectedGrocery &&
              form.name &&
              form.price &&
              form.quantity &&
              form.total
                ? "Edit Grocery"
                : "Add Grocery"
            }
          />
          <button
            className="btn-add-product budgetFont btnBlue"
            onClick={() => {
              clearText();
            }}
          >
            Clear
          </button>
        </div>

        <div className="line"></div>
      </form>

      <div className="budget-total-amount">
        <h2>Budget: {totalBudget}</h2>
        <h2>Total: {totalAmount}</h2>
        {exceedError ? (
          <p className="exceedError">
            Total exceeds the budget with {totalAmount - totalBudget} pesos
          </p>
        ) : (
          <p style={{ color: "green" }}>
            Great! You have extra {totalBudget - totalAmount} pesos
          </p>
        )}
      </div>

      {/* LIST OF ADDED GROCERY */}
      {listHeader ? (
        <div className="budget-headers">
          <h4>Product</h4>
          <h4>Price</h4>
          <h4>Quantity</h4>
          <h4>Total</h4>
        </div>
      ) : null}

      <ul className="all-list">
        {currentGrocery.map((grocery) => {
          return (
            <li key={grocery._id} className="budget-list">
              <p
                style={{
                  color: grocery.complete ? "#FF8A8A" : "#FFF",
                  textDecoration: grocery.complete ? "line-through" : "none",
                }}
              >
                {grocery.name}
              </p>
              <p
                style={{
                  color: grocery.complete ? "#FF8A8A" : "#FFF",
                  textDecoration: grocery.complete ? "line-through" : "none",
                }}
              >
                {grocery.price}
              </p>
              <p
                style={{
                  color: grocery.complete ? "#FF8A8A" : "#FFF",
                  textDecoration: grocery.complete ? "line-through" : "none",
                }}
              >
                {grocery.quantity}
              </p>
              <p
                style={{
                  color: grocery.complete ? "#FF8A8A" : "#FFF",
                  textDecoration: grocery.complete ? "line-through" : "none",
                }}
              >
                {grocery.quantity * grocery.price}
              </p>
              <div className="btn-budget-container">
                <button
                  className="btn-grocery"
                  onClick={() => doneBudget(grocery._id)}
                >
                  <img
                    src={ImageDone}
                    alt="done"
                    style={{ width: "20px", height: "20px" }}
                  />
                </button>

                <button
                  className="btn-grocery"
                  onClick={() => getUpdateBudget(grocery._id)}
                >
                  <img
                    src={ImageEdit}
                    alt="delete"
                    style={{ width: "20px", height: "20px" }}
                  />
                </button>

                <button
                  className="btn-grocery"
                  onClick={() => removeBudget(grocery._id)}
                >
                  <img
                    src={ImageDelete}
                    alt="delete"
                    style={{ width: "20px", height: "20px" }}
                  />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BudgetGroceryPage;
