// reduce an array

const someArray = [2, 3, 5];
const initialValue = 1;
const product = someArray.reduce(
    (accumulator, currentValue) => accumulator * currentValue, initialValue
);
console.log(product);
// expected output: 30 = 1*2*3*5