import React from 'react';

export default function useKeyDown(
  selectedIndex: number,
  setSelectedIndex: (index: number) => void,
  suggestions: string[],
  setInputText: (text: string) => void
) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      if (selectedIndex === 0) {
        setSelectedIndex(-1); 
      } else if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      }
      event.preventDefault();
    } else if (event.key === 'ArrowDown' && selectedIndex < suggestions.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      event.preventDefault();
    } else if (event.key === 'Enter' && selectedIndex !== -1) {
      event.preventDefault();
      setInputText(suggestions[selectedIndex]);
      setSelectedIndex(-1);
    }
  };  

  return handleKeyDown;
}
