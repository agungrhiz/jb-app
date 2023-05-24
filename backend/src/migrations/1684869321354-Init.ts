import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1684869321354 implements MigrationInterface {
    name = 'Init1684869321354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "religions" ("id" SERIAL NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "date_modified" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_5c576192fea37850ec9ed425bfe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "uploads" ("id" SERIAL NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "date_modified" TIMESTAMP NOT NULL DEFAULT now(), "url" character varying NOT NULL, "thumbnail_url" character varying, "name" character varying NOT NULL, "size" integer NOT NULL, "type" integer NOT NULL, "fk_user_id" integer NOT NULL, CONSTRAINT "PK_d1781d1eedd7459314f60f39bd3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "date_modified" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "date_modified" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password_hash" character varying, "email_verified" boolean NOT NULL DEFAULT false, "verification_token" character varying, "is_active" boolean NOT NULL, "fk_role_id" integer NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "members" ("id" SERIAL NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "date_modified" TIMESTAMP NOT NULL DEFAULT now(), "nik" character varying, "full_name" character varying NOT NULL, "nick_name" character varying, "email" character varying NOT NULL, "phone_number" character varying NOT NULL, "address" character varying, "place_of_birth" character varying, "date_of_birth" TIMESTAMP, "gender" character varying, "fk_religion_id" integer, "registration_date" TIMESTAMP, "youtube" character varying, "facebook" character varying, "instagram" character varying, "twitter" character varying, "fk_photo_id" integer, "fk_user_id" integer NOT NULL, CONSTRAINT "UQ_6cbd1942364a0098b35865e77a5" UNIQUE ("nik"), CONSTRAINT "UQ_2714af51e3f7dd42cf66eeb08d6" UNIQUE ("email"), CONSTRAINT "REL_7f571ea6abd6581c8ca0bfdc73" UNIQUE ("fk_user_id"), CONSTRAINT "REL_dafa0d40fc20d2764cc95b2913" UNIQUE ("fk_photo_id"), CONSTRAINT "PK_28b53062261b996d9c99fa12404" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_requests_status_enum" AS ENUM('Pending', 'Approved', 'Rejected')`);
        await queryRunner.query(`CREATE TABLE "user_requests" ("id" SERIAL NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "date_modified" TIMESTAMP NOT NULL DEFAULT now(), "full_name" character varying NOT NULL, "nick_name" character varying, "email" character varying NOT NULL, "phone_number" character varying NOT NULL, "instagram" character varying, "approved_by" integer, "status" "public"."user_requests_status_enum" NOT NULL DEFAULT 'Pending', CONSTRAINT "UQ_5896dedc7f21617541cc04c7a28" UNIQUE ("email"), CONSTRAINT "PK_b144147b72ee6fb3d4a9147073e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_640e24c7957242966a5b030c0f6" FOREIGN KEY ("fk_role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_b9f5fb3a629ca9563fe969928b0" FOREIGN KEY ("fk_religion_id") REFERENCES "religions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_7f571ea6abd6581c8ca0bfdc736" FOREIGN KEY ("fk_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_dafa0d40fc20d2764cc95b29133" FOREIGN KEY ("fk_photo_id") REFERENCES "uploads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_dafa0d40fc20d2764cc95b29133"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_7f571ea6abd6581c8ca0bfdc736"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_b9f5fb3a629ca9563fe969928b0"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_640e24c7957242966a5b030c0f6"`);
        await queryRunner.query(`DROP TABLE "user_requests"`);
        await queryRunner.query(`DROP TYPE "public"."user_requests_status_enum"`);
        await queryRunner.query(`DROP TABLE "members"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "uploads"`);
        await queryRunner.query(`DROP TABLE "religions"`);
    }

}
