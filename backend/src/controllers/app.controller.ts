import { Controller, Get, Param, Query } from '@nestjs/common';

import { JobsListDto } from '../dto/app.dto';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('jobs')
  async listJobs(@Query() dto: JobsListDto) {
    return await this.appService.listJobs(dto);
  }

  @Get('jobs/:id')
  async getJob(@Param('id') id: string) {
    return await this.appService.getJob(id);
  }
}
