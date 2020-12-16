import { ApiProperty } from "@nestjs/swagger";
import { prop, arrayProp, Ref } from "@typegoose/typegoose";
import { Episode } from './episode.model';
// 课程Model

export class Course {
  @ApiProperty({ description: '课程id' })
  @prop()
  _id: string

  @ApiProperty({ description: '课程名称' })
  @prop()
  name: string

  @ApiProperty({ description: '封面图' })
  @prop()
  cover: string

  // 关联episode.model
  @ApiProperty({ description: '课时' })
  @arrayProp({
    ref: 'Episode',
    localField: '_id',
    foreignField: 'course',
  })
  episode: Ref<Episode>[]
}