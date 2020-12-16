import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Episode } from '@libs/db/models/episode.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';
import { Course } from '@libs/db/models/course.model';

@Crud({
  model: Episode
})
@ApiTags('课时')
@Controller('episodes')
export class EpisodesController {
  constructor(
    @InjectModel(Episode) private readonly model: ReturnModelType<typeof Episode>,
    @InjectModel(Course) private readonly CourseModel: ReturnModelType<typeof Course>
  ) { }
  @Get('option')
  async option () {
    const courses = (await this.CourseModel.find()).map(v => ({
      label: v.name,
      value: v._id
    }))

    return {
      dicData: courses
    }
  }
}
