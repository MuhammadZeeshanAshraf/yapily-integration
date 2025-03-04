import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNumber, IsPositive, Min } from 'class-validator';

export class IdDto {
  @ApiProperty({
    description: 'It must be the ID of the entity',
  })
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsInt()
  @IsPositive()
  @Min(1)
  id: number;
}

export function DynamicIdDto(key: string) {
  class DynamicDto {
    @ApiProperty({ description: `It must be the ID of the ${key}` })
    @Transform(({ value }) => Number(value))
    @IsNumber({ maxDecimalPlaces: 0 })
    @IsInt()
    @IsPositive()
    @Min(1)
    id: number;
  }
  Object.defineProperty(
    DynamicDto.prototype,
    key,
    Object.getOwnPropertyDescriptor(DynamicDto.prototype, 'id'),
  );
  delete DynamicDto.prototype.id;

  return DynamicDto;
}
