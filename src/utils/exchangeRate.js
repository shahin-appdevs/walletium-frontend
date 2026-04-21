/**
 * Calculates exchange rate between wallet and gateway
 * @param {number} walletRate
 * @param {number} gatewayRate
 * @returns {number|null}
 */

export const getExchangeRate = (walletRate, gatewayRate) => {
  const wallet = Number(walletRate);
  const gateway = Number(gatewayRate);

  if (!Number.isFinite(wallet) || !Number.isFinite(gateway)) return 1;
  if (wallet === 0) return 1;

  return (1 / wallet) * gateway;
};

/**
 * Formats exchange rate into a human readable string
 * @param {number|null} exchangeRate
 * @param {string} baseCurrencyCode
 * @param {string} targetCurrencyCode
 * @param {number} decimalPlaces
 * @returns {string|null}
 */
export const formatExchangeRate = (
  exchangeRate,
  baseCurrencyCode,
  targetCurrencyCode,
  decimalPlaces = 4,
) => {
  if (!exchangeRate) return null;
  if (!baseCurrencyCode) return null;
  if (!targetCurrencyCode) return null;

  const rate = Number(exchangeRate);
  if (!Number.isFinite(rate) || rate <= 0) return null;

  return `1 ${baseCurrencyCode} = ${rate.toFixed(decimalPlaces)} ${targetCurrencyCode}`;
};
