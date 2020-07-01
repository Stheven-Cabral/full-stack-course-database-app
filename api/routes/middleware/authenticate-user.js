'use strict'

const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');
const User = require('../../models').User;

// Authentication middleware
const authenticateUser = async (req, res, next) => {
  let message = null;
  const users = await User.findAll();
  const credentials = auth(req);

  if (credentials) {
    const userData = users.find(u => u.emailAddress === credentials.name);
    const user = userData.dataValues;
    console.log(user);
    console.log(credentials);

    if (user) {
      const authenticated = bcryptjs.compare(credentials.pass, user.password);

      if (authenticated) {
        req.currentUser = user;
      } else {
        message = `Authentication failed for user: ${user.emailAddress}`;
      }
    } else {
      message = `User not found with email address: ${credentials.name}`;
    }
  } else {
    message = `Authorization header not found. You are not authorized to create a course.`;
  }

  if (message) {
    console.warn(message);
    res.status(401).json({ message: message });
  } else {
    next();
  }
};

module.exports = { authenticateUser };