import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @IsEmail()
  @ApiProperty({ type: String, description: 'email' })
  @Column('text')
  public email: string;

  @IsString()
  @ApiProperty({ type: String, description: 'fullname' })
  @Column({ length: 50 })
  public fullName: string;

  @IsString()
  @ApiProperty({ type: String, description: 'username' })
  @Column('text')
  public username: string;

  @IsString()
  @ApiProperty({ type: String, description: 'password' })
  @Column('text')
  public password: string;
}
