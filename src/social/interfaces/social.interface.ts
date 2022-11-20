export interface SocialInterface {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  // the photo is not required for social login
  phone?: string;
  address?: string;
}
