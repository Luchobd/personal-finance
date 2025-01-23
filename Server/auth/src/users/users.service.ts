import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from './dto/create-user.dto';
import {
  AddCronJob,
  EmailService,
} from '../common/email/services/email.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const temporaryPassword: string = uuidv4().split('-', 1)[0];
      const newUser = this.userRepo.create(createUserDto);
      const hashPassword = await bcrypt.hash(temporaryPassword, 10);
      newUser.password = hashPassword;
      const userCreate = await this.userRepo.save(newUser);

      this.emailService.addCronJob({
        passwordTemporality: temporaryPassword,
        user_id: userCreate.user_id,
        type: AddCronJob.Registre,
        email: userCreate.email,
      });

      return userCreate;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          `El correo electrónico ${createUserDto.email} ya se encuentra registrado`,
        );
      }
      throw new NotFoundException('Error creando el usuario: ' + error.message);
    }
  }
}
