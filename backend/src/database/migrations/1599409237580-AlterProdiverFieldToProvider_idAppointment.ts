import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

// casos:
// onDelete SET NULL~> caso o usuário seja deletado, o id vai ser colocado como null em todas as relações
// onUpdate CASCADE~> caso o usuario seja atualizado, vai ser atualizado em todas as relações

export class AlterProdiverFieldToProviderIdAppointment1599409237580
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({ name: 'provider_id', type: 'uuid', isNullable: true }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProviderId',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProviderId');
    await queryRunner.dropColumn('appointments', 'provider_id');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({ name: 'provider', type: 'varchar' }),
    );
  }
}
