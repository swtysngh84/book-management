const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@£$%_\-()[\]~;:?\.^&*+=`#])[A-Za-z\d!@£$%_\-()[\]~;:?\.\^&*+=`#]{8,}$/;

module.exports = {
  passwordRegex,
};
