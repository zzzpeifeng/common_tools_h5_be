import { Controller, Post, Body, Get, Delete, Query, Param } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberRegisterDTO, GetMembersDto, DeleteMemberDto } from './dto/member.dto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  // 添加会员
  @Post()
  create(@Body() memberRegisterDTO: MemberRegisterDTO) {
    return this.memberService.createMember(memberRegisterDTO);
  }

  // 查询会员列表
  @Get()
  findAll(@Query() query: GetMembersDto) {
    return this.memberService.getMembers(query);
  }

  // 查询单个会员
  @Get(':id')
  findOne(@Param('id') id: string, @Query('offlineStoreId') storeId: string) {
    return this.memberService.getMemberById(+id, +storeId);
  }

  // 删除会员
  @Delete()
  remove(@Body() dto: DeleteMemberDto) {
    return this.memberService.deleteMember(dto);
  }
}