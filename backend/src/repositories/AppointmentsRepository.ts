import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

// dto ~> Data Transferer Object

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public create(data: CreateAppointmentDTO): Appointment {
    const { provider, date } = data;

    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointmentInSameDate = this.appointments.find(a =>
      isEqual(date, a.date),
    );

    return findAppointmentInSameDate || null;
  }
}

export default AppointmentsRepository;
