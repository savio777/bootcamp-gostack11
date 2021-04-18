import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '../../users/entities/User';

/*
  uma entidade para uma outra entidade (OneToOne)
  uma entidade para muitos da outra entidade (OneToMany)
  muitos da entidade para muitos da outra entidade (ManyToMany)
  muitos da entidade para uma outra entidade (ManyToOne)
*/

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  // fazendo ligação com user
  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
