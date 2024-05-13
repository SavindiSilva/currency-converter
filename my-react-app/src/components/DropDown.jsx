const CurrencyDropdown = ({
  currencies,
  currency,
  setCurrency,
  title = "",
}) => {
  return (
    <div>
      <label
        htmlFor={title}
        className="block text-sm font-medium text-gray-500"
      >
        {title}
      </label>

      <div className="mt-1 relative">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border border-[#161a29] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-none bg-[#44517d] text-white"
        >
          {currencies.map((currency) => {
            return (
              <option value={currency} key={currency}>
                {currency}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default CurrencyDropdown;
