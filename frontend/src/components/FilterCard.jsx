import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42k - 1 Lakh", "1 Lakh to 5 Lakh"]
  }
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full bg-white p-5 rounded-xl shadow-md border border-gray-200">
      <h1 className="font-bold text-xl mb-3 text-gray-800">Filter Jobs</h1>
      <hr className="mb-4" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">{data.filterType}</h2>
            {data.array.map((item, idx) => {
              const itemId = `filter-${index}-${idx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 py-1 hover:bg-gray-50 px-2 rounded-md transition-all">
                  <RadioGroupItem id={itemId} value={item} className="border-gray-400" />
                  <Label htmlFor={itemId} className="text-sm text-gray-600 cursor-pointer">
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
