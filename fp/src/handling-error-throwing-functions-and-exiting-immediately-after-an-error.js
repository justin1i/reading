/*
import _ from 'ramda';

// Imperative
const tax = (tax, price) => {
  if (!_.is(Number, price)) return new Error('Price must be numeric');

  return price + (tax * price);
};

const discount = (dis, price) => {
  if (!_.is(Number, price)) return new Error('Price must be numeric');

  if (price < 10) return new Error('discount cant be applied for items priced below 10');

  return price - (price * dis);
};

const isError = (e) => e && e.name == 'Error';

const getItemPrice = (item) => item.price;

const showTotalPrice = (item, taxPerc, disPerc) => {
  let price = getItemPrice(item);
  let result = tax(taxPerc, price);
  if (isError(result)) {
    return console.log(`Error: ${result.message}`);
  }
  result = discount(disPerc, result);
  if (isError(result)) {
    return console.log(`Error: ${result.message}`);
  }
  console.log(`Total Price: ${result}`);
};

let tShirt = { name: 't-shirt', price: 11 };
let pant = { name: 'pant', price: '10 dollars' };
let chips = { name: 'chips', price: 5 };

showTotalPrice(tShirt, 0.1, 0.25);
showTotalPrice(pant, 0.1, 0.25);
showTotalPrice(chips, 0.1, 0.25);
*/

import _, { curry } from 'ramda';
import { Either } from 'ramda-fantasy';

const { Left, Right } = Either;

const tax = curry((tax, price) => {
  if (!_.is(Number, price)) return Left(new Error('Price must be numeric'));

  return Right(price + (tax * price));
});

const discount = curry((dis, price) => {
  if (!_.is(Number, price)) return Left(new Error('Price must be numeric'));

  if (price < 10) return Left(new Error('discount cant be applied for items priced below 10'));

  return Right(price - (price * dis));
});

const getItemPrice = (item) => Right(item.price);

const displayTotal = (total) => {
   console.log(`Total Price: ${total}`);
};

const logError = (error) => {
  console.log(`Error: ${error.message}`);
};

const eitherLogOrShow = Either.either(logError, displayTotal);

const addCaliTax = tax(0.1);
const apply25PercDisc = discount(0.25);

// api
const showTotalPrice = (item) =>
  eitherLogOrShow(
    getItemPrice(item)
      .chain(apply25PercDisc)
      .chain(addCaliTax)
  );

let tShirt = { name: 't-shirt', price: 11 };
let pant = { name: 'pant', price: '10 dollars' };
let chips = { name: 'chips', price: 5 };

showTotalPrice(tShirt);
showTotalPrice(pant);
showTotalPrice(chips);
