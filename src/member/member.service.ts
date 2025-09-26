import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberRegisterDTO, GetMembersDto, DeleteMemberDto } from './dto/member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private configService: ConfigService,
  ) {}

  // 添加会员
  async createMember(memberRegisterDTO: MemberRegisterDTO) {
    const { username, password, passwordConfirm, phone, email, offlineStoreId } = memberRegisterDTO;

    if (password !== passwordConfirm) {
      throw new ConflictException('两次密码不一致');
    }

    const existingMember = await this.memberRepository.findOne({
      where: [{ username }, { phone }],
    });

    if (existingMember) {
      throw new ConflictException('用户名或电话已存在');
    }

    const saltRounds = this.configService.get<number>('BCRYPT_SALT_ROUNDS') || 10;
    const hashedPassword = await hash(password, saltRounds);

    const newMember = this.memberRepository.create({
      username,
      password: hashedPassword,
      phone,
      email,
      offlineStoreId  // 关联门店
    });

    return this.memberRepository.save(newMember);
  }

  // 查询会员列表
  async getMembers(query: GetMembersDto) {
    const { offlineStoreId, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

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
        offlineStore: {
          name: true
        }
      },
      relations: ['offlineStore'],
      skip,
      take: limit,
      order: { createdAt: 'DESC' }
    });

    return {
      members,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  // 查询单个会员
  async getMemberById(id: number, offlineStoreId: number) {
    const member = await this.memberRepository.findOne({
      where: { id, offlineStoreId: offlineStoreId }
    });

    if (!member) {
      throw new NotFoundException('会员不存在');
    }

    return member;
  }

  // 删除会员
  async deleteMember(dto: DeleteMemberDto) {
    const { id, offlineStoreId } = dto;
    const member = await this.getMemberById(id, offlineStoreId);

    if (!member) {
      throw new NotFoundException('会员不存在');
    }

    return this.memberRepository.remove(member);
  }
}