import React from 'react';
import { SearchWordType } from "../../types";

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
    <form>
      <input
        type="text"
        placeholder='질환명을 입력해 주세요.'
        value={inputText}
        onChange={handleChangeInput} 
      />
      <button type="button">검색</button>
    </form>
  );
};