import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { BanUserDto, CreateUserDto, ViewUserDto } from './dto';
import { IdParamDto } from 'src/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() data: CreateUserDto): Promise<ViewUserDto> {
    return this.usersService.create(data);
  }

  @Get()
  get(): Promise<ViewUserDto[]> {
    return this.usersService.get();
  }

  @Get(':id')
  getById(@Param() { id }: IdParamDto): Promise<ViewUserDto> {
    return this.usersService.getById(id);
  }

  @Put(':id')
  update(
    @Param() { id }: IdParamDto,
    @Body() data: CreateUserDto,
  ): Promise<ViewUserDto> {
    return this.usersService.update(id, data);
  }

  @Post(':id/ban')
  ban(
    @Param() { id }: IdParamDto,
    @Body() data: BanUserDto,
  ): Promise<ViewUserDto> {
    return this.usersService.ban(id, data);
  }
}
