import { Exclude } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  Super = 'super',
  Admin = 'admin',
  Edit = 'edit',
  Visitant = 'visitant',
}

@Entity({ name: 'users' })
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column('varchar', {
    length: 50,
    comment: 'Nombre del usuario',
  })
  @IsNotEmpty({
    message: 'El nombre no puede estar vacío',
  })
  @MinLength(2, {
    message: 'El nombre debe tener al menos 3 caracteres',
  })
  @MaxLength(20, {
    message: 'El nombre debe tener máximo 20 caracteres',
  })
  name: string;

  @Column('varchar', {
    length: 50,
    comment: 'Apellido del usuario',
  })
  @IsString({
    message: 'El apellido debe ser una cadena de texto',
  })
  @IsNotEmpty({
    message: 'El apellido no puede estar vacío',
  })
  @Length(3, 50, {
    message: 'El apellido debe tener entre 3 y 50 caracteres',
  })
  lastName: string;

  @Column('varchar', {
    unique: true,
    length: 100,
    comment: 'Correo electrónico del usuario',
  })
  @IsEmail(
    {},
    {
      message: 'El correo electrónico debe ser válido',
    },
  )
  @IsNotEmpty({
    message: 'El correo electrónico no puede estar vacío',
  })
  email: string;

  @Column('bigint', {
    comment: 'Número de teléfono del usuario',
  })
  @Matches(/^[0-9]+$/, {
    message: 'El número de teléfono debe contener solo números',
  })
  @IsNotEmpty({
    message: 'El número de teléfono no puede estar vacío',
  })
  @IsOptional()
  phone: number;

  @Exclude()
  @Column('varchar', {
    length: 100,
    comment: 'Contraseña del usuario',
  })
  @IsString({
    message: 'La contraseña debe ser una cadena de texto',
  })
  @IsNotEmpty({
    message: 'La contraseña no puede estar vacía',
  })
  password: string;

  @Column('boolean', {
    default: false,
    comment: 'Indica si el usuario ha verificado su cuenta',
  })
  @IsBoolean({
    message: 'El valor de verificación debe ser verdadero o falso',
  })
  verified: boolean;

  @Column({
    type: 'boolean',
    default: true,
    comment: 'Indica si el correo electrónico del usuario ha sido verificado',
  })
  @IsBoolean({
    message: 'El valor de verificación de correo debe ser verdadero o falso',
  })
  verifiedEmail: boolean;

  @Column('enum', {
    enum: UserRole,
    default: UserRole.Visitant,
    comment: 'Rol del usuario en el sistema',
  })
  @IsEnum(UserRole, {
    message:
      'El rol debe ser uno de los siguientes: super, admin, edit, visitant',
  })
  roles: UserRole;

  @Column({
    type: 'text',
    nullable: true,
    comment: 'Direcciones asociadas al usuario',
  })
  @IsOptional()
  @IsString({
    message: 'Las direcciones deben ser una cadena de texto',
  })
  address: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creación del registro',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de última actualización del registro',
  })
  updatedAt: Date;
}
