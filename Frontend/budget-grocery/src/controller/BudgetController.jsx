import { useEffect, useReducer, useState } from "react";
import BudgetGroceryPage from "../view/pages/BudgetGroceryPage";
import budgetModel from "../model/BudgetModel";

const BudgetController = () => {
  const [exceedError, setExceedError] = useState(false);
  const [totalBudget, setTotalBudget] = useState(0);
  const [budget, setBudget] = useState(null);
  const [listHeader, setListHeader] = useState(false);
  const [errorBudget, setErrorBudget] = useState({
    errorGeneral: false,
  });
  const [selectedGrocery, setSelectedGrocery] = useState("");
  const [currentGrocery, setCurrentGrocery] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    total: "",
  });

  useEffect(() => {
    getBudget().then((grocery) => {
      setCurrentGrocery(grocery);
    });
  }, []);

  const getBudget = async () => {
    return budgetModel.getBudgetList();
  };

  const postBudget = async () => {
    try {
      const newGrocery = await budgetModel.addBudgetList({
        ...form,
        name: form.name,
        price: form.price,
        quantity: form.quantity,
        total: form.price * form.quantity,
      });
      setCurrentGrocery([...currentGrocery, newGrocery]);
    } catch (error) {
      throw new Error("Failed to add", error);
    }
  };

  const putBudget = async (id) => {
    try {
      setSelectedGrocery("");
      const data = await budgetModel.updateBudgetList(id, {
        ...form,
        total: form.price * form.quantity,
      });
      setCurrentGrocery((currentGrocery) =>
        currentGrocery.map((grocery) => {
          if (data._id === grocery._id) {
            return {
              ...grocery,
              name: data.name,
              price: data.price,
              quantity: data.quantity,
              total: data.total,
            };
          } else {
            return grocery;
          }
        })
      );
      setForm({ name: "", price: "", quantity: "", total: 0 });
    } catch (error) {
      console.error("Error fetching grocery item:", error);
    }
  };

  const removeBudget = async (id) => {
    const newGrocery = await budgetModel.deleteBudgetList(id);
    if (newGrocery) {
      setCurrentGrocery(currentGrocery.filter((grocery) => grocery._id !== id));
    }
  };

  const doneBudget = async (id) => {
    const data = await budgetModel.completeBudgetList(id);

    setCurrentGrocery((currentGrocery) =>
      currentGrocery.map((grocery) => {
        if (grocery._id === data._id) {
          grocery.complete = data.complete;
        }
        return grocery;
      })
    );
  };

  const getUpdateBudget = async (id) => {
    const data = await budgetModel.getUpdateBudgetList(id);
    setForm({
      ...form,
      name: data.name,
      price: data.price,
      quantity: data.quantity,
      total: data.total,
    });
    setSelectedGrocery(id);
  };

  const clearText = () => {
    setForm({ name: "", price: "", quantity: "", total: 0 });
  };

  const handleChange = (event) => {
    switch (event.target.id) {
      case "name":
        return setForm({ ...form, name: event.target.value });
      case "price":
        return setForm({ ...form, price: event.target.value });
      case "quantity":
        return setForm({ ...form, quantity: event.target.value });
      case "total":
        return setForm({ ...form, total: event.target.value });
      default:
        return form;
    }
  };

  const totalAmount = currentGrocery.reduce((acc, grocery) => {
    return acc + parseFloat(grocery.total);
  }, 0);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedGrocery) {
      putBudget(selectedGrocery);
    } else if (form.name && form.price && form.quantity && !selectedGrocery) {
      postBudget();
    } else {
      console.log("No data to update or post. Error");
    }

    setErrorBudget({
      ...errorBudget,
      errorGeneral: !form.product && !form.price && !form.quantity,
    });

    setForm({
      ...form,
      product: "",
      price: "",
      quantity: "",
      total: 0,
    });
  };

  useEffect(() => {
    if (Object.keys(currentGrocery).length > 0) {
      setListHeader(true);
    } else {
      setListHeader(false);
    }
    handleError();
  }, [totalAmount, currentGrocery, totalBudget]);

  const handleError = () => {
    if (totalAmount < totalBudget) {
      setExceedError(false);
    } else if (totalAmount == totalBudget) {
      setExceedError(false);
    } else {
      setExceedError(true);
    }
  };

  const handleBudget = () => {
    if (budget > 0) {
      setTotalBudget(budget);
      setBudget("");
    } else {
      alert("Add budget a valid budget");
      setBudget("");
    }
  };

  return (
    <BudgetGroceryPage
      exceedError={exceedError}
      totalBudget={totalBudget}
      budget={budget}
      setBudget={setBudget}
      listHeader={listHeader}
      errorBudget={errorBudget}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleBudget={handleBudget}
      form={form}
      totalAmount={totalAmount}
      removeBudget={removeBudget}
      putBudget={putBudget}
      selectedGrocery={selectedGrocery}
      doneBudget={doneBudget}
      clearText={clearText}
      getUpdateBudget={getUpdateBudget}
      currentGrocery={currentGrocery}
    />
  );
};

export default BudgetController;
