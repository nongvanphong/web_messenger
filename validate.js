const v = require("validator");

vemail = (a) => {
  if (!v.isEmail(a) || !v.isLength(a, { min: 3, max: 45 })) {
    return true;
  } else {
    return false;
  }
};

vpass = (a) => {
  return !v.isLength(a, { min: 6, max: 15 });
};
vname = (a) => {
  return !v.isLength(a, { min: 2, max: 30 });
};
vinteger = (a) => {
  return !v.isInt(a);
};

module.exports = {
  email: vemail,
  pass: vpass,
  name: vname,
  id_int: vinteger,
};
