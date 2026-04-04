export function groupByCategory(transactions: any[]) {
  const map: Record<string, number> = {};

  for (const tx of transactions) {
    const cat = tx.category || "Other";
    map[cat] = (map[cat] || 0) + tx.amount;
  }

  return Object.entries(map).map(([name, value]) => ({
    name,
    value,
  }));
}

export function groupByMonth(transactions: any[]) {
  const map: Record<string, number> = {};

  for (const tx of transactions) {
    const d = new Date(tx.createdAt);
    const key = `${d.getMonth() + 1}/${d.getFullYear()}`;

    map[key] = (map[key] || 0) + tx.amount;
  }

  return Object.entries(map).map(([month, amount]) => ({
    month,
    amount,
  }));
}