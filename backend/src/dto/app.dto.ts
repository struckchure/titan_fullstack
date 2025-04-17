import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class ValidateRegexDto {
  @IsString()
  @IsNotEmpty()
  input: string;

  @IsString()
  @IsOptional()
  regex: string;
}

export class JobsListDto {
  @IsNumberString()
  @IsOptional()
  skip: string;

  @IsNumberString()
  @IsOptional()
  limit: string;
}
