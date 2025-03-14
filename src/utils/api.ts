import { Lead } from "@/app/components/LeadTable/LeadTable";

export const fetchLeads = async (): Promise<Lead[]> => {
  try {
    const response = await fetch("/api/leads");
    if (!response.ok) {
      throw new Error("Failed to fetch leads");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching leads:", error);
    return [];
  }
};

export const updateLeadStatus = async (index: number, status: "PENDING" | "REACHED_OUT") => {
  try {
    const response = await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index, status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update lead status");
    }
  } catch (error) {
    console.error("Error updating lead status:", error);
  }
};
