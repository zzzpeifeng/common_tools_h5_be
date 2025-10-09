import { Controller, Post, Body, Get, Delete, Query, Param, Request, UseGuards } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberRegisterDTO, GetMembersDto, DeleteMemberDto } from './dto/member.dto';
import { MerchantAuthGuard } from '../auth/jwt-auth.guard';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  // 添加会员
  @Post()
  @UseGuards(MerchantAuthGuard)
  create(@Body() memberRegisterDTO: MemberRegisterDTO,@Request() req: any) {
    const merchantId:number = req.user.id;
    return this.memberService.createMember(memberRegisterDTO,merchantId);
  }

  // 查询会员列表
  @Get()
  @UseGuards(MerchantAuthGuard)
  findAll(@Query() query: GetMembersDto) {
    return this.memberService.getMembers(query);
  }

  // 查询单个会员
  @Get(':id')
  @UseGuards(MerchantAuthGuard)
  findOne(@Param('id') id: string, @Query('offlineStoreId') offlineStoreId: string) {
    return this.memberService.getMemberById(+id, +offlineStoreId);
  }

  // 删除会员
  @Delete()
  @UseGuards(MerchantAuthGuard)
  remove(@Body() dto: DeleteMemberDto) {
    return this.memberService.deleteMember(dto);
  }
}