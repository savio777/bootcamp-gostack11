import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../entities/Appointment';

import IAppointmentsRepository from '../../../repositories/IAppointmentsRepository';

@EntityRepository(Appointment)
class AppointmentsRepository
  extends Repository<Appointment>
  implements IAppointmentsRepository
{
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({ where: { date } });

    return findAppointment || undefined;
  }
}

export default AppointmentsRepository;
