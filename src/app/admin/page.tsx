"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Container, FaSearchIcon, SearchContainer, SearchInput, StyledSelect, TableContainer, TopSection } from "./pages.styled";
import Sidebar from "../components/Sidebar/Sidebar";
import { fetchLeads, updateLeadStatus } from "@/utils/api";
import LeadTable, { Lead, SortConfig } from "../components/LeadTable/LeadTable";

export default function AdminPage() {
  const { status } = useSession();
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchLeads().then(setLeads);
    }
  }, [status]);


  const updateStatus = async (index: number) => {
    const updatedLeads = [...leads];
    updatedLeads[index].status = updatedLeads[index].status === "PENDING" ? "REACHED_OUT" : "PENDING";
    setLeads(updatedLeads);

    await updateLeadStatus(index, updatedLeads[index].status);
  };

  const sortedLeads = useMemo(() => {
    if (!sortConfig) return leads;

    return [...leads].sort((a, b) => {
      const valueA = a[sortConfig.key] ?? "";
      const valueB = b[sortConfig.key] ?? "";

      return sortConfig.direction === "asc" ? (valueA > valueB ? 1 : -1) : (valueA < valueB ? 1 : -1);
    });
  }, [leads, sortConfig]);

  const handleSort = (key: keyof Lead): void => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredLeads = useMemo(() => {
    return sortedLeads.filter((lead) => {
      const matchesSearch = Object.values(lead)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter ? lead.status === statusFilter : true;

      return matchesSearch && matchesStatus;
    });
  }, [sortedLeads, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);
  const paginatedLeads = useMemo(() => {
    return filteredLeads.slice((currentPage - 1) * leadsPerPage, currentPage * leadsPerPage);
  }, [filteredLeads, currentPage, leadsPerPage]);

  const formattedDates = useMemo(() => {
    const newFormattedDates: Record<number, string> = {};
    paginatedLeads.forEach((lead, index) => {
      if (lead.submittedAt) {
        newFormattedDates[index] = new Date(lead.submittedAt).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      }
    });
    return newFormattedDates;
  }, [paginatedLeads]);


  if (status === "loading") {
    return null;
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", minHeight: "100vh" }}>
      <Sidebar />
      <Container style={{ flexGrow: 1, padding: "20px", marginLeft: "250px" }}>
        <h2>Leads</h2>
        <TopSection>
          <SearchContainer>
            <FaSearchIcon />
            <SearchInput
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
          <StyledSelect
            value={statusFilter}
            onChange={(e) => {
              const selectedStatus = e.target.value;
              setStatusFilter(selectedStatus);
            }}
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="REACHED_OUT">Reached Out</option>
          </StyledSelect>
        </TopSection>
        <TableContainer>
          <LeadTable
            leads={paginatedLeads}
            formattedDates={formattedDates}
            handleSort={handleSort}
            updateStatus={updateStatus}
            sortConfig={sortConfig}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </TableContainer>
      </Container>
    </div>
  );
}
