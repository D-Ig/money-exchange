// PLEASE DON'T change function name
module.exports = function makeExchange(currency) {
  if (currency > 10000) {
    return {error: "You are rich, my friend! We don't have so much coins for exchange"};
  };

  const mapping = [
    {
      check: amount => amount >= 50,
      name: 'H',
      quantity: amount => Math.floor(amount / 50),
      rest: amount => amount % 50,
    },
    {
      check: amount => amount < 50 && amount >= 25,
      name: 'Q',
      quantity: amount => Math.floor(amount / 25),
      rest: amount => amount % 25,
    },
    {
      check: amount => amount < 25 && amount >= 10,
      name: 'D',
      quantity: amount => Math.floor(amount / 10),
      rest: amount => amount % 10,
    },
    {
      check: amount => amount < 10 && amount >= 5,
      name: 'N',
      quantity: amount => Math.floor(amount / 5),
      rest: amount => amount % 5,
    },
    {
      check: amount => amount < 5 && amount >= 1,
      name: 'P',
      quantity: amount => Math.floor(amount / 1),
      rest: amount => amount % 1,
    },
  ];

  const getCoin = amount => mapping.find(({ check }) => check(amount));

  const iter = (amount, acc) => {
    if (amount <= 0) {
      return acc;
    };
    const { name, quantity, rest } = getCoin(amount);
    const newAcc = { ...acc, [name]: quantity(amount) };
    return iter(rest(amount), newAcc);
  };

  return iter(currency, {});
};
