import React, { createContext, useState, useEffect, ReactNode } from "react";
import ticketsData from "../tickets";

interface Ticket {
  id: number;
  status: string;
  [key: string]: any;
}

interface TicketContextProps {
  tickets: Ticket[];
  updateTicketStatus: (ticketId: number, newStatus: string) => void;
}

export const TicketContext = createContext<TicketContextProps | undefined>(undefined);

interface TicketProviderProps {
  children: ReactNode;
}

export const TicketProvider: React.FC<TicketProviderProps> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    setTickets(ticketsData);
  }, []);

  const updateTicketStatus = (ticketId: number, newStatus: string) => {
    let sampleArr: Ticket[] = [...tickets];
    let findIndex = sampleArr.findIndex(ticket => ticket.id === ticketId);
    // eslint-disable-next-line no-restricted-globals
    let thatObj = sampleArr[findIndex];
    sampleArr.splice(findIndex, 1, { ...thatObj, status: newStatus });
    setTickets([...sampleArr]);
  };

  return (
    <TicketContext.Provider value={{ tickets, updateTicketStatus }}>
      {children}
    </TicketContext.Provider>
  );
};
