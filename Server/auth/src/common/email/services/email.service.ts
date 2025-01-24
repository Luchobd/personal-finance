import { Injectable, NotFoundException } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { CronJob } from 'cron';
import { User } from '../../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { sendEmail } from './email';
import { TypeTemplateRegister } from '../templates/template';

export enum AddCronJob {
  Register = 'register',
  Reset = 'reset',
  ValidateEmail = 'validateEmail',
}

function capitalizeFirstLetter(string: string): string {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export type AddCronJobMap = {
  [AddCronJob.Register]: {
    type: AddCronJob.Register;
    user_id: string;
    email: string;
    passwordTemporality: string;
  };
  [AddCronJob.Reset]: {
    type: AddCronJob.Reset;
    user_id: string;
    email: string;
    passwordTemporality: string;
  };
  [AddCronJob.ValidateEmail]: {
    type: AddCronJob.ValidateEmail;
    user_id: string;
    email: string;
    tokenJWT: string;
  };
};

@Injectable()
export class EmailService {
  private jobExecutionCounts: Record<string, number> = {};
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async addCronJob<T extends AddCronJob>(data: AddCronJobMap[T]) {
    const { email, type, user_id } = data;
    const capitalizedNewName = capitalizeFirstLetter(type);
    this.jobExecutionCounts[type] = 0;

    const uniqueJobName = `${type}_${user_id}`;

    try {
      // * Verificar si el CronJob ya existe y omitir la creación si ya existe
      if (this.schedulerRegistry.doesExist('cron', uniqueJobName)) {
        console.error(
          `El CronJob con el nombre ${uniqueJobName} ya existe. Se omite la creación.`,
        );
        return;
      }

      // * Crear un nuevo CronJob
      const job = new CronJob('*/1 * * * *', async () => {
        try {
          this.jobExecutionCounts[type]++;
          const countName = this.jobExecutionCounts[type];
          const totalTypeTemplate = Object.values(TypeTemplateRegister).filter(
            (e) => e.includes(type),
          ).length;

          const user = await this.userRepo.findOne({ where: { user_id } });

          if (
            !user ||
            (type === AddCronJob.Register && user.verified) ||
            (type === AddCronJob.ValidateEmail && user.verifiedEmail) ||
            (type === AddCronJob.Reset && user.verified)
          ) {
            delete this.jobExecutionCounts[type];
            this.schedulerRegistry.deleteCronJob(type);
            return;
          }

          // ? EMAIL
          console.log(
            {
              capitalizedNewName,
              jobExecutionCounts: this.jobExecutionCounts[type],
            },
            'hola',
          );

          await sendEmail({
            email,
            name: user.name,
            tokenJWT:
              data.type === AddCronJob.ValidateEmail ? data.tokenJWT : '',
            password:
              data.type !== AddCronJob.ValidateEmail
                ? data.passwordTemporality
                : '',
            type: TypeTemplateRegister[
              `${capitalizedNewName}_${this.jobExecutionCounts[type]}` as keyof typeof TypeTemplateRegister
            ],
          });

          if (countName === totalTypeTemplate - 1) {
            if (type === 'register') {
              await this.userRepo.remove(user);
            }
            if (type === AddCronJob.ValidateEmail) {
              user.verifiedEmail = true;
              await this.userRepo.save(user);
            }
            delete this.jobExecutionCounts[type];
            this.schedulerRegistry.deleteCronJob(type);
            return;
          }
        } catch (error) {
          delete this.jobExecutionCounts[type];
          this.schedulerRegistry.deleteCronJob(type);
          throw new NotFoundException(error.message);
        }
      });

      this.schedulerRegistry.addCronJob(uniqueJobName, job);
      job.start();

      const user = await this.userRepo.findOne({ where: { user_id } });

      if (!user) return console.error('No se encontró el usuario');

      // ? EMAIL
      console.log(
        {
          capitalizedNewName,
          jobExecutionCounts: this.jobExecutionCounts[type],
        },
        'hola',
      );

      await sendEmail({
        email,
        name: user.name,
        tokenJWT: data.type === AddCronJob.ValidateEmail ? data.tokenJWT : '',
        password:
          data.type !== AddCronJob.ValidateEmail
            ? data.passwordTemporality
            : '',
        type: TypeTemplateRegister[
          `${capitalizedNewName}_${this.jobExecutionCounts[type]}` as keyof typeof TypeTemplateRegister
        ],
      });
    } catch (error) {
      delete this.jobExecutionCounts[type];
      this.schedulerRegistry.deleteCronJob(type);
      throw new NotFoundException(error.message);
    }
  }
}
