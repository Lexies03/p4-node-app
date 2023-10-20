class GroceryModel {
  constructor() {}

  async getBudgetList() {
    let response;
    try {
      response = await fetch("http://localhost:9000/budget", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }

    if (response.status === 401) {
      localStorage.removeItem("token");
      throw new Error("Unauthorized access");
    } else if (!response?.ok) {
      throw new Error("Failed to get users");
    }
  }

  async addBudgetList(grocery) {
    try {
      const response = await fetch("http://localhost:9000/budget", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(grocery),
      });
      const data = response.json();
      return data;
    } catch (err) {
      console.log(err);
    }

    if (response.status === 401) {
      localStorage.removeItem("token");
      throw new Error("Unauthorized access");
    } else if (!response?.ok) {
      throw new Error("Failed to get users");
    }
  }

  async deleteBudgetList(id) {
    const response = await fetch(`http://localhost:9000/budget/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = response.json();
    return data;
  }

  async completeBudgetList(id) {
    const response = await fetch(
      `http://localhost:9000/budget/toggle/complete/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    return data;
  }

  async updateBudgetList(id, grocery) {
    const response = await fetch(`http://localhost:9000/budget/update/${id}`, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(grocery),
    });
    const data = response.json();
    return data;
  }

  async getUpdateBudgetList(id) {
    const response = await fetch(`http://localhost:9000/budget/update/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    return data;
  }
}

const model = new GroceryModel();
export default model;
