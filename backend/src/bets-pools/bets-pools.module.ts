import { Module } from '@nestjs/common';
import { BetsPoolsService } from './bets-pools.service';
import { BetsPoolsController } from './bets-pools.controller';

@Module({
  controllers: [BetsPoolsController],
  providers: [BetsPoolsService],
})
export class BetsPoolsModule {}
