// Mock Data for RoadPulse Platform

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  roadName: string;
  contractor: string;
  permitDate: string;
  promisedCompletion: string;
  status: 'critical' | 'partial' | 'in-progress' | 'repaired';
  overdueDays: number;
  zone: string;
  nearSchool: boolean;
  description: string;
}

export interface Contractor {
  id: string;
  name: string;
  roadsDug: number;
  onTime: number;
  overdue: number;
  overdueDays: number;
  score: number;
  isWorstOffender: boolean;
}

export interface CitizenReport {
  id: string;
  message: string;
  location: string;
  timestamp: string;
  lat: number;
  lng: number;
  avatar: string;
}

export interface TickerItem {
  type: 'new' | 'overdue' | 'repaired' | 'info';
  message: string;
}


export const mapMarkers: MapMarker[] = [
  {
    id: 'm1',
    lat: 12.9716, lng: 77.5946,
    roadName: 'MG Road',
    contractor: 'Apex Infra Pvt. Ltd.',
    permitDate: '2026-04-01',
    promisedCompletion: '2026-04-20',
    status: 'critical',
    overdueDays: 30,
    zone: 'Central Business District',
    nearSchool: false,
    description: 'Major water pipeline replacement causing full right-lane closure'
  },
  {
    id: 'm2',
    lat: 12.9775, lng: 77.6088,
    roadName: 'Outer Ring Road - ORR',
    contractor: 'Metropolis Diggers Ltd.',
    permitDate: '2026-04-10',
    promisedCompletion: '2026-04-25',
    status: 'critical',
    overdueDays: 25,
    zone: 'East Bengaluru',
    nearSchool: true,
    description: 'Underground fibre optic cable laying, 2-lane blockage'
  },
  {
    id: 'm3',
    lat: 12.9630, lng: 77.5855,
    roadName: 'Brigade Road',
    contractor: 'L&T Infrastructure Corp.',
    permitDate: '2026-04-15',
    promisedCompletion: '2026-05-05',
    status: 'partial',
    overdueDays: 15,
    zone: 'Commercial District',
    nearSchool: false,
    description: 'Stormwater drain reinforcement, partial right lane open'
  },
  {
    id: 'm4',
    lat: 12.9819, lng: 77.5871,
    roadName: 'Residency Road',
    contractor: 'Civic Build Corp.',
    permitDate: '2026-04-28',
    promisedCompletion: '2026-05-15',
    status: 'partial',
    overdueDays: 5,
    zone: 'Central Bengaluru',
    nearSchool: true,
    description: 'Gas pipeline replacement works ongoing'
  },
  {
    id: 'm5',
    lat: 12.9541, lng: 77.6018,
    roadName: 'Hosur Road',
    contractor: 'Sharma Construction Works',
    permitDate: '2026-05-01',
    promisedCompletion: '2026-05-18',
    status: 'in-progress',
    overdueDays: 2,
    zone: 'South Bengaluru',
    nearSchool: false,
    description: 'Road widening project, east side dig in progress'
  },
  {
    id: 'm6',
    lat: 12.9920, lng: 77.5712,
    roadName: 'Sadashivanagar Road',
    contractor: 'GreenPath Infra',
    permitDate: '2026-05-05',
    promisedCompletion: '2026-05-20',
    status: 'in-progress',
    overdueDays: 0,
    zone: 'North Bengaluru',
    nearSchool: true,
    description: 'Sewage line upgrade, 1 lane operational'
  },
  {
    id: 'm7',
    lat: 12.9672, lng: 77.6131,
    roadName: 'Indiranagar 100ft Road',
    contractor: 'Apex Infra Pvt. Ltd.',
    permitDate: '2026-05-08',
    promisedCompletion: '2026-05-22',
    status: 'in-progress',
    overdueDays: 0,
    zone: 'Indiranagar',
    nearSchool: false,
    description: 'Median renovation and tree planting dig'
  },
  {
    id: 'm8',
    lat: 12.9355, lng: 77.6246,
    roadName: 'HSR Layout Sector 7',
    contractor: 'Kovalam Builders',
    permitDate: '2026-04-20',
    promisedCompletion: '2026-05-05',
    status: 'repaired',
    overdueDays: 0,
    zone: 'HSR Layout',
    nearSchool: false,
    description: 'Road pothole repairs complete — all lanes operational'
  },
  {
    id: 'm9',
    lat: 13.0197, lng: 77.5640,
    roadName: 'Yeshwanthpur Main Road',
    contractor: 'Metropolis Diggers Ltd.',
    permitDate: '2026-04-05',
    promisedCompletion: '2026-04-18',
    status: 'critical',
    overdueDays: 32,
    zone: 'Northwest Bengaluru',
    nearSchool: true,
    description: 'Water main burst repair, extended excavation required'
  },
  {
    id: 'm10',
    lat: 12.9490, lng: 77.5673,
    roadName: 'JP Nagar Ring Road',
    contractor: 'Delta Roads Pvt. Ltd.',
    permitDate: '2026-05-10',
    promisedCompletion: '2026-05-25',
    status: 'in-progress',
    overdueDays: 0,
    zone: 'South Bengaluru',
    nearSchool: false,
    description: 'Resurfacing works on 800m stretch'
  },
  {
    id: 'm11',
    lat: 12.9883, lng: 77.6228,
    roadName: 'Old Madras Road',
    contractor: 'Sharma Construction Works',
    permitDate: '2026-04-12',
    promisedCompletion: '2026-04-30',
    status: 'partial',
    overdueDays: 20,
    zone: 'East Bengaluru',
    nearSchool: false,
    description: 'Telecommunications underground duct installation'
  },
  {
    id: 'm12',
    lat: 12.9280, lng: 77.5755,
    roadName: 'Banashankari Temple Road',
    contractor: 'Civic Build Corp.',
    permitDate: '2026-05-03',
    promisedCompletion: '2026-05-17',
    status: 'repaired',
    overdueDays: 0,
    zone: 'Southwest Bengaluru',
    nearSchool: true,
    description: 'Footpath reconstruction completed ahead of schedule'
  },
];

export const contractors: Contractor[] = [
  { id: 'c1', name: 'Metropolis Diggers Ltd.', roadsDug: 34, onTime: 8, overdue: 26, overdueDays: 57, score: 14, isWorstOffender: true },
  { id: 'c2', name: 'Sharma Construction Works', roadsDug: 28, onTime: 12, overdue: 16, overdueDays: 42, score: 28, isWorstOffender: true },
  { id: 'c3', name: 'Apex Infra Pvt. Ltd.', roadsDug: 45, onTime: 21, overdue: 24, overdueDays: 31, score: 38, isWorstOffender: false },
  { id: 'c4', name: 'Delta Roads Pvt. Ltd.', roadsDug: 19, onTime: 10, overdue: 9, overdueDays: 18, score: 52, isWorstOffender: false },
  { id: 'c5', name: 'Civic Build Corp.', roadsDug: 31, onTime: 20, overdue: 11, overdueDays: 9, score: 67, isWorstOffender: false },
  { id: 'c6', name: 'Kovalam Builders', roadsDug: 22, onTime: 16, overdue: 6, overdueDays: 5, score: 74, isWorstOffender: false },
  { id: 'c7', name: 'L&T Infrastructure Corp.', roadsDug: 52, onTime: 44, overdue: 8, overdueDays: 3, score: 88, isWorstOffender: false },
  { id: 'c8', name: 'GreenPath Infra', roadsDug: 17, onTime: 16, overdue: 1, overdueDays: 1, score: 96, isWorstOffender: false },
];

export const citizenReports: CitizenReport[] = [
  {
    id: 'cr1',
    message: '📍 Near Railway Station — Fresh dig, no barricade, very dangerous for two-wheelers at night',
    location: 'Railway Station Road',
    timestamp: '2 mins ago',
    lat: 12.9767, lng: 77.5713,
    avatar: 'R'
  },
  {
    id: 'cr2',
    message: '📍 School Road near DPS — Road half blocked, kids are struggling to cross safely, no signage',
    location: 'DPS School Road',
    timestamp: '7 mins ago',
    lat: 12.9650, lng: 77.6050,
    avatar: 'P'
  },
  {
    id: 'cr3',
    message: '📍 Market Area, Commercial St — Repair was promised 2 weeks ago, trench is still open and full of rainwater',
    location: 'Commercial Street',
    timestamp: '15 mins ago',
    lat: 12.9730, lng: 77.5800,
    avatar: 'S'
  },
  {
    id: 'cr4',
    message: '📍 Koramangala 5th Block — Contractor machinery parked on road for 3 days, no work happening',
    location: 'Koramangala 5th Block',
    timestamp: '23 mins ago',
    lat: 12.9352, lng: 77.6245,
    avatar: 'A'
  },
  {
    id: 'cr5',
    message: '📍 Whitefield Main Rd — Fresh dig with no lights. Bikes are falling. Emergency please!',
    location: 'Whitefield Main Road',
    timestamp: '41 mins ago',
    lat: 12.9698, lng: 77.7500,
    avatar: 'K'
  },
];

export const tickerItems: TickerItem[] = [
  { type: 'new', message: '🔴 NEW DIG: MG Road blocked since 6:00 AM — Apex Infra' },
  { type: 'overdue', message: '⚠️ OVERDUE: Metropolis Diggers — Day 57 of 15-day promise on ORR' },
  { type: 'repaired', message: '✅ REPAIRED: HSR Layout Sector 7 — All lanes now open' },
  { type: 'info', message: '📍 47 active dig sites across Bengaluru right now' },
  { type: 'overdue', message: '⚠️ OVERDUE: Sharma Construction — Yeshwanthpur Road Day 32' },
  { type: 'new', message: '🔴 NEW DIG: Koramangala 80ft Road — Fresh permit logged 2h ago' },
  { type: 'repaired', message: '✅ REPAIRED: Banashankari Temple Road — Completed ahead of schedule 🎉' },
  { type: 'info', message: '🚨 HIGH CHAOS ALERT: Tomorrow 8–10AM — CBD congestion predicted SEVERE' },
  { type: 'overdue', message: '⚠️ OVERDUE: Civic Build Corp — Old Madras Road Day 20' },
  { type: 'new', message: '🔴 NEW DIG: Indiranagar 100ft Road — Median renovation started' },
];

export const howItWorksSteps = [
  {
    step: 1,
    icon: '📋',
    title: 'Permit Auto-Logged',
    description: 'Contractor gets permit → RoadPulse auto-logs it from municipal APIs in under 60 seconds',
    color: '#FF6B35'
  },
  {
    step: 2,
    icon: '💬',
    title: 'Citizens Report',
    description: 'Citizens report via WhatsApp → AI maps it instantly, cross-referencing with permit database',
    color: '#00D4FF'
  },
  {
    step: 3,
    icon: '🧠',
    title: 'AI Predicts Chaos',
    description: 'AI predicts gridlock 24hrs ahead → automated alerts sent to schools, hospitals & city transport',
    color: '#FF6B35'
  },
  {
    step: 4,
    icon: '🚨',
    title: 'Public Accountability',
    description: 'Deadline missed → ContractorWatch flags publicly on portal, penalties auto-computed',
    color: '#FF3355'
  },
];

export const impactStats = [
  { value: 2300000, label: 'Citizens Protected', prefix: '', suffix: '+', display: '2.3M+' },
  { value: 847, label: 'Contractors Tracked', prefix: '', suffix: '', display: '847' },
  { value: 4.2, label: 'Penalties Identified', prefix: '₹', suffix: 'Cr', display: '₹4.2Cr' },
  { value: 67, label: 'Faster Repair Times', prefix: '', suffix: '%', display: '67%' },
];
