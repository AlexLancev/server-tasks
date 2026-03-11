import { ViewProfileDto } from 'src/users/dto';

export class AccessDto extends ViewProfileDto {
  token: string;
}
