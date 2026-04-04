type Balance = {
  userId: string;
  amount: number;
};

export function simplifyDebts(balances: Balance[]) {
  const creditors = balances.filter((b) => b.amount > 0);
  const debtors = balances.filter((b) => b.amount < 0);

  creditors.sort((a, b) => b.amount - a.amount);
  debtors.sort((a, b) => a.amount - b.amount);

  const result = [];

  let i = 0,
    j = 0;

  while (i < creditors.length && j < debtors.length) {
    const credit = creditors[i];
    const debt = debtors[j];

    const amt = Math.min(credit.amount, -debt.amount);

    result.push({
      from: debt.userId,
      to: credit.userId,
      amount: amt,
    });

    credit.amount -= amt;
    debt.amount += amt;

    if (credit.amount === 0) i++;
    if (debt.amount === 0) j++;
  }

  return result;
}