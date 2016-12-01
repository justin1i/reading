import Validation from 'data.validation';
import R from 'ramda';

const { Failure, Success } = Validation;

/*
function isUserNameValid(a) {
  return /^(0|[1-9][0-9]*)$/.test(a) ?
    ['Username can\'t be a number'] : a;
}
*/

function isUserNameValid(a) {
  return /^(0|[1-9][0-9]*)$/.test(a) ?
    Failure(['Username can\'t be a number']) : Success(a);
}

function isPwdLengthCorrect(a) {
  return a.length == 10 ? Success(a) : Failure(['Password must be 10 characters']);
}

function isEmailValid(a) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(a) ? Success(a) : Failure(['Email is not valid']);
}

const returnSuccess = () => 'success';

function validateForm(username, pwd, email) {
  let success = R.curryN(3, returnSuccess);
  return Success(success)
    .ap(isUserNameValid(username))
    .ap(isPwdLengthCorrect(pwd))
    .ap(isEmailValid(email));
}

console.log(validateForm('raja', '1234567890', 'r@r.com').value);

console.log(validateForm('raja', 'pwd', 'r@r.com').value);

console.log(validateForm('raja', 'pwd', 'notAnEmail').value);

console.log(validateForm('123', 'pwd', 'notAnEmail').value);

