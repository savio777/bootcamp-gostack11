import { startOfHour } from 'date-fns';

import Appointment from '../infra/typeorm/entities/Appointment';
import AppError from '../../../shared/errors/AppError';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate =
      await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
