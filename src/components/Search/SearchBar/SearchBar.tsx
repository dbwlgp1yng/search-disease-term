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
    setSelectedSuggestionIndex, // 추가: 선택된 추천 검색어의 인덱스를 설정하는 함수
    selectedSuggestionIndex, // 추가: 선택된 추천 검색어의 인덱스 상태
    suggestions,
  }: SearchBarProps) {

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp' && selectedSuggestionIndex > 0) {
      setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
      event.preventDefault(); 
      console.log('keyup');
    } else if (
      event.key === 'ArrowDown' &&
      selectedSuggestionIndex < suggestions.length - 1
    ) {
      setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
      event.preventDefault(); 
      console.log('keydown');
    } else if (event.key === 'Enter' && selectedSuggestionIndex !== -1) {
      setInputText(suggestions[selectedSuggestionIndex]);
      setSelectedSuggestionIndex(-1);
    }
  };  
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.currentTarget.value);
  }

  return (
    <StyledForm>
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
  justify-content: space-between;
  margin-bottom: 1rem;

  input {
    width: 400px;
    padding: 1.5rem 0;
    padding-left: 1rem;
  }
  button {
    padding: 1.5rem 1.5rem;
  }
`;