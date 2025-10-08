import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Point } from './entities/point.entity';
import { PointOperationLog } from './entities/point-operation-log';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member, Point, PointOperationLog]),
  ],
  controllers: [MemberController],

  providers: [MemberService]
})
export class MemberModule {}
