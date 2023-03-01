import React from "react";
import { SearchInput } from "./TransactionsPage";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}



const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="search-bar">
            <SearchInput placeholder="Search..." type="text" value={value} onChange={handleInputChange} />
        </div>
    );
};

export default SearchBar
