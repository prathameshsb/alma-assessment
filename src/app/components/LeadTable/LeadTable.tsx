import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Table, Th, Td, StatusButton, Pagination, PageButton } from "../../admin/pages.styled";

export interface Lead {
  firstName: string;
  lastName: string;
  email: string;
  submittedAt?: string;
  status: "PENDING" | "REACHED_OUT";
  country: string;
}

export interface SortConfig {
  key: keyof Lead;
  direction: "asc" | "desc";
}

interface LeadTableProps {
  leads: Lead[];
  formattedDates: Record<number, string>;
  handleSort: (key: keyof Lead) => void;
  updateStatus: (index: number) => void;
  sortConfig: SortConfig | null;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export default function LeadTable({
  leads,
  formattedDates,
  handleSort,
  updateStatus,
  sortConfig,
  currentPage,
  totalPages,
  setCurrentPage,
}: LeadTableProps) {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <Th onClick={() => handleSort("firstName")}>
              Name {sortConfig?.key === "firstName" ? (sortConfig.direction === "asc" ? <FaArrowUp /> : <FaArrowDown />) : ""}
            </Th>
            <Th onClick={() => handleSort("submittedAt")}>
              Submitted At {sortConfig?.key === "submittedAt" ? (sortConfig.direction === "asc" ? <FaArrowUp /> : <FaArrowDown />) : ""}
            </Th>
            <Th onClick={() => handleSort("status")}>
              Status {sortConfig?.key === "status" ? (sortConfig.direction === "asc" ? <FaArrowUp /> : <FaArrowDown />) : ""}
            </Th>
            <Th onClick={() => handleSort("country")}>
              Country {sortConfig?.key === "country" ? (sortConfig.direction === "asc" ? <FaArrowUp /> : <FaArrowDown />) : ""}
            </Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => (
            <tr key={index}>
              <Td>{lead.firstName} {lead.lastName}</Td>
              <Td>{formattedDates[index] || "N/A"}</Td>
              <Td>{lead.status === "REACHED_OUT" ? "Reached out" : "Pending"}</Td>
              <Td>{lead.country}</Td>
              <Td>
                <StatusButton status={lead.status || "PENDING"} onClick={() => updateStatus(index)}>
                  {lead.status === "PENDING" ? "Mark as Reached Out" : "Mark as Pending"}
                </StatusButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination Component */}
      <Pagination>
        <PageButton disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>←</PageButton>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageButton
            key={i + 1}
            active={i + 1 === currentPage ? "true" : undefined}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </PageButton>
        ))}
        <PageButton disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>→</PageButton>
      </Pagination>
    </>
  );
}
