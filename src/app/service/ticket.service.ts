// ticket.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../interfaces/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private baseUrl = 'http://localhost:8080/api/receptionniste/ticket'; // Modifiez selon votre API

  constructor(private http: HttpClient) {}

  private getJwtToken(): string | null {
    return localStorage.getItem('jwt');
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getJwtToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }

  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.baseUrl}/afficherTous`, { headers: this.getAuthHeaders() });
  }

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.baseUrl}/Creer`, ticket, { headers: this.getAuthHeaders() });
  }

  updateTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.baseUrl}/modifier/${ticket.id}`, ticket, { headers: this.getAuthHeaders() });
  }

  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/supprimer/${id}`, { headers: this.getAuthHeaders() });
  }
}