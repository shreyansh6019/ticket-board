// @ts-nocheck
/* eslint-disable */
import React from "react";
import { render, screen, fireEvent, cleanup, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import ticketsData from "./tickets";

interface Ticket {
  id: number;
  title: string;
  description: string;
  assignedAgent: string;
  dueDate: string;
  status: string;
  [key: string]: any;
}

describe("Customer Support Ticketing System (UI aligned)", () => {
  beforeEach(() => {
    render(<App />);
    window.history.pushState({}, "", "/");
  });

  afterEach(() => cleanup());

  it("displays Ticket Board with all tickets sorted by due date and proper card content", async () => {
    expect(screen.getByTestId("ticket-board")).toBeInTheDocument();

    const cards = await screen.findAllByTestId("ticket-card");
    expect(cards.length).toBe(ticketsData.length);
    expect(window.location.pathname).toBe("/");

    const sorted = [...ticketsData].sort(
      (a: Ticket, b: Ticket) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );

    for (let i = 0; i < Math.min(3, sorted.length); i++) {
      const card = cards[i] as HTMLElement;
      expect(card).toHaveTextContent(sorted[i].title);
      expect(card).toHaveTextContent("Assigned to " + sorted[i].assignedAgent);
      expect(card).toHaveTextContent("Due Date " + formatDate(sorted[i].dueDate));
      expect(card).toHaveTextContent(sorted[i].status);
    }
  });

  it("navigates to Ticket Details when a card is clicked and returns back", async () => {
    const cards = await screen.findAllByTestId("ticket-card");
    fireEvent.click(cards[0]);

    const sorted = [...ticketsData].sort(
      (a: Ticket, b: Ticket) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );

    await screen.findByText(sorted[0].description);
    expect(window.location.pathname).toBe(`/ticket/${sorted[0].id}`);
    expect(screen.getByTestId("ticket-details")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("back-to-board-btn"));
    await screen.findByTestId("ticket-board");
    expect(window.location.pathname).toBe("/");
  });

  it("filters tickets by status", async () => {
    const status = screen.getByTestId("filter-status") as HTMLSelectElement;
    fireEvent.change(status, { target: { value: "Open" } });

    await waitFor(() => {
      const testContainer = screen.getByTestId("tickets");
      const expected = ticketsData.filter((t: Ticket) => t.status === "Open");
      expect(testContainer.children.length).toBe(expected.length);
      expected.forEach((t) => expect(screen.getAllByText(t.title).length).toBeGreaterThan(0));
    });
  });

  it("filters tickets by agent", async () => {
    const agent = screen.getByTestId("filter-agent") as HTMLSelectElement;
    fireEvent.change(agent, { target: { value: "Alice" } });

    expect(screen.queryByTestId("no-tickets-found")).not.toBeInTheDocument();

    await waitFor(() => {
      const testContainer = screen.getByTestId("tickets");
      const expected = ticketsData.filter((t: Ticket) => t.assignedAgent === "Alice");
      expect(testContainer.children.length).toBe(expected.length);
      expected.forEach((t) => expect(screen.getAllByText(t.title).length).toBeGreaterThan(0));
    });
  });

  it("checks dropdown options for statuses and unique agents", () => {
    const status = screen.getByTestId("filter-status") as HTMLSelectElement;
    expect(status.children[0]).toHaveTextContent("All");
    expect(status.children[1]).toHaveTextContent("Open");
    expect(status.children[2]).toHaveTextContent("In Progress");
    expect(status.children[3]).toHaveTextContent("Resolved");

    const agent = screen.getByTestId("filter-agent") as HTMLSelectElement;
    const uniqueAgents = Array.from(new Set(ticketsData.map((t: Ticket) => t.assignedAgent)));
    const agentTexts = Array.from(agent.children).map((c) => c.textContent);
    expect(agentTexts[0]).toBe("All");
    uniqueAgents.forEach((a) => expect(agentTexts).toContain(a));
  });

  it("updates ticket status from details and reflects on board after save", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    const cards = await screen.findAllByTestId("ticket-card");
    fireEvent.click(cards[0]);

    const sorted = [...ticketsData].sort(
      (a: Ticket, b: Ticket) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );

    const details = await screen.findByTestId("ticket-details");
    expect(details).toBeInTheDocument();
    expect(screen.getByText(sorted[0].description)).toBeInTheDocument();

    const containsStatus = (s: string) => (content: string, node: HTMLElement | null) =>
      !!node && node.textContent && node.textContent.replace(/\s+/g, " ").includes(`Status: ${s}`);

    expect(within(details).getAllByText(containsStatus(sorted[0].status)).length).toBeGreaterThan(0);

    const statusSelect = screen.getByTestId("change-status") as HTMLSelectElement;
    fireEvent.change(statusSelect, { target: { value: "In Progress" } });
    fireEvent.click(screen.getByTestId("save-changes-btn"));

    expect(alertMock).toHaveBeenCalledWith("Ticket status has been updated successfully!");
    expect(within(details).getAllByText(containsStatus("In Progress")).length).toBeGreaterThan(0);

    fireEvent.click(screen.getByTestId("back-to-board-btn"));
    await screen.findByTestId("ticket-board");

    const updatedCard = (await screen.findAllByTestId("ticket-card"))[0] as HTMLElement;
    expect(updatedCard).toHaveTextContent("In Progress");
  });

  it("does not reflect unsaved status changes on board", async () => {
    const cards = await screen.findAllByTestId("ticket-card");
    fireEvent.click(cards[0]);

    const statusSelect = screen.getByTestId("change-status") as HTMLSelectElement;
    fireEvent.change(statusSelect, { target: { value: "In Progress" } });

    const details = await screen.findByTestId("ticket-details");
    const containsStatus = (s: string) => (content: string, node: HTMLElement | null) =>
      !!node && node.textContent && node.textContent.replace(/\s+/g, " ").includes(`Status: ${s}`);

    expect(within(details).getAllByText(containsStatus("Resolved")).length).toBeGreaterThan(0);

    fireEvent.click(screen.getByTestId("back-to-board-btn"));
    await screen.findByTestId("ticket-board");

    const updatedCard = (await screen.findAllByTestId("ticket-card"))[0] as HTMLElement;
    expect(updatedCard).toHaveTextContent("Resolved");
  });

  it("shows 'No tickets found' when no tickets match filters", () => {
    const agent = screen.getByTestId("filter-agent") as HTMLSelectElement;
    fireEvent.change(agent, { target: { value: "Alice" } });
    const status = screen.getByTestId("filter-status") as HTMLSelectElement;
    fireEvent.change(status, { target: { value: "Resolved" } });

    const msg = screen.getByTestId("no-tickets-found");
    expect(msg).toBeInTheDocument();
    expect(msg).toHaveTextContent("No tickets found.");
  });
});

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = date.getDate().toString().padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);
  return `${day} ${month}'${year}`;
}