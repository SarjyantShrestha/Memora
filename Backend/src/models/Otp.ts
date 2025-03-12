import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Otp {
  @PrimaryGeneratedColumn() // Auto-generated unique ID for each OTP
  id: number;

  @Column() // Store the user's email address
  email: string;

  @Column() // Store the OTP code that is generated and sent to the user
  otpCode: string;

  @Column() // Store the expiration date of the OTP (e.g., 10 minutes from creation)
  expiryDate: Date;

  @CreateDateColumn() // Automatically sets the date when the OTP was created
  createdDate: Date;

  @UpdateDateColumn() // Automatically updates the date if the OTP record is updated
  updatedDate: Date;
}
