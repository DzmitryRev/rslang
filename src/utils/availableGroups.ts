import { Groups } from '../store/slices/textbookSlice';

export const availableGroups = Object.values(Groups).filter((item) => !isNaN(+item)) as number[];
