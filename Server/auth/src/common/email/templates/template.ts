import { User } from 'src/users/entities/user.entity';
import { register_0, register_1, register_2 } from './register';
import { reset_0, reset_1, reset_2 } from './reset';
import {
  validateEmail_0,
  validateEmail_1,
  validateEmail_2,
} from './validateEmail';

export enum TypeTemplateRegister {
  Register_0 = 'register_0',
  Register_1 = 'register_1',
  Register_2 = 'register_2',
  Reset_0 = 'reset_0',
  Reset_1 = 'reset_1',
  Reset_2 = 'reset_2',
  ValidateEmail_0 = 'validateEmail_0',
  ValidateEmail_1 = 'validateEmail_1',
  ValidateEmail_2 = 'validateEmail_2',
}

export type TemplateRegister = Pick<User, 'name' | 'email' | 'password'> & {
  tokenJWT: string;
  type: TypeTemplateRegister;
};

function assertUnreachable(x: never): never {
  throw new Error(`No se agrego ${x} a los template de correos electrónicos`);
}

export const templateRegister = ({
  name,
  password,
  type,
  tokenJWT,
}: TemplateRegister): { subject: string; html: string } => {
  switch (type) {
    case TypeTemplateRegister.Register_0:
      const templateRegister0 = register_0({ name, password });
      return {
        subject: templateRegister0.subject,
        html: templateRegister0.html,
      };

    case TypeTemplateRegister.Register_1:
      const templateRegister1 = register_1({ name });
      return {
        subject: templateRegister1.subject,
        html: templateRegister1.html,
      };

    case TypeTemplateRegister.Register_2:
      const templateRegister2 = register_2({ name });
      return {
        subject: templateRegister2.subject,
        html: templateRegister2.html,
      };

    case TypeTemplateRegister.Reset_0:
      const templateReset0 = reset_0({ name, password });
      return {
        subject: templateReset0.subject,
        html: templateReset0.html,
      };

    case TypeTemplateRegister.Reset_1:
      const templateReset1 = reset_1({ name });
      return {
        subject: templateReset1.subject,
        html: templateReset1.html,
      };

    case TypeTemplateRegister.Reset_2:
      const templateReset2 = reset_2({ name });
      return {
        subject: templateReset2.subject,
        html: templateReset2.html,
      };

    case TypeTemplateRegister.ValidateEmail_0:
      const templateValidateEmail0 = validateEmail_0({ name, tokenJWT });
      return {
        subject: templateValidateEmail0.subject,
        html: templateValidateEmail0.html,
      };

    case TypeTemplateRegister.ValidateEmail_1:
      const templateValidateEmail1 = validateEmail_1({ name });
      return {
        subject: templateValidateEmail1.subject,
        html: templateValidateEmail1.html,
      };

    case TypeTemplateRegister.ValidateEmail_2:
      const templateValidateEmail2 = validateEmail_2({ name });
      return {
        subject: templateValidateEmail2.subject,
        html: templateValidateEmail2.html,
      };
    default:
      assertUnreachable(type);
  }
};
