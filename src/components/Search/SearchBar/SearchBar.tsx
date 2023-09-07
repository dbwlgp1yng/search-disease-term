import React from 'react';
import { styled } from 'styled-components';
import useKeyDown from '../../../hooks/useKeyDown';

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

  const handleKeyDown = useKeyDown(
    selectedSuggestionIndex, 
    setSelectedSuggestionIndex, 
    suggestions, 
    setInputText
  );

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