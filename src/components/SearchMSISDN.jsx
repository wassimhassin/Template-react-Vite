import { Card } from "flowbite-react";
import { Search } from "lucide-react";

export const SearchMSISDN = () => (
    // <Card className="p-4 mb-2 w-96">
      <div className="relative w-96 flex justify-end items-end w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher par MSISDN..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
      </div>
    // </Card>
  );