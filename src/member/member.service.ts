import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberRegisterDTO, GetMembersDto, DeleteMemberDto } from './dto/member.dto';
import { Point } from './entities/point.entity';
import { PointOperationLog } from './entities/point-operation-log';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(Point)  // 新增
    private readonly pointRepository: Repository<Point>,
    @InjectRepository(PointOperationLog)  // 新增
    private readonly pointOperationLogRepository: Repository<PointOperationLog>,
    private configService: ConfigService,
  ) {}

  // 添加会员
  async createMember(memberRegisterDTO: MemberRegisterDTO,merchantId:number) {

    const { username, password, passwordConfirm, phone, email, offlineStoreId } = memberRegisterDTO;

    if (password !== passwordConfirm) {
      throw new ConflictException('两次密码不一致');
    }

    const existingMember = await this.memberRepository.findOne({
      where: [{ phone }],
    });

    if (existingMember) {
      throw new ConflictException('电话已存在');
    }

    const saltRounds = this.configService.get<number>('BCRYPT_SALT_ROUNDS') || 10;
    const hashedPassword = await hash(password, saltRounds);


    // 开启事务处理
    const queryRunner = this.memberRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try{
      const newMember = this.memberRepository.create({
        username,
        password: hashedPassword,
        phone,
        email,
        offlineStoreId  // 关联门店
      });
      const savedMember = await queryRunner.manager.save(newMember);

      // 创建初始积分记录
      const pointRecord = queryRunner.manager.create(Point, {
        memberId: savedMember.id,
        offlineStoreId: offlineStoreId,
        points: 0
      });
      await queryRunner.manager.save(pointRecord);

      // 创建积分操作日志
      const pointOperationLog = queryRunner.manager.create(PointOperationLog, {
        member: savedMember,
        offlineStoreId: offlineStoreId,
        points: 0,
        balance: 0,
        operationType: 'INITIAL',
        operatorId: null, // 初始创建时可能没有操作人
        operatorName: 'SYSTEM',
        operatorType: 'system',
        remark: '会员注册初始化积分',
        merchantId: merchantId
      });
      await queryRunner.manager.save(pointOperationLog);
      await queryRunner.commitTransaction();
      return savedMember;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }finally {
      await queryRunner.release();
    }


  }

  // 查询会员列表
  async getMembers(query: GetMembersDto) {
    const { offlineStoreId } = query;

    const [members, total] = await this.memberRepository.findAndCount({
      where: { offlineStoreId: offlineStoreId },
      select: {
        id: true,
        username: true,
        phone: true,
        email: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        offlineStore: false,
      },
      relations: ['offlineStore'],
      // skip,
      // take: limit,
      order: { createdAt: 'DESC' }
    });

    return members;
  }
  // 查询单个会员
  async getMemberById(id: number, offlineStoreId: number) {
    const member = await this.memberRepository.findOne({
      where: { id, offlineStoreId },
      relations: ['point', 'pointOperationLogs']
    });

    if (!member) {
      throw new NotFoundException('会员不存在');
    }
    console.log(member)
    return {
      id: member.id,
      username: member.username,
      phone: member.phone,
      createdAt: member.createdAt.toISOString().split('T')[0],
      points:  member?.point.points,
      pointOperationLogs: member.pointOperationLogs.map(log => ({
        ...log,
        createdAt: log.optionTimeAt ? log.optionTimeAt.toISOString().split('T')[0] : null
      }))
    };
  }

  // 删除会员
  async deleteMember(dto: DeleteMemberDto) {
    const { id, offlineStoreId } = dto;
    const member = await this.memberRepository.findOne({
      where: { id, offlineStoreId }
    })

    if (!member) {
      throw new NotFoundException('会员不存在');
    }

    return this.memberRepository.remove(member);
  }
}