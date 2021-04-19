import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderEntity } from './entities/order.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/authentication/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { RolesGuard } from 'src/auth/authorization/role.guard';
import { Roles } from 'src/auth/authorization/role.decorator';
import { Role } from 'src/enums/role.enum';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @Get('orders')
  findAll(): Promise<OrderEntity[]> {
    return this.orderService.findAll();
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @Get('order/:id')
  get(@Param('id') id: number): Promise<OrderEntity> {
    return this.orderService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: OrderEntity })
  @Post('order')
  create(@Body() order: OrderEntity): Promise<OrderEntity> {
    return this.orderService.create(order);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @Put('order/:id')
  update(
    @Param('id') id: number,
    @Body() order: OrderEntity,
  ): Promise<UpdateResult> {
    return this.orderService.update(id, order);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @Delete('order/:id')
  deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this.orderService.delete(id);
  }
}
