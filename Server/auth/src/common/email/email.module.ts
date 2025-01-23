import { Global, Module } from '@nestjs/common';
import { EmailService } from './services/email.service';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
