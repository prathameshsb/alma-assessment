import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

export const Container = styled.div`
  flex-grow: 1;
  padding: 20px;
  margin-left: 250px;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 60px;
  }
`;

export const TableContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 15px;
  overflow: hidden;
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 15px auto;
  gap: 20px;
`;

export const Input = styled.input`
  padding: 8px;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 15px;
`;

export const Th = styled.th<{ active?: boolean }>`
  padding: 15px;
  font-size: 16px;
  cursor: pointer;
  text-align: left;
  color: ${({ active }) => (active ? "#0070f3" : "#cbcbcb")};
  user-select: none;
  transition: color 0.2s ease-in-out, border-bottom 0.2s ease-in-out;
  border-bottom: ${({ active }) => (active ? "2px solid #b7d9ff" : "none")};

  &:hover {
    color: #0070f3;
  }

  svg {
    color: #ccc;
  }
`;

export const StyledSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  color: #ccc;
  background: white;
  cursor: pointer;
`;

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 250px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: white;
  padding-left: 25px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  outline: none;
  color: #ccc;
  background: transparent;
`;

export const FaSearchIcon = styled(FaSearch)`
  position: absolute;
  left: 10px;
  color: #ccc;
  font-size: 14px;
`;

export const Td = styled.td`
  padding: 25px;
  text-align: left;
  color: #2c2c2c;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

export const StatusButton = styled.button<{ status: "PENDING" | "REACHED_OUT" }>`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: ${({ status }) => (status === "PENDING" ? "orange" : "green")};
  color: white;

  &:hover {
    opacity: 0.8;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  gap: 5px;
`;

export const PageButton = styled.button<{ active?: string }>`
  padding: 5px 10px;
  border: 1px solid ${({ active }) => (active === "true" ? "black" : "#ccc")};
  border-radius: 5px;
  cursor: pointer;
  background: white;

  &:hover {
    background: ${({ active }) => (active === "true" ? "white" : "#bbb")};
  }

  &:disabled {
    background: #efefef;
    cursor: not-allowed;
  }
`;
