import { MigrationInterface, QueryRunner } from 'typeorm'

export class resources1654459129813 implements MigrationInterface {
	name = 'resources1654459129813'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE "publication" DROP COLUMN "characterId"
        `)
		await queryRunner.query(`
            ALTER TABLE "publication"
            ADD "characterId" character varying
        `)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            ALTER TABLE "publication" DROP COLUMN "characterId"
        `)
		await queryRunner.query(`
            ALTER TABLE "publication"
            ADD "characterId" integer
        `)
	}
}
