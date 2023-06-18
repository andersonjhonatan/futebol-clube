import UserMatches from './Matches';

export default interface IPatch {
  type?: number;
  token?: string;
  message?: string;
  matcheCreated?: UserMatches;
}
