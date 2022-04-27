import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import JwtAuthenticationGuard from "src/auth/guard/jwtAuthGuard.guard";
import RequestWithUser from "src/auth/interface/requestWithUser.interface";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/createCommentDto.dto";

@ApiTags("Комментарии")
@Controller("comment")
export class CommentController {
  constructor(private commentService: CommentService) {}

  @ApiOperation({ summary: "Добавление комментария к посылке" })
  @ApiResponse({ status: 201, type: CreateCommentDto })
  @ApiBody({ type: CreateCommentDto })
  @UseGuards(JwtAuthenticationGuard)
  @Post()
  async create(@Body() dto: CreateCommentDto, @Req() req: RequestWithUser) {
    const user = req.user;
    const comment = await this.commentService.create(dto, user);
    return comment;
  }
}
