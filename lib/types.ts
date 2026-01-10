export interface Redemption {
  id: string;
  discountAmount?: number;
  customerName?: string;
  redeemedAt: string;
  coupon?: {
    code: string;
    type: string;
    value: number;
    valueType: string;
  };
}

export interface Referral {
  id: string;
  referrerName: string;
  referrerPhone: string;
  referredName?: string;
  referredPhone?: string;
  rewardAmount: number;
  isCompleted: boolean;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'MERCHANT' | 'ADMIN' | 'STAFF' | 'VIEWER';
  isActive: boolean;
  invitedAt: string;
  joinedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Merchant {
  id: string;
  businessName: string;
  email: string;
  phone: string;
  businessType: string;
  address: string;
}

export interface User {
  id: string;
  email: string;
  role: 'MERCHANT' | 'ADMIN' | 'STAFF' | 'VIEWER';
  merchantId: string;
  emailVerified: boolean;
  lastLogin?: string;
  emailNotifications?: boolean;
  redemptionAlerts?: boolean;
  usageWarnings?: boolean;
  whatsappNotifications?: boolean;
  merchant?: Merchant;
}
