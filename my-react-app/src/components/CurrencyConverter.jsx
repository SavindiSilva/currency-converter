import { useEffect } from "react";
import { useState } from "react";
import CurrencyDropdown from "./DropDown";
import { HiArrowsRightLeft } from "react-icons/hi2";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]); // list of currencies
  const [amount, setAmount] = useState(1); // amount to convert
  const [fromCurrency, setFromCurrency] = useState("USD"); // from currency
  const [toCurrency, setToCurrency] = useState("GBP"); // to currency
  const [convertedAmount, setConvertedAmount] = useState(null); // converted amount
  const [converting, setConverting] = useState(false); // converting state

  /**
   * Fetches the list of currencies from the API
   */
  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();

      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error("Error Fetching", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  /**
   * convertCurrency - Converts the currency from one to another
   */
  const convertCurrency = async () => {
    if (!amount) return;
    setConverting(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();

      setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
    } catch (error) {
      console.error("Error Fetching", error);
    } finally {
      setConverting(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-[#212842] rounded-lg shadow-md border border-cyan-400">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <CurrencyDropdown
          currencies={currencies}
          title="From:"
          currency={fromCurrency}
          setCurrency={setFromCurrency}
        />
        {/* swap currency button */}
        <div className="flex justify-center -mb-5 sm:mb-0">
          <button>
            <HiArrowsRightLeft
              onClick={swapCurrencies}
              className="text-2xl text-cyan-400 cursor-pointer text-bold"
            />
          </button>
        </div>
        <CurrencyDropdown
          currencies={currencies}
          currency={toCurrency}
          setCurrency={setToCurrency}
          title="To:"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-500"
        ></label>

        <input
          placeholder="Enter amount"
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 mt-1 bg-[#44517d] border-[#161a29] text-white"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={convertCurrency}
          className={`px-5 py-2 bg-[#161a29] text-white rounded-md outline outline-2 outline-offset-2 outline-cyan-600
          ${converting ? "animate-pulse" : ""}`}
        >
          Convert
        </button>
      </div>

      {convertedAmount && (
        <div className="mt-4 text-lg font-medium text-right text-cyan-600">
          Converted Amount: {convertedAmount}
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
