class UserModel {
  constructor() {}

  async getUsers() {
    try {
      const response = await fetch("http://localhost:9000/user", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async addUser(user) {
    try {
      const response = await fetch("http://localhost:9000/user", {
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
        body: JSON.stringify(user),
      });
      const data = response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to add user", error);
    }
  }

  async login(username, password) {
    try {
      const user = {
        username: username,
        password: password,
      };
      const response = await fetch("http://localhost:9000/auth/login", {
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
        body: JSON.stringify(user),
      });

      const data = await response.text();
      return data;
    } catch (err) {
      throw new Error("Failed to add user", err);
    }
  }
}

const model = new UserModel();
export default model;
