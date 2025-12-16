// ------------------------------------------------------------------
// 2. Database Structure (Firestore Schema Representation)
// ------------------------------------------------------------------

export enum UserRole {
  OWNER = 'OWNER',
  MECHANIC = 'MECHANIC',
}

export interface User {
  id: string; // Document ID
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export enum ToolStatus {
  AVAILABLE = 'Available',
  LOANED = 'Loaned',
  MAINTENANCE = 'Maintenance',
  DAMAGED = 'Damaged',
}

export enum ToolCondition {
  GOOD = 'Good',
  FAIR = 'Fair',
  POOR = 'Poor',
}

export interface Tool {
  id: string; // Document ID
  name: string;
  category: string;
  brand: string;
  imageUrl: string;
  status: ToolStatus;
  condition: ToolCondition;
  lastMaintenanceDate: string; // ISO Date string
  purchaseDate: string; // ISO Date string
  description?: string;
  location: string; // Added location field
}

export interface Loan {
  id: string; // Document ID
  toolId: string;
  userId: string; // Mechanic ID
  userName: string; // Cached for easier display
  checkoutDate: string; // ISO Date string
  returnDate?: string; // ISO Date string (null if active)
  status: 'ACTIVE' | 'RETURNED';
  notes?: string;
}

// AI Analysis Result Type
export interface AIAnalysisResult {
  toolName: string;
  condition: ToolCondition;
  description: string;
  maintenanceSuggestion: string;
  confidenceScore: number;
}