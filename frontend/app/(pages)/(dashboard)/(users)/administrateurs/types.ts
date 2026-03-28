export interface Group {
  id: number;
  name: string;
}

export interface UserWithGroups {
  id: number;
  groups: Group[];
}

export interface UserDetails {
  id: number;
  name: string;
  email: string;
  image?: string | null;
  avatar?: string | null;
  avatar_url?: string | null;
  profile_photo_url?: string | null;
  first_name: string | null;
  last_name: string | null;
  username: string;
  phone_number: string | null;
  province: string | null;
  city: string | null;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  roles: string[];
}