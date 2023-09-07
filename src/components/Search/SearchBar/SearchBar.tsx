import React from 'react';
import { styled } from 'styled-components';

type SearchBarProps = {
  inputText: string;
  setInputText: (text: string) => void;
  selectedSuggestionIndex: number;
  setSelectedSuggestionIndex: (index: number) => void;
  suggestions: string[];
};

export default function SearchBar({ 
    inputText, 
    setInputText, 
    setSelectedSuggestionIndex, 
    selectedSuggestionIndex, 
    suggestions,
  }: SearchBarProps) {

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      if (selectedSuggestionIndex === 0) {
        setSelectedSuggestionIndex(-1); 
      } else if (selectedSuggestionIndex > 0) {
        setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
      }
      event.preventDefault();
    } else if (event.key === 'ArrowDown' && selectedSuggestionIndex < suggestions.length - 1) {
      setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
      event.preventDefault();
    } else if (event.key === 'Enter' && selectedSuggestionIndex !== -1) {
      setInputText(suggestions[selectedSuggestionIndex]);
      setSelectedSuggestionIndex(-1);
    }
  };  

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.currentTarget.value);
  }

  return (
    <StyledForm className={inputText ? '' : 'empty'}>
      <input
        type="text"
        placeholder='질환명을 입력해 주세요.'
        value={inputText}
        onChange={handleChangeInput} 
        onKeyDown={handleKeyDown}
      />
      <button type="button">검색</button>
    </StyledForm>
  );
};







const StyledForm = styled.form`
  width: 500px;
  display: flex;
  border-radius: 2rem 2rem 0 0;
  overflow: hidden;
  &.empty {
    border-radius: 2rem;
  }

  input {
    width: 80%;
    padding: 1.5rem 0 1.5rem 2rem;
    font-size: 1.125rem;
    outline: none;
  }

  button {
    width: 20%;
    font-size: 1.125rem;
    cursor: pointer;
  }
`;