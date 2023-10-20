import ImageDelete from "../../assets/delete.png";
import ImageEdit from "../../assets/edit.png";
import ImageDone from "../../assets/done.png";

const ListGroceryPage = ({
  handleChange,
  handleSubmit,
  currentGrocery,
  form,
  errorList,
  removeGrocery,
  selectedGrocery,
  doneGrocery,
  clearText,
  getUpdate,
}) => {
  return (
    <div className="budget-grocery-main-container">
      <h1 className="list-header">List Grocery</h1>

      <form className="list-form" onSubmit={handleSubmit}>
        <div className="form-list-product">
          <label htmlFor="product">Product:</label>
          <input
            type="text"
            placeholder="Enter product"
            id="product"
            onChange={handleChange}
            value={form.name}
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
        </div>
        <div className="btnFormContainer">
          <input
            className="btn-add-product budgetFont btnRed"
            type="submit"
            value={
              selectedGrocery && form.name && form.quantity
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

        {errorList.errorGeneral && (
          <p className="error-message">Please input a valid grocery.</p>
        )}

        <div className="line"></div>
      </form>

      {/* LIST OF ADDED GROCERY */}
      <div className="list-headers">
        <h4>Product</h4>
        <h4>Quantity</h4>
      </div>

      <ul className="all-list">
        {currentGrocery.map((grocery) => {
          return (
            <li key={grocery._id} className="grocery-list">
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
                {grocery.quantity}
              </p>

              <div className="btn-budget-container">
                <button
                  className="btn-grocery"
                  onClick={() => doneGrocery(grocery._id)}
                >
                  <img
                    src={ImageDone}
                    alt="done"
                    style={{ width: "20px", height: "20px" }}
                  />
                </button>
                <button
                  className="btn-grocery"
                  onClick={() => getUpdate(grocery._id)}
                >
                  <img
                    src={ImageEdit}
                    alt="edit"
                    style={{ width: "20px", height: "20px" }}
                  />
                </button>
                <button
                  className="btn-grocery "
                  onClick={() => removeGrocery(grocery._id)}
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

export default ListGroceryPage;
