import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterUserDto } from '../dtos/users.dto';
import { Users } from '../entities/users.entity';
import { UsersService } from '../services/users.service';

export interface ResponseUser {
  statusCode: HttpStatus;
  message: string;
  data: Users;
}

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // ! REGISTER
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: RegisterUserDto): Promise<Omit<ResponseUser, 'data'>> {
    const user = await this.usersService.create(payload);
    return {
      statusCode: HttpStatus.CREATED,
      message: `¡Registro exitoso! \n\n Hola ${user.name}, tu registro ha sido exitoso. Por favor, revisa tu cuenta de correo electrónico ${user.email} donde encontrarás una contraseña temporal que podrás utilizar para iniciar sesión. Una vez que hayas ingresado a tu cuenta, podrás cambiar la contraseña por una de tu preferencia.`,
    };
  }

  // // ! CHANGE
  // @Post('change')
  // @HttpCode(HttpStatus.OK)
  // async change(@Body() payload: ChangeUserDto): Promise<Omit<ResponseUser, 'data'>> {
  //   const user = await this.usersService.change(payload);
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: `¡Contraseña cambiada con éxito! \n\n ${user.name} a partir de ahora, puedes iniciar sesión en tu cuenta con la nueva contraseña.`,
  //   };
  // }

  // // ! RESET
  // @Post('reset')
  // @HttpCode(HttpStatus.OK)
  // async reset(@Body() payload: ResetUserDto): Promise<Omit<ResponseUser, 'data'>> {
  //   const user = await this.usersService.reset(payload);
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: `¡Restablecimiento exitoso! \n\n ${user.name}, revisa tu bandeja de entrada de correo electrónico ${user.email}. Pronto recibirás una contraseña temporal.`,
  //   };
  // }

  // // ! ACCOUNT UPDATE
  // // @UseGuards(JwtAuthGuard)
  // @Post('account-update')
  // @HttpCode(HttpStatus.OK)
  // async accountUpdate(@Body() payload: AccountUpdateDto): Promise<ResponseUser> {
  //   const user = await this.usersService.accountUpdate(payload);
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: `¡Información actualizada con éxito! \n\n ${user.name}, tus datos han sido actualizados.`,
  //     data: user,
  //   };
  // }

  // // ! ACCOUNT PASSWORD
  // // @UseGuards(JwtAuthGuard)
  // @Post('account-password')
  // @HttpCode(HttpStatus.OK)
  // async accountPassword(@Body() payload: ChangeUserDto) {
  //   const user = await this.usersService.change(payload);
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: `¡Restablecimiento exitoso! \n\n ${user.name}, el restablecimiento de contraseña fue exitoso.`,
  //   };
  // }

  // // ! ACCOUNT SEARCH
  // // @UseGuards(JwtAuthGuard)
  // @Post('account-search')
  // @HttpCode(HttpStatus.OK)
  // async accountSearch(@Body() payload: AccountSearchDto): Promise<Omit<ResponseUser, 'data'> & { data: Users[] }> {
  //   const users = await this.usersService.accountSearch(payload);
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: `Búsqueda exitosa"`,
  //     data: users,
  //   };
  // }

  // // ! ACCOUNT ROLES
  // // @UseGuards(JwtAuthGuard)
  // @Post('account-roles')
  // @HttpCode(HttpStatus.OK)
  // async accountRoles(@Body() payload: AccountRoleDto): Promise<Omit<ResponseUser, 'data'> & { data: Users[] }> {
  //   const { users, user, previousRoles } = await this.usersService.accountRoles(payload);
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: `Se actualizo los roles de ${user.name} ${user.lastName} correctamente \n paso de tener "${previousRoles}" a "${user.roles}"`,
  //     data: users,
  //   };
  // }

  // // ! VERIFY
  // // @UseGuards(JwtAuthGuard)
  // @Get('verify')
  // @HttpCode(HttpStatus.OK)
  // async verify(@Body() payload: VerifyDto): Promise<ResponseUser> {
  //   const user = await this.usersService.verify(payload);
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: `¡Validación de correo exitosa! \n\n ${user.name}, la validación de correo fue exitosa, desde este momento podrás iniciar sesión con el correo ${user.email}.`,
  //     data: user,
  //   };
  // }

  // // ! DELETE
  // // @UseGuards(JwtAuthGuard)
  // @Get(':user_id')
  // @HttpCode(HttpStatus.OK)
  // async delete(@Param('user_id') user_id: string): Promise<Omit<ResponseUser, 'data'>> {
  //   const user = await this.usersService.remove({ user_id });
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: `Se elimino el usuario \n\nNombres: ${user.name} \nApellidos: ${user.lastName} \nCorreo: ${user.email}`,
  //   };
  // }
}
