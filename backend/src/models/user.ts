import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./common/baseEntity";
import Role from "./role";
import bcrypt from "bcrypt";

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @Column({ unique: true })
    email!: string;

    @Column({ name: 'password_hash', nullable: true })
    password?: string;

    @Column({ name: 'email_verified', default: false })
    emailVerified!: boolean;

    @Column({ name: 'verification_token', nullable: true })
    verificationToken?: string;

    @Column({ name: 'is_active' })
    isActive!: boolean;

    @Column({ name: 'fk_role_id' })
    fkRoleId!: number;

    // Relationship with another model
    @ManyToOne(() => Role)
    @JoinColumn({ name: 'fk_role_id' })
    role!: Role;

    // Hash the password before inserting a new user
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    // Compare provided password with the stored hashed password
    async comparePassword(password: string): Promise<boolean> {
        if (this.password) {
            return bcrypt.compare(password, this.password);
        }
        return false;
    }
}

export default User;