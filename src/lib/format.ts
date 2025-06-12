const formatCompactNumber = (number: number) => {
  if (number < 1000) {
    return number.toString();
  } else if (number < 1000000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  } else if (number < 1000000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  } else {
    return (number / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  }
};

export const formatCurrency = (
  amount: number,
  currency: string = "VND",
  compact: boolean = false,
) => {
  if (compact) {
    return (
      formatCompactNumber(amount) + " " + (currency === "VND" ? "₫" : currency)
    );
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
