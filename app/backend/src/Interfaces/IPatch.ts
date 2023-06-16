import UserMatches from './Matches';

export default interface IPatch {
  id?: number;
  type?: number;
  token?: string;
  message?: string;
  matcheCreated?: UserMatches;
}
