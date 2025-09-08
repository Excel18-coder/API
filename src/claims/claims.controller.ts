import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { Claim } from './entities/claim.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
// import { RolesGuard } from 'src/auth/guards';
// import { AtGuard } from 'src/auth/token/token.guard';

// Define ApiResponse interface to match the service
interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

@Controller('claims')
@ApiBearerAuth()
// @UseGuards(AtGuard, RolesGuard) // Use AtGuard for authentication
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}
  // create claim
  @Post()
  create(@Body() createClaimDto: CreateClaimDto): Promise<ApiResponse<Claim>> {
    return this.claimsService.createClaim(createClaimDto);
  }
  // get all claims
  @Get()
  findAll(): Promise<ApiResponse<Claim[]>> {
    return this.claimsService.findAll();
  }
  // get claim by id
  @Get(':id')
  getClaimById(@Body('id') id: number): Promise<ApiResponse<Claim>> {
    return this.claimsService.getClaimById(id);
  }
  // update claim by id
  @Put(':id')
  async updateClaim(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClaimDto: UpdateClaimDto,
  ): Promise<ApiResponse<Claim>> {
    return this.claimsService.updateClaim(id, updateClaimDto);
  }

  // delete claim by id
  @Delete(':id')
  async deleteClaim(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse> {
    return this.claimsService.deleteClaim(id);
  }
}
