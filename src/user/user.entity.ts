import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../role/role.entity';
import { Order } from 'src/order/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  @Column()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  @Column({ length: 50 })
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  @Column()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  @Column()
  password: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  @OneToOne(() => Role, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  role: Role;

  @OneToMany(() => Order, (order: Order) => order.id)
  order: Order[];
}
