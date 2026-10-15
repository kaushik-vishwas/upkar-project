import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Select, MenuItem, FormControl } from '@mui/material';

const Filter = ({
  searchPlaceholder = 'Search...',
  select1Options = [],
  select2Options = [],
  initialFilter1 = '',
  initialFilter2 = '',
  onFilter1Change,
  onFilter2Change,
  onSearchChange,
  selectShow = true,
}) => {
  const [filter1, setFilter1] = useState(
    initialFilter1 || (select1Options[0]?.value ?? '')
  );
  const [filter2, setFilter2] = useState(
    initialFilter2 || (select2Options[0]?.value ?? '')
  );
  const [searchValue, setSearchValue] = useState('');

  const handleFilter1Change = (e) => {
    setFilter1(e.target.value);
    onFilter1Change && onFilter1Change(e.target.value);
  };

  const handleFilter2Change = (e) => {
    setFilter2(e.target.value);
    onFilter2Change && onFilter2Change(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    onSearchChange && onSearchChange(e.target.value);
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative flex-1 max-w-sm">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder={searchPlaceholder}
          className="w-full rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none bg-white border border-gray-300 hover:border-gray-400 focus:border-green-800 focus:border-2"
        />
      </div>

      {selectShow && (
        <div className="flex items-center gap-4">
          <FormControl
            size="small"
            sx={{
              minWidth: 128,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',
                borderRadius: '6px',
                fontSize: '0.875rem',
                padding: '2px 8px',
                color: '#374151',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#D1D5DB',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#9CA3AF',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#15803D',
                },
              },
            }}
          >
            <Select
              value={filter1}
              onChange={handleFilter1Change}
              IconComponent={ChevronDown}
            >
              {select1Options.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            size="small"
            sx={{
              minWidth: 128,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',
                borderRadius: '6px',
                fontSize: '0.875rem',
                padding: '2px 8px',
                color: '#374151',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#D1D5DB',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#9CA3AF',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#15803D',
                },
              },
            }}
          >
            <Select
              value={filter2}
              onChange={handleFilter2Change}
              IconComponent={ChevronDown}
            >
              {select2Options.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
    </div>
  );
};

export default Filter;
