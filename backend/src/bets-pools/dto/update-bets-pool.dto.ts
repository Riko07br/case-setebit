import { PartialType } from '@nestjs/mapped-types';
import { CreateBetsPoolDto } from './create-bets-pool.dto';

export class UpdateBetsPoolDto extends PartialType(CreateBetsPoolDto) {}
