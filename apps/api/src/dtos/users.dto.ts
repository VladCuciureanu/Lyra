import { UserRole } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  public email: string;

  @IsOptional()
  @IsString()
  public password: string;

  @IsOptional()
  @IsString()
  public displayName: string;

  @IsOptional()
  @IsString()
  public firstName: string;

  @IsOptional()
  @IsString()
  public lastName: string;

  @IsOptional()
  @IsString()
  public avatar: string;

  @IsOptional()
  @IsString()
  public bio: string;
}

export class UserResponse {
  public id: string;
  public email: string;
  public displayName: string;
  public firstName: string;
  public lastName: string;
  public avatar: string;
  public role: string;
  public bio: string;
  public verified: boolean;

  @Exclude() public password: string;
}
