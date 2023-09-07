import React from 'react';

export default function useKeyDown(
  selectedSuggestionIndex: number,
  setSelectedSuggestionIndex: (index: number) => void,
  suggestions: string[],
  setInputText: (text: string) => void
) {
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
      event.preventDefault();
      setInputText(suggestions[selectedSuggestionIndex]);
      setSelectedSuggestionIndex(-1);
    }
  };  

  return handleKeyDown;
}
