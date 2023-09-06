import React from 'react';
import { SearchWordType } from "../../../types";
import { styled } from 'styled-components';

type SearchBarProps = {
  inputText: string;
  setInputText: (text: string) => void;
  data: SearchWordType[] | null;
};
export default function SearchBar({ inputText, setInputText, data }: SearchBarProps) {
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