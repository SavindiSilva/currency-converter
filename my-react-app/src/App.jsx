import CurrencyConvertor from "./components/CurrencyConverter";

function App() {
  return (
    <div className="min-h-screen bg-[#161a29] flex flex-col items-center justify-center">
      <div className="text-gray-400 text-3xl font-semibold">
        Currecny Converter
      </div>
      <div className="container">
        <CurrencyConvertor />
      </div>
    </div>
  );
}

export default App;
