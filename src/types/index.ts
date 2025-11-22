export default interface Ticket {
  id: number;
  title: string;
  description: string;
  assignedAgent: string;
  dueDate: string;
  status: string;
  [key: string]: any;
}