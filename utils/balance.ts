export function calculateBalances(transactions: any[]) {
  const map: Record<string, number> = {};

  for (const tx of transactions) {
    const payer = tx.payer;

    for (const split of tx.splits) {
      map[split.userId] = (map[split.userId] || 0) - split.amount;
      map[payer] = (map[payer] || 0) + split.amount;
    }
  }

  return Object.entries(map).map(([userId, amount]) => ({
    userId,
    amount,
  }));
}