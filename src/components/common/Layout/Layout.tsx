import React from 'react';
import styled from 'styled-components';


type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Layout({ children }: Props) {
  return (
    <StyledLayout>
      {children}
    </StyledLayout>
  );
}

const StyledLayout = styled.div`
  width: 100%;
  height: 500px;
  background-color: #a0c8e9;
`;