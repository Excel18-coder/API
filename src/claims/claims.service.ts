import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { Claim } from './entities/claim.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Define ApiResponse interface to match the controller
interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

@Injectable()
export class ClaimsService {
  constructor(
    @InjectRepository(Claim)
    private readonly claimRepository: Repository<Claim>,
  ) {}
  // create claim
  async createClaim(
    createClaimDto: CreateClaimDto,
  ): Promise<ApiResponse<Claim>> {
    try {
      const preparedClaim: Partial<Claim> = {
        ...createClaimDto,
        // Ensure types align with entity
        incident_date: new Date(createClaimDto.incident_date as unknown as string),
        phone: String(createClaimDto.phone),
      } as Partial<Claim>;

      const newClaim = this.claimRepository.create(preparedClaim);
      const savedClaim = await this.claimRepository.save(newClaim);
      return {
        success: true,
        message: 'Claim created successfully',
        data: savedClaim,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create claim',
        error: error.message,
      };
    }
  }

  // find all claims
  async findAll(): Promise<ApiResponse<Claim[]>> {
    try {
      const claims = await this.claimRepository.find({
        order: { created_at: 'DESC' },
      });

      return {
        success: true,
        message: 'Claims retrieved successfully',
        data: claims,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve claims',
        error: error.message,
      };
    }
  }
  // find claim by id
  async getClaimById(id: number): Promise<ApiResponse<Claim>> {
    try {
      const claim = await this.claimRepository.findOne({ where: { Id: id } });
      if (!claim) {
        throw new NotFoundException(`Claim with id ${id} not found`);
      }
      return {
        success: true,
        message: 'Claim found successfully',
        data: claim,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      return {
        success: false,
        message: `Failed to find claim with id ${id}`,
        error: error.message,
      };
    }
  }
  // update claim by id
  async updateClaim(
    id: number,
    updateClaimDto: UpdateClaimDto,
  ): Promise<ApiResponse<Claim>> {
    try {
      // confirm if claim exists
      const claim = await this.claimRepository.findOne({ where: { Id: id } });
      if (!claim) {
        throw new NotFoundException(`Claim with id ${id} not found`);
      }
      const preparedUpdate: Partial<Claim> = {
        ...updateClaimDto,
      } as Partial<Claim>;

      if (updateClaimDto.incident_date) {
        preparedUpdate.incident_date = new Date(
          updateClaimDto.incident_date as unknown as string,
        );
      }
      if (updateClaimDto.phone !== undefined) {
        preparedUpdate.phone = String(updateClaimDto.phone);
      }

      const updatedClaim = await this.claimRepository.save({
        ...claim,
        ...preparedUpdate,
      });
      return {
        success: true,
        message: 'Claim updated successfully',
        data: updatedClaim,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      return {
        success: false,
        message: `Failed to update claim with id ${id}`,
        error: error.message,
      };
    }
  }
  // delete claim by id
  async deleteClaim(id: number): Promise<ApiResponse<null>> {
    try {
      const claim = await this.claimRepository.findOne({ where: { Id: id } });
      if (!claim) {
        throw new NotFoundException(`Claim with id ${id} not found`);
      }
      await this.claimRepository.remove(claim);
      return {
        success: true,
        message: 'Claim deleted successfully',
        data: null,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      return {
        success: false,
        message: `Failed to delete claim with id ${id}`,
        error: error.message,
      };
    }
  }
}
