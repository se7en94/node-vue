import { ModelOptions, prop } from "@typegoose/typegoose";
import { ApiProperty } from "@nestjs/swagger";


@ModelOptions({
  schemaOptions: {
    timestamps: true
  }
})

export class Episode {
  @ApiProperty({description: '课时名称'})
  @prop()
  name: string

  @ApiProperty({ description: '课时文件' })
  @prop()
  file: string
}