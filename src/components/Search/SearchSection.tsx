import apiClient from '../../services/apiClient';
import React, { useEffect, useState } from 'react';
import { SearchWordType } from '../../types';
import SearchBox from './SearchBox';
import SearchBar from './SearchBar';

export default function SearchSection() {
  const [data, setData] = useState<SearchWordType[] | null>(null);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/sick?q=${inputText}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (inputText.length > 0) {
      fetchData(); // inputText가 비어있지 않을 때만 fetchData 호출
    } 
  }, [inputText]);

  return (
    <>
      <SearchBar inputText={inputText} setInputText={setInputText} data={data} />
      {inputText.length > 0 && (  // 비어있지 않을 때만 렌더링
        <SearchBox data={data} />
      )}
    </>
  );
};