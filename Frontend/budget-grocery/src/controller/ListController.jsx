import { useEffect, useReducer, useState } from "react";
import ListGroceryPage from "../view/pages/ListGroceryPage";

import groceryModel from "../model/GroceryModel";

const ListController = () => {
  const [selectedGrocery, setSelectedGrocery] = useState("");
  const [form, setForm] = useState({
    name: "",
    quantity: "",
  });
  const [currentGrocery, setCurrentGrocery] = useState([]);
  console.log(currentGrocery);
  const [errorList, setErrorList] = useState({
    errorGeneral: false,
  });

  const getGrocery = async () => {
    return groceryModel.getGrocery();
  };

  const postGrocery = async () => {
    try {
      const newGrocery = await groceryModel.addGrocery({
        ...form,
        name: form.name,
        quantity: form.quantity,
      });
      setCurrentGrocery([...currentGrocery, newGrocery]);
    } catch (error) {
      throw new Error("Failed to add", error);
    }
  };

  const putGrocery = async (id) => {
    try {
      setSelectedGrocery("");
      const data = await groceryModel.updateGrocery(id, form);
      setCurrentGrocery((currentGrocery) =>
        currentGrocery.map((grocery) => {
          if (data._id === grocery._id) {
            return {
              ...grocery,
              name: data.name,
              quantity: data.quantity,
            };
          } else {
            return grocery;
          }
        })
      );
      setForm({ name: "", quantity: "" });
    } catch (error) {
      console.error("Error fetching grocery item:", error);
    }
  };

  const removeGrocery = async (id) => {
    const newGrocery = await groceryModel.deleteGrocery(id);
    if (newGrocery) {
      setCurrentGrocery(currentGrocery.filter((grocery) => grocery._id !== id));
    }
  };

  const doneGrocery = async (id) => {
    const data = await groceryModel.completeGrocery(id);
    setCurrentGrocery((currentGrocery) =>
      currentGrocery.map((grocery) => {
        if (grocery._id === data._id) {
          grocery.complete = data.complete;
        }
        return grocery;
      })
    );
  };

  const getUpdate = async (id) => {
    const data = await groceryModel.getUpdateGrocery(id);
    setForm({ ...form, name: data.name, quantity: data.quantity });
    setSelectedGrocery(id);
  };

  const clearText = () => {
    setForm({ ...form, name: "", quantity: "" });
  };

  useEffect(() => {
    getGrocery().then((grocery) => {
      setCurrentGrocery(grocery);
    });
  }, []);

  const handleChange = (event) => {
    switch (event.target.id) {
      case "product":
        return setForm({ ...form, name: event.target.value });
      case "quantity":
        return setForm({ ...form, quantity: event.target.value });
      default:
        return form;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedGrocery) {
      putGrocery(selectedGrocery);
    } else if (form.name && form.quantity && !selectedGrocery) {
      postGrocery();
    } else {
      console.log("No data to update or post. Error");
    }

    setErrorList({
      ...errorList,
      errorGeneral: !form.name && !form.quantity,
    });
    setForm({
      ...form,
      name: "",
      quantity: "",
    });
  };

  return (
    <ListGroceryPage
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      currentGrocery={currentGrocery}
      form={form}
      errorList={errorList}
      removeGrocery={removeGrocery}
      putGrocery={putGrocery}
      selectedGrocery={selectedGrocery}
      doneGrocery={doneGrocery}
      clearText={clearText}
      getUpdate={getUpdate}
    />
  );
};

export default ListController;
