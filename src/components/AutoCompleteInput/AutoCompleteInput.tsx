import React, { useState } from 'react';
import axios from 'axios';
import Autocomplete, { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { API } from '@src/variables/variables';

interface Option {
    countryName: string;
    geonameId: number;
    name: string; 
}

interface AutoCompleteInputProps {
  onOptionSelect: (option: Option, key:string) => void;
  label: string;
  keyProp: string;
  countryName?: string;
  name?: string; 
  geonameId?: number
}

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({ onOptionSelect, 
  label, keyProp, countryName, geonameId, name
}) => {
  const [inputValue, setInputValue] = useState('');
  const optionsDone = {
    countryName: countryName,
    geonameId: geonameId,
    name: name
  }

  if (Object.values(optionsDone).every(val => val!== undefined)){
    const option: Option = optionsDone as Option;

    onOptionSelect(option, keyProp);
    console.log(option);
   
  }
  

  const [options, setOptions] = useState<Option[]>([]);
  console.log(options);
  const [loading, setLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleInputChange = (event: React.ChangeEvent<{}>, value: string, reason: AutocompleteInputChangeReason) => {
    setInputValue(value);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    const newTimeout = setTimeout(() => {
      fetchOptions(value);
    }, 500);
    setTypingTimeout(newTimeout);
  };

  const handleOptionSelect = (event: React.ChangeEvent<{}>, option: Option | null) => {
    if (option) {
      onOptionSelect(option, keyProp);
    }
  };
  const fetchOptions = async (value: string) => {
    try {
      setLoading(true);
    const valuetoUp = value.charAt(0).toUpperCase() + value.slice(1);
      const response = await axios.get(`${API.locations.get}?city=${valuetoUp}`);
      //const response = await axios.get(`https://cargo-transportation.onrender.com/locations?city=Бишкек`);
      const data: Option[] = response.data;
      setOptions(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching options:', error);
      setLoading(false);
    }
  };
  const datePickerStyles = {
    width: "100%",
    '& .MuiInputBase-input': {
      padding: '8.5px 14px;',
    },
    '& label' : {
        left: "-1px",
        color: "#999"
    }
  };
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => (
        `${option.countryName}, ${option.name}`
        )}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleOptionSelect}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          sx={datePickerStyles}
          size='small'
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default AutoCompleteInput;
