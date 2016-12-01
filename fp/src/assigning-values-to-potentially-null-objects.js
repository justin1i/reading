import { curry } from 'ramda';
import { Maybe } from 'ramda-fantasy';

let user = {
  name: 'joe',
};
//user = null;

let discount = {
  code: 'ABCD',
};
//discount = null;



function handle(user, discount) {
  const maybeUser = Maybe(user);
  const maybeDiscount = Maybe(discount);

  const applyDiscount = curry(function(user, discount) {
    user.discount = discount.code;
    return user;
  });

  const maybeApplyDiscountFunc = maybeUser.map(applyDiscount);
  const maybeApplyDiscountUser = maybeApplyDiscountFunc.ap(maybeDiscount);
  
  console.log(maybeApplyDiscountUser);
} 

handle(user, discount);