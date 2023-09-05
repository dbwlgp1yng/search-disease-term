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
    fetchData(); // input 값이 변경될 때마다 fetchData 함수 호출
  }, [inputText]); // inputText 상태를 의존성으로 지정

  console.log(data);
  return (
    <>
      <SearchBar inputText={inputText} setInputText={setInputText} data={data} />
      <SearchBox inputText={inputText} data={data} />
    </>
  );
};