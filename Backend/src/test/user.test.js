// const User = require("../objects/user.object");
// const UserModel = require("../models/user.entity");
// const bcrypt = require("bcrypt");

// //create a mock of the entities
// jest.mock("../models/user.entity");

// // define our tests
// describe("User Object", () => {
//   test("findUsersById", async () => {
//     //prepare
//     UserModel.findById.mockResolvedValue({
//       _userId: "fdcd2d30-4cce-4ec3-b221-d06787012f69",
//       name: "user",
//       username: "username",
//       password: "password",
//     });

//     //trigger
//     const user = new User();
//     const result = await user.findUsersById(1);

//     //assertion
//     expect(result._userId).toBe("fdcd2d30-4cce-4ec3-b221-d06787012f69");
//     expect(result.name).toBe("user");
//     expect(result.username).toBe("username");
//     expect(result.password).toBe("password");
//   });
// });

// describe("login", () => {
//   test("valid user", async () => {
//     //prepare
//     const mockPassword = "12312312321";
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(mockPassword, salt);
//     const mockData = {
//       _id: "1",
//       name: "bob",
//       age: 33,
//       email: "test@domain.com",
//       password: hash, //the hash for the password 12312312321
//     };

//     UserModel.findOne.mockReturnValue(mockData);

//     //trigger
//     const user = new User();
//     const result = await user.login("test@domain.com", mockPassword);

//     //assertion
//     expect(result).toBe(true);
//   });
// });
