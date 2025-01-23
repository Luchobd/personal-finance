import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

export interface ResponseUser {
  statusCode: HttpStatus;
  message: string;
  data: User;
}

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<ResponseUser, 'data'>> {
    const user = await this.usersService.create(createUserDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: `¡Registro exitoso! \n\n Hola ${user.name}, tu registro ha sido exitoso. Por favor, revisa tu cuenta de correo electrónico ${user.email} donde encontrarás una contraseña temporal que podrás utilizar para iniciar sesión. Una vez que hayas ingresado a tu cuenta, podrás cambiar la contraseña por una de tu preferencia.`,
    };
  }
}
