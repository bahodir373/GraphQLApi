import { Module } from '@nestjs/common';
import { FormalizeResolver } from './formalize.resolver';
import { FormalizeService } from './formalize.service';

@Module({
  providers: [FormalizeResolver, FormalizeService],
})
export class FormalizeModule {}