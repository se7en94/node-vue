import { ModelOptions, prop, Ref } from "@typegoose/typegoose";
import { ApiProperty } from "@nestjs/swagger";
import { Course } from "./course.model";


@ModelOptions({
  schemaOptions: {
    timestamps: true
  }
})

export class Episode {
  // 关联课程
  @ApiProperty({ description: '所属课程' })
  @prop({ref: 'Course'})
  course: Ref<Course>

  @ApiProperty({description: '课时名称'})
  @prop()
  name: string

  @ApiProperty({ description: '课时文件' })
  @prop()
  file: string
}