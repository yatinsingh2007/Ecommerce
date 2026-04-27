const authService = require("../services/authService");
const { sendResponse } = require("../utils/response");

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    return sendResponse(res, 201, "User registered successfully", {
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return sendResponse(res, 500, "Registration failed", error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    return sendResponse(res, 200, "Login successful", {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return sendResponse(res, 401, "Login failed", error.message);
  }
};

module.exports = {
  register,
  login,
};