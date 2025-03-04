import { EMPTY_STRING } from '../../constants';

export function buildConditions(
  orConditions: string[],
  andConditions: string[],
) {
  const orClause =
    orConditions.length > 0 ? `(${orConditions.join(' OR ')})` : EMPTY_STRING;
  const andClause =
    andConditions.length > 0
      ? `(${andConditions.join(' AND ')})`
      : EMPTY_STRING;
  const whereClause = [orClause, andClause].filter(Boolean).join(' AND ');
  return whereClause;
}
