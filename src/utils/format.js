export const fmtAmount = (n) => {
  const x = Number(n);
  if (!isFinite(x) || x === 0) return "0";
  if (Math.abs(x) >= 1) return x.toLocaleString(undefined, { maximumFractionDigits: 4 });
  return x.toFixed(8).replace(/0+$/, "").replace(/\.$/, "");
};
export const fmtUSD = (n) => `$${(isFinite(n) ? Number(n) : 0).toFixed(2)}`;
