import React, { useContext, useEffect, useMemo, useState, ChangeEvent } from "react";
import { TicketContext } from "../context/TicketContext";
import TicketCard from "./TicketCard";
import Ticket from "../types/index";

const TicketBoard: React.FC = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("TicketContext is undefined");
  }
  const { tickets = [] } = context; // guard if undefined
  const typedTickets = tickets as Ticket[];

  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [agentFilter, setAgentFilter] = useState<string>("All");
  const [ticketsRaised, setTicketsRaised] = useState<Ticket[]>([]);

  // stable sort function using getTime()
  const sortTicketsDateWise = (list: Ticket[]) => {
    return [...list].sort((a, b) => {
      const ta = a?.dueDate ? new Date(a.dueDate).getTime() : 0;
      const tb = b?.dueDate ? new Date(b.dueDate).getTime() : 0;
      return ta - tb;
    });
  };

  // derive unique agents from tickets (memoized)
  const uniqueAgents = useMemo(() => {
    const set = new Set<string>();
    for (const t of typedTickets) {
      if (t.agent) set.add(t.agent);
    }
    return ["All", ...Array.from(set)];
  }, [typedTickets]);

  // function to apply filters (status + agent) to a list
  const applyFilters = (list: Ticket[], status: string, agent: string) => {
    let out = [...list];
    if (status && status !== "All") {
      out = out.filter(
        (t) => (t.status ?? "").toLowerCase() === status.toLowerCase()
      );
    }
    if (agent && agent !== "All") {
      out = out.filter((t) => (t.agent ?? "") === agent);
    }
    return out;
  };

  // whenever tickets, statusFilter, or agentFilter change — recompute the displayed list
  useEffect(() => {
    const sorted = sortTicketsDateWise(typedTickets);
    const filtered = applyFilters(sorted, statusFilter, agentFilter);
    setTicketsRaised(filtered);
  }, [typedTickets, statusFilter, agentFilter]);

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    // effect will run and apply the new filter
  };

  const handleAgentChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAgentFilter(e.target.value);
    // effect will run and apply the new filter
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8" data-testid="ticket-board">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <h1 className="text-[32px] font-bold leading-[44px] text-[#101828] font-satoshi" style={{ fontFeatureSettings: "'ss03' on" }}>Ticket Board</h1>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Status Filter Button */}
          <div className="relative">
            <div className="border border-black rounded-[4px] px-3 py-2 text-xs sm:text-sm font-medium text-black bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              {/* ...icon markup omitted for brevity (keep yours) */}
              <span>Status: {statusFilter}</span>
            </div>

            <select
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              data-testid="filter-status"
              onChange={handleStatusChange}
              value={statusFilter}
              aria-label="Filter by Status"
            >
              <option value="All">All</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          {/* Agent Filter Button */}
          <div className="relative">
            <div className="border border-black rounded-[4px] px-3 py-2 text-xs sm:text-sm font-bold text-black bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <span>Agent: {agentFilter}</span>
            </div>

            <select
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              data-testid="filter-agent"
              onChange={handleAgentChange}
              value={agentFilter}
              aria-label="Filter by Agent"
            >
              {uniqueAgents.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tickets grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {ticketsRaised.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No tickets found. {ticketsRaised.length}</p>
          </div>
        ) : (
          ticketsRaised.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
        )}
      </div>

      <div className="hidden" data-testid="tickets">
        {ticketsRaised.length === 0 ? (
          <div data-testid="no-tickets-found">No tickets found.</div>
        ) : (
          ticketsRaised.map((ticket) => <div key={`test-${ticket.id}`}>{ticket.title}</div>)
        )}
      </div>
    </div>
  );
};

export default TicketBoard;
