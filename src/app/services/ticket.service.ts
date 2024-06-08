import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor() { }

  convertDate(date: string) {
    return new Date(date).toLocaleDateString() + ' ' + new Date(date).toLocaleTimeString();
  }

  private tickets: any[] = [];

  getTickets() {
    return this.tickets;
  }

  addTicket(ticket: any) {
    this.tickets.push(ticket);
  }

  deleteTicket(ticket: any) {
    this.tickets = this.tickets.filter(t => t !== ticket);
  }

  getTicketById(id: string) {
    return this.tickets.find(t => t._id === id);
  }

  private thisTicketId: string = '';

  setThisTicketId(id: string) {
    this.thisTicketId = id;
  }

  getThisTicketId() {
    return this.thisTicketId;
  }

  removeThisTicketId() {
    this.thisTicketId = '';
    return null;
  }

  // GETTING ALL TICKETS

  getAllTickets() {
    return this.tickets;
  }

}
