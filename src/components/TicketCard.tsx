import React from "react";
import { useNavigate } from "react-router-dom";
import Ticket from "../types/index";

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const navigate = useNavigate();

  const getStatusBadgeClasses = (status?: string) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "Open":
        return "bg-orange-100 text-orange-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const day = d.getDate().toString().padStart(2, "0");
    const month = months[d.getMonth()];
    const year = d.getFullYear().toString().slice(-2);
    return `${day} ${month}'${year}`;
  };

  const getInitials = (name?: string) => {
    if (!name) return "NA";
    return name.split(" ").map(n => n[0] ?? "").join("").toUpperCase();
  };

  const getAvatarColor = (name?: string) => {
    const colors = [
      "bg-blue-500 text-white",
      "bg-green-500 text-white",
      "bg-purple-500 text-white",
      "bg-pink-500 text-white",
      "bg-indigo-500 text-white",
      "bg-red-500 text-white"
    ];
    if (!name) return colors[0];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div
      className="border border-[#E4E4E4] rounded-[4px] p-[18px] bg-white hover:shadow-lg hover:border-gray-300 transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 flex flex-col items-start gap-4 flex-1"
      data-testid="ticket-card"
      onClick={() => {
        // guard id presence
        if (typeof ticket.id !== "undefined") {
          navigate(`/ticket-detail/${ticket.id}`);
        } else {
          console.warn("Ticket id missing", ticket);
        }
      }}
    >
      <div className="w-full flex items-center justify-between">
        <span className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClasses(ticket.status)}`}>
          {ticket.status ?? "Unknown"}
        </span>
        <button className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100" aria-label="More options">
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <circle cx="4" cy="10" r="1.5" />
            <circle cx="10" cy="10" r="1.5" />
            <circle cx="16" cy="10" r="1.5" />
          </svg>
        </button>
      </div>

      <h3 className="text-[20px] font-bold leading-[32px] text-black font-satoshi" style={{ fontFeatureSettings: "'ss03' on" }}>
        {ticket.title ?? "Untitled"}
      </h3>

      <div className="flex items-center justify-between w-full mt-auto">
        <div className="flex items-center text-xs sm:text-sm text-gray-600">
          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="line-clamp-1">Due Date {formatDate(ticket.dueDate)}</span>
        </div>
        <div className="flex items-center text-xs sm:text-sm text-gray-600">
          <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-medium mr-1.5 sm:mr-2 ${getAvatarColor(ticket.assignedAgent)}`}>
            {getInitials(ticket.assignedAgent)}
          </div>
          <span className="line-clamp-1">Assigned to {ticket.assignedAgent ?? "Unassigned"}</span>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
