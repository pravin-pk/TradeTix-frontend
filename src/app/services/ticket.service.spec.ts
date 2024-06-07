import { TicketService } from './ticket.service';

describe('TicketService', () => {
  let ticketService: TicketService;

  beforeEach(() => {
    ticketService = new TicketService();
  });

  it('should add a ticket', () => {
    const ticket = { id: '1', title: 'Concert Ticket' };
    ticketService.addTicket(ticket);
    expect(ticketService.getTickets()).toContain(ticket);
  });

  it('should delete a ticket', () => {
    const ticket = { id: '1', title: 'Concert Ticket' };
    ticketService.addTicket(ticket);
    ticketService.deleteTicket(ticket);
    expect(ticketService.getTickets()).not.toContain(ticket);
  });

  it('should set and get thisTicketId', () => {
    const id = '1';
    ticketService.setThisTicketId(id);
    expect(ticketService.getThisTicketId()).toEqual(id);
  });

  it('should remove thisTicketId', () => {
    ticketService.removeThisTicketId();
    expect(ticketService.getThisTicketId()).toBe;
  });

  it('should get all tickets', () => {
    const tickets = [
      { id: '1', title: 'Concert Ticket' },
      { id: '2', title: 'Movie Ticket' },
      { id: '3', title: 'Sports Ticket' },
    ];
    tickets.forEach((ticket) => ticketService.addTicket(ticket));
    expect(ticketService.getAllTickets()).toEqual(tickets);
  });
});