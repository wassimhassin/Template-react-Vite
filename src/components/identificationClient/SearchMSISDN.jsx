import { Card } from "flowbite-react";
import { Search } from "lucide-react";

export const SearchMSISDN = ({ msisdn, setMsisdn }) => {
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove all non-digits
    setMsisdn(value);
  };

  return (
    // <Card className="p-4 mb-2 w-96">
    <div className="relative w-full flex justify-end items-end">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        inputMode="numeric"
        value={msisdn}
        onChange={handleChange}
        placeholder="Rechercher par MSISDN..."
        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      />
    </div>
    // </Card>
  );
};
