// Mock Data for RoadPulse Platform

export interface MapMarker {
  id: string;
  city: string;
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
  // --- BENGALURU ---
  {
    id: 'm1',
    city: 'Bengaluru',
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
    city: 'Bengaluru',
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
    city: 'Bengaluru',
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
    city: 'Bengaluru',
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
    city: 'Bengaluru',
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
    city: 'Bengaluru',
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
    city: 'Bengaluru',
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
    city: 'Bengaluru',
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
    city: 'Bengaluru',
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
    city: 'Bengaluru',
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
    city: 'Bengaluru',
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
    city: 'Bengaluru',
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

  // --- MUMBAI ---
  {
    id: 'mum1',
    city: 'Mumbai',
    lat: 18.9414, lng: 72.8237,
    roadName: 'Marine Drive Arterial Road',
    contractor: 'Delta Roads Pvt. Ltd.',
    permitDate: '2026-04-01',
    promisedCompletion: '2026-04-20',
    status: 'critical',
    overdueDays: 30,
    zone: 'South Mumbai',
    nearSchool: false,
    description: 'Coastal Road integration works causing major bottlenecks'
  },
  {
    id: 'mum2',
    city: 'Mumbai',
    lat: 19.0962, lng: 72.8877,
    roadName: 'Saki Naka Junction',
    contractor: 'Metropolis Diggers Ltd.',
    permitDate: '2026-04-10',
    promisedCompletion: '2026-04-25',
    status: 'critical',
    overdueDays: 25,
    zone: 'Andheri East',
    nearSchool: true,
    description: 'Underground metro cabling work, heavy traffic delays'
  },
  {
    id: 'mum3',
    city: 'Mumbai',
    lat: 19.1197, lng: 72.8468,
    roadName: 'Link Road (Andheri)',
    contractor: 'L&T Infrastructure Corp.',
    permitDate: '2026-04-15',
    promisedCompletion: '2026-05-05',
    status: 'partial',
    overdueDays: 15,
    zone: 'Western Suburbs',
    nearSchool: false,
    description: 'Stormwater drain widening work'
  },
  {
    id: 'mum4',
    city: 'Mumbai',
    lat: 19.0084, lng: 72.8368,
    roadName: 'Lalbaug Flyover Approach',
    contractor: 'Sharma Construction Works',
    permitDate: '2026-05-01',
    promisedCompletion: '2026-05-18',
    status: 'in-progress',
    overdueDays: 2,
    zone: 'Dadar',
    nearSchool: true,
    description: 'Median structural repairs and drilling'
  },
  {
    id: 'mum5',
    city: 'Mumbai',
    lat: 19.0596, lng: 72.8295,
    roadName: 'Carter Road Promenade',
    contractor: 'Kovalam Builders',
    permitDate: '2026-05-05',
    promisedCompletion: '2026-05-20',
    status: 'repaired',
    overdueDays: 0,
    zone: 'Bandra West',
    nearSchool: false,
    description: 'Pavement reconstruction completed successfully'
  },

  // --- DELHI ---
  {
    id: 'del1',
    city: 'Delhi',
    lat: 28.6304, lng: 77.2177,
    roadName: 'Connaught Place Outer Circle',
    contractor: 'Apex Infra Pvt. Ltd.',
    permitDate: '2026-04-05',
    promisedCompletion: '2026-04-20',
    status: 'critical',
    overdueDays: 30,
    zone: 'Central Delhi',
    nearSchool: false,
    description: 'Sewer line renovation and excavation'
  },
  {
    id: 'del2',
    city: 'Delhi',
    lat: 28.5684, lng: 77.2201,
    roadName: 'Ring Road (South Ext)',
    contractor: 'Metropolis Diggers Ltd.',
    permitDate: '2026-04-12',
    promisedCompletion: '2026-04-28',
    status: 'critical',
    overdueDays: 22,
    zone: 'South Delhi',
    nearSchool: true,
    description: 'Subway corridor work under the main flyover'
  },
  {
    id: 'del3',
    city: 'Delhi',
    lat: 28.5355, lng: 77.2728,
    roadName: 'Okhla Phase 3 Road',
    contractor: 'Sharma Construction Works',
    permitDate: '2026-04-20',
    promisedCompletion: '2026-05-10',
    status: 'partial',
    overdueDays: 10,
    zone: 'South East Delhi',
    nearSchool: false,
    description: 'Gas pipeline laying for industrial connections'
  },
  {
    id: 'del4',
    city: 'Delhi',
    lat: 28.6442, lng: 77.1878,
    roadName: 'Karol Bagh Metro Stretch',
    contractor: 'Civic Build Corp.',
    permitDate: '2026-05-01',
    promisedCompletion: '2026-05-18',
    status: 'in-progress',
    overdueDays: 2,
    zone: 'West Delhi',
    nearSchool: true,
    description: 'Electrical cable laying across three blocks'
  },
  {
    id: 'del5',
    city: 'Delhi',
    lat: 28.6110, lng: 77.2405,
    roadName: 'Pragati Maidan Tunnel Approach',
    contractor: 'L&T Infrastructure Corp.',
    permitDate: '2026-05-10',
    promisedCompletion: '2026-05-24',
    status: 'repaired',
    overdueDays: 0,
    zone: 'Central Delhi',
    nearSchool: false,
    description: 'Drainage pipeline clearance completed'
  },

  // --- HYDERABAD ---
  {
    id: 'hyd1',
    city: 'Hyderabad',
    lat: 17.4435, lng: 78.3772,
    roadName: 'HITEC City Main Road',
    contractor: 'Kovalam Builders',
    permitDate: '2026-04-02',
    promisedCompletion: '2026-04-22',
    status: 'critical',
    overdueDays: 28,
    zone: 'Cyberabad IT Zone',
    nearSchool: false,
    description: 'Telecom fibre mesh and metro pillar laying'
  },
  {
    id: 'hyd2',
    city: 'Hyderabad',
    lat: 17.4267, lng: 78.4119,
    roadName: 'Jubilee Hills Road No. 36',
    contractor: 'Metropolis Diggers Ltd.',
    permitDate: '2026-04-18',
    promisedCompletion: '2026-05-02',
    status: 'partial',
    overdueDays: 18,
    zone: 'Jubilee Hills',
    nearSchool: true,
    description: 'Stormwater drain reinforcement at junction'
  },
  {
    id: 'hyd3',
    city: 'Hyderabad',
    lat: 17.4375, lng: 78.4482,
    roadName: 'Begumpet Flyover Road',
    contractor: 'Apex Infra Pvt. Ltd.',
    permitDate: '2026-04-25',
    promisedCompletion: '2026-05-15',
    status: 'partial',
    overdueDays: 5,
    zone: 'Secunderabad',
    nearSchool: false,
    description: 'Water board digging for fresh trunk lines'
  },
  {
    id: 'hyd4',
    city: 'Hyderabad',
    lat: 17.4401, lng: 78.3489,
    roadName: 'Gachibowli ORR Slip Road',
    contractor: 'Delta Roads Pvt. Ltd.',
    permitDate: '2026-05-08',
    promisedCompletion: '2026-05-22',
    status: 'in-progress',
    overdueDays: 0,
    zone: 'Gachibowli',
    nearSchool: true,
    description: 'Road widening and footpath leveling works'
  },
  {
    id: 'hyd5',
    city: 'Hyderabad',
    lat: 17.3660, lng: 78.4680,
    roadName: 'Charminar Pedestrian Way',
    contractor: 'Civic Build Corp.',
    permitDate: '2026-05-05',
    promisedCompletion: '2026-05-19',
    status: 'repaired',
    overdueDays: 0,
    zone: 'Old City',
    nearSchool: false,
    description: 'Stone paver replacement works finished'
  },

  // --- CHENNAI ---
  {
    id: 'chn1',
    city: 'Chennai',
    lat: 13.0405, lng: 80.2418,
    roadName: 'Anna Salai Road',
    contractor: 'L&T Infrastructure Corp.',
    permitDate: '2026-04-03',
    promisedCompletion: '2026-04-24',
    status: 'critical',
    overdueDays: 26,
    zone: 'Central Chennai',
    nearSchool: true,
    description: 'Metro rail phase 2 station structural excavations'
  },
  {
    id: 'chn2',
    city: 'Chennai',
    lat: 12.9649, lng: 80.2458,
    roadName: 'OMR IT Expressway',
    contractor: 'Apex Infra Pvt. Ltd.',
    permitDate: '2026-04-15',
    promisedCompletion: '2026-05-01',
    status: 'critical',
    overdueDays: 19,
    zone: 'IT Corridor',
    nearSchool: false,
    description: 'Major drinking water supply line excavation'
  },
  {
    id: 'chn3',
    city: 'Chennai',
    lat: 13.0324, lng: 80.2337,
    roadName: 'T-Nagar Usman Road',
    contractor: 'Sharma Construction Works',
    permitDate: '2026-04-22',
    promisedCompletion: '2026-05-10',
    status: 'partial',
    overdueDays: 10,
    zone: 'Commercial District',
    nearSchool: true,
    description: 'Smart city drainage and duct work'
  },
  {
    id: 'chn4',
    city: 'Chennai',
    lat: 13.0075, lng: 80.2015,
    roadName: 'Kathipara Junction Loop',
    contractor: 'Kovalam Builders',
    permitDate: '2026-05-05',
    promisedCompletion: '2026-05-20',
    status: 'in-progress',
    overdueDays: 0,
    zone: 'Guindy',
    nearSchool: false,
    description: 'Underpass maintenance and drainage remodeling'
  },

  // --- KOLKATA ---
  {
    id: 'kol1',
    city: 'Kolkata',
    lat: 22.5487, lng: 88.3562,
    roadName: 'Park Street',
    contractor: 'Delta Roads Pvt. Ltd.',
    permitDate: '2026-04-08',
    promisedCompletion: '2026-04-28',
    status: 'critical',
    overdueDays: 22,
    zone: 'Park Street District',
    nearSchool: true,
    description: 'Sewerage network replacement from colonial era'
  },
  {
    id: 'kol2',
    city: 'Kolkata',
    lat: 22.5735, lng: 88.4331,
    roadName: 'Salt Lake Sector V Ring Rd',
    contractor: 'GreenPath Infra',
    permitDate: '2026-04-20',
    promisedCompletion: '2026-05-05',
    status: 'critical',
    overdueDays: 15,
    zone: 'IT Park',
    nearSchool: false,
    description: 'Telecommunication and optic network expansions'
  },
  {
    id: 'kol3',
    city: 'Kolkata',
    lat: 22.5851, lng: 88.3468,
    roadName: 'Howrah Bridge Approach',
    contractor: 'Metropolis Diggers Ltd.',
    permitDate: '2026-05-01',
    promisedCompletion: '2026-05-18',
    status: 'partial',
    overdueDays: 2,
    zone: 'Howrah Gate',
    nearSchool: false,
    description: 'Structural reinforcement of tram line tracks'
  },
  {
    id: 'kol4',
    city: 'Kolkata',
    lat: 22.5195, lng: 88.3681,
    roadName: 'Gariahat Crossing',
    contractor: 'Civic Build Corp.',
    permitDate: '2026-05-10',
    promisedCompletion: '2026-05-25',
    status: 'in-progress',
    overdueDays: 0,
    zone: 'South Kolkata',
    nearSchool: true,
    description: 'Footpath upgrade and cable ducting work'
  },

  // --- PUNE ---
  {
    id: 'pun1',
    city: 'Pune',
    lat: 18.5222, lng: 73.8412,
    roadName: 'FC Road (Fergusson College)',
    contractor: 'GreenPath Infra',
    permitDate: '2026-04-05',
    promisedCompletion: '2026-04-25',
    status: 'critical',
    overdueDays: 25,
    zone: 'Shivaji Nagar',
    nearSchool: true,
    description: 'Water pipe reconstruction and pavement widening'
  },
  {
    id: 'pun2',
    city: 'Pune',
    lat: 18.5912, lng: 73.7389,
    roadName: 'Hinjawadi Phase 1 Main Rd',
    contractor: 'Metropolis Diggers Ltd.',
    permitDate: '2026-04-18',
    promisedCompletion: '2026-05-04',
    status: 'critical',
    overdueDays: 16,
    zone: 'Hinjawadi IT Park',
    nearSchool: false,
    description: 'Metro line 3 pillar drilling and structural work'
  },
  {
    id: 'pun3',
    city: 'Pune',
    lat: 18.5679, lng: 73.9143,
    roadName: 'Viman Nagar Road',
    contractor: 'Apex Infra Pvt. Ltd.',
    permitDate: '2026-04-28',
    promisedCompletion: '2026-05-15',
    status: 'partial',
    overdueDays: 5,
    zone: 'Viman Nagar',
    nearSchool: true,
    description: 'Stormwater line excavation and road leveling'
  },
  {
    id: 'pun4',
    city: 'Pune',
    lat: 18.5332, lng: 73.8306,
    roadName: 'Senapati Bapat Road',
    contractor: 'Sharma Construction Works',
    permitDate: '2026-05-10',
    promisedCompletion: '2026-05-24',
    status: 'in-progress',
    overdueDays: 0,
    zone: 'Model Colony',
    nearSchool: false,
    description: 'Substation cabling work, left lane closed'
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
  { type: 'new', message: '🔴 NEW DIG (Bengaluru): MG Road blocked since 6:00 AM — Apex Infra' },
  { type: 'overdue', message: '⚠️ OVERDUE (Mumbai): Metropolis Diggers — Day 57 of 15-day promise on ORR' },
  { type: 'repaired', message: '✅ REPAIRED (Pune): Hinjawadi Phase 1 — All lanes now open' },
  { type: 'info', message: '📍 240+ active dig sites across 7 major Indian cities right now' },
  { type: 'overdue', message: '⚠️ OVERDUE (Delhi): Sharma Construction — Ring Road South Ext Day 32' },
  { type: 'new', message: '🔴 NEW DIG (Hyderabad): HITEC City Road — Fresh permit logged 2h ago' },
  { type: 'repaired', message: '✅ REPAIRED (Chennai): T-Nagar Usman Road completed ahead of schedule 🎉' },
  { type: 'info', message: '🚨 HIGH CHAOS ALERT (Mumbai): Saki Naka Junction congestion predicted SEVERE' },
  { type: 'overdue', message: '⚠️ OVERDUE (Kolkata): Delta Roads — Park Street Day 22' },
  { type: 'new', message: '🔴 NEW DIG (Delhi): Connaught Place Outer Circle excavation started' },
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
