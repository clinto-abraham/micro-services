const User = require('../../models/User');

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 12);

exports.generateUsername = async (name, email) => {
  const base =
    slugify(name) ||
    (email ? slugify(email.split('@')[0]) : 'user');

  let username = base;
  let counter = 1;

  while (await User.exists({ username })) {
    username = `${base}${counter}`;
    counter++;
  }

  return username;
};
