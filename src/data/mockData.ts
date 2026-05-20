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

export interface CityDetail {
  name: string;
  lat: number;
  lng: number;
  roads: string[];
  zones: string[];
  description: string;
}

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
  { type: 'info', message: '📍 240+ active dig sites across 30+ major Indian cities right now' },
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

export const indianCities: CityDetail[] = [
  {
    name: 'Bengaluru',
    lat: 12.9716, lng: 77.5946,
    roads: ['MG Road', 'Outer Ring Road (ORR)', 'Brigade Road', 'Residency Road', 'Hosur Road', 'Indiranagar 100ft Road', 'Yeshwanthpur Main Road', 'Old Madras Road', 'Koramangala 80ft Road'],
    zones: ['Central Business District', 'East Bengaluru', 'Commercial District', 'Central Bengaluru', 'South Bengaluru', 'Indiranagar', 'Northwest Bengaluru', 'HSR Layout'],
    description: 'Silicon Valley under constant pipeline and metro construction surgery.'
  },
  {
    name: 'Mumbai',
    lat: 19.0760, lng: 72.8777,
    roads: ['Marine Drive', 'Saki Naka Road', 'Link Road Andheri', 'Lalbaug Flyover Stretch', 'Carter Road', 'SV Road Bandra', 'Goregaon-Mulund Link Road', 'JVLR'],
    zones: ['South Mumbai', 'Andheri East', 'Western Suburbs', 'Dadar', 'Bandra West', 'Goregaon', 'Powai'],
    description: 'Coastal Road construction and metro work arterial blockages.'
  },
  {
    name: 'Delhi NCR',
    lat: 28.6139, lng: 77.2090,
    roads: ['Connaught Place Outer Circle', 'Ring Road (South Ext)', 'Okhla Phase 3 Rd', 'Karol Bagh Metro Stretch', 'Vikas Marg', 'DND Flyway Approach', 'Mathura Road'],
    zones: ['Central Delhi', 'South Delhi', 'South East Delhi', 'West Delhi', 'East Delhi', 'Noida-Delhi Border', 'Dwarka'],
    description: 'Flyover maintenance, stormwater drain widening, and highway digging.'
  },
  {
    name: 'Hyderabad',
    lat: 17.3850, lng: 78.4867,
    roads: ['HITEC City Main Road', 'Jubilee Hills Road No 36', 'Begumpet Flyover Road', 'Gachibowli ORR Slip Road', 'Banjara Hills Road No 1', 'Kukatpally Main Rd'],
    zones: ['Cyberabad IT Zone', 'Jubilee Hills', 'Secunderabad', 'Gachibowli', 'Banjara Hills', 'Kukatpally'],
    description: 'IT Corridor flyovers and underground telecom cabling.'
  },
  {
    name: 'Chennai',
    lat: 13.0827, lng: 80.2707,
    roads: ['Anna Salai Road', 'OMR IT Expressway', 'T-Nagar Usman Road', 'Kathipara Junction Loop', 'Poonamallee High Road', 'Velachery Main Road'],
    zones: ['Central Chennai', 'IT Corridor', 'Commercial District', 'Guindy', 'Kilpauk', 'Velachery'],
    description: 'Metro rail phase 2 digging and storm drain excavations.'
  },
  {
    name: 'Kolkata',
    lat: 22.5726, lng: 88.3639,
    roads: ['Park Street', 'Salt Lake Sector V Ring Rd', 'Howrah Bridge Approach', 'Gariahat Crossing', 'Chowringhee Road', 'EM Bypass'],
    zones: ['Park Street District', 'IT Hub Salt Lake', 'Howrah Gate', 'South Kolkata', 'Central Kolkata', 'East Kolkata'],
    description: 'Heritage street renovations and water line surgery.'
  },
  {
    name: 'Pune',
    lat: 18.5204, lng: 73.8567,
    roads: ['FC Road', 'Hinjawadi Phase 1 Main Rd', 'Viman Nagar Road', 'Senapati Bapat Road', 'Kothrud DP Road', 'Baner Road'],
    zones: ['Shivaji Nagar', 'Hinjawadi IT Park', 'Viman Nagar', 'Model Colony', 'Kothrud', 'Baner'],
    description: 'Metro line constructions and Hinjawadi IT zone pipeline surgery.'
  },
  {
    name: 'Ahmedabad',
    lat: 23.0225, lng: 72.5714,
    roads: ['SG Highway', 'C G Road', 'Ashram Road', 'Sindhu Bhavan Road', 'Drive In Road'],
    zones: ['Bodakdev', 'Navrangpura', 'Sabarmati', 'Satellite Area', 'Vastrapur'],
    description: 'BRTS corridor extension and stormwater line trenching.'
  },
  {
    name: 'Jaipur',
    lat: 26.9124, lng: 75.7873,
    roads: ['M.I. Road', 'Tonk Road', 'Ajmer Road', 'JLN Marg', 'Hawa Mahal Bazar Road'],
    zones: ['C-Scheme', 'Malviya Nagar', 'Mansarovar', 'Vaishali Nagar', 'Pink City'],
    description: 'Smart City sewerage upgrades and heritage walk excavations.'
  },
  {
    name: 'Lucknow',
    lat: 26.8467, lng: 80.9462,
    roads: ['Hazratganj High Street', 'Lohia Path', 'Kanpur Road Bypass', 'Gomti Nagar Main Rd', 'Faizabad Road'],
    zones: ['Hazratganj', 'Gomti Nagar', 'Alambagh', 'Indira Nagar', 'Hazratganj Commercial'],
    description: 'Metro expansion drilling and utility duct trenching.'
  },
  {
    name: 'Surat',
    lat: 21.1702, lng: 72.8311,
    roads: ['Dumas Road', 'Varachha Main Road', 'Ring Road', 'Adajan Road', 'Ghod Dod Road'],
    zones: ['Piplod', 'Varachha', 'Athwa Lines', 'Adajan', 'Katargam'],
    description: 'Outer ring road widening and flyover construction excavations.'
  },
  {
    name: 'Kanpur',
    lat: 26.4499, lng: 80.3319,
    roads: ['Mall Road', 'GT Road Bypass', 'Aarya Nagar Road', 'Kidwai Nagar Rd'],
    zones: ['Civil Lines', 'Aarya Nagar', 'Swaroop Nagar', 'Kidwai Nagar'],
    description: 'Ganga water pipeline laying and sewer trunk repairs.'
  },
  {
    name: 'Nagpur',
    lat: 21.1458, lng: 79.0882,
    roads: ['Wardha Road', 'Amravati Road', 'Central Avenue', 'Sadarthana Road'],
    zones: ['Dharampeth', 'Manish Nagar', 'Sitabuldi', 'Sadashiv Nagar'],
    description: 'Nagpur Metro Phase 2 excavations and cement road works.'
  },
  {
    name: 'Indore',
    lat: 22.7196, lng: 75.8577,
    roads: ['AB Road', 'MG Road Indore', 'Ring Road Bypass', 'Vijay Nagar Road'],
    zones: ['Vijay Nagar', 'Palasia', 'Rajendra Nagar', 'Khajrana'],
    description: 'Indore Metro Rail project drilling and smart road paving.'
  },
  {
    name: 'Patna',
    lat: 25.5941, lng: 85.1376,
    roads: ['Bailey Road', 'Ashok Rajpath', 'Fraser Road', 'Kankarbagh Main Rd'],
    zones: ['Kankarbagh', 'Patliputra Colony', 'Fraser Road Area', 'Danapur'],
    description: 'Patna Metro project tunnel shafts and Ashok Rajpath double decker flyover excavations.'
  },
  {
    name: 'Bhopal',
    lat: 23.2599, lng: 77.4126,
    roads: ['Hoshangabad Road', 'Link Road 1', 'Kolar Road', 'Hamidia Road'],
    zones: ['Arera Colony', 'MP Nagar', 'Kolar', 'TT Nagar'],
    description: 'Kolar water supply project pipe laying and Metro lane construction.'
  },
  {
    name: 'Vadodara',
    lat: 22.3072, lng: 73.1812,
    roads: ['RC Dutt Road', 'OP Road', 'Jetalpur Road', 'Waghodia Road'],
    zones: ['Alkapuri', 'Akota', 'Jetalpur', 'Gotri'],
    description: 'Gas pipeline repairs and flyover approach slab works.'
  },
  {
    name: 'Ludhiana',
    lat: 30.9010, lng: 75.8573,
    roads: ['Ferozepur Road', 'Link Road Ludhiana', 'Mall Road Ludhiana', 'Gill Road'],
    zones: ['Sarabha Nagar', 'Model Town', 'Civil Lines', 'Gill Area'],
    description: 'Elevated highway project girder launching and water logging drain repairs.'
  },
  {
    name: 'Agra',
    lat: 27.1767, lng: 78.0081,
    roads: ['Fatehabad Road', 'MG Road Agra', 'Taj East Gate Road', 'Sanjay Place Road'],
    zones: ['Fatehabad', 'Sanjay Place', 'Taj Ganj', 'Kamla Nagar'],
    description: 'Agra Metro corridor works and Taj Ganj smart sewer repairs.'
  },
  {
    name: 'Nashik',
    lat: 19.9975, lng: 73.7898,
    roads: ['College Road', 'Gangapur Road', 'Trimbak Road', 'Mumbai Naka Approach'],
    zones: ['Indira Nagar', 'Gangapur', 'Panchavati', 'Nashik Road Area'],
    description: 'Smart city utility duct installations and water pipeline reconstruction.'
  },
  {
    name: 'Ranchi',
    lat: 23.3441, lng: 85.3096,
    roads: ['Main Road Ranchi', 'Kanke Road', 'Circular Road', 'Bariatu Road'],
    zones: ['Lalpur', 'Kanke', 'Bariatu', 'Hindpiri'],
    description: 'Kantatoli flyover construction and underground sewage piping.'
  },
  {
    name: 'Faridabad',
    lat: 28.4089, lng: 77.3178,
    roads: ['Mathura Road Faridabad', 'Bypass Road', 'Neelam Bata Road'],
    zones: ['Sector 15', 'Neelam Bata', 'NIT Faridabad', 'Sector 21'],
    description: 'NH-2 flyover repairs and Sector drainage pipeline excavations.'
  },
  {
    name: 'Meerut',
    lat: 28.9845, lng: 77.7064,
    roads: ['Delhi Road Meerut', 'Garh Road', 'Mall Road Meerut'],
    zones: ['Shastri Nagar', 'Modipuram', 'Civil Lines'],
    description: 'RRTS corridor construction and smart city water pipeline laying.'
  },
  {
    name: 'Rajkot',
    lat: 22.3039, lng: 70.8022,
    roads: ['Kalavad Road', 'Yagnik Road', '150 Ring Road', 'Kuvadva Road'],
    zones: ['Amin Marg', 'Yagnik Nagar', 'Rail Nagar', 'Mavdi Area'],
    description: 'Flyover girder construction and smart sewage lines.'
  },
  {
    name: 'Varanasi',
    lat: 25.3176, lng: 82.9739,
    roads: ['Cantt Station Road', 'Gowdowlia Crossing Rd', 'Lanka BHU Road'],
    zones: ['Sigra', 'Gowdowlia', 'Lanka Area', 'Cantt Area'],
    description: 'Varanasi Ropeway project base foundations and ghat cleaning sewers.'
  },
  {
    name: 'Srinagar',
    lat: 34.0837, lng: 74.7973,
    roads: ['Residency Road Srinagar', 'Lal Chowk Bypass', 'Dal Lake Boulevard'],
    zones: ['Lal Chowk', 'Rajbagh', 'Karan Nagar', 'Dalgate'],
    description: 'S Srinagar Smart City underground cabling and drainage overhaul.'
  },
  {
    name: 'Amritsar',
    lat: 31.6340, lng: 74.8723,
    roads: ['GT Road Amritsar', 'Mall Road Amritsar', 'Heritage Street Approach'],
    zones: ['Golden Temple Area', 'Ranjit Avenue', 'Civil Lines'],
    description: 'Heritage street paving and smart sewerage upgrades.'
  },
  {
    name: 'Raipur',
    lat: 21.2514, lng: 81.6296,
    roads: ['GE Road', 'VIP Road Raipur', 'Ring Road 1 Raipur'],
    zones: ['Civil Lines', 'Shankar Nagar', 'Tatibandh'],
    description: 'VIP road widening and stormwater channel construction.'
  },
  {
    name: 'Guwahati',
    lat: 26.1445, lng: 91.7362,
    roads: ['GS Road', 'RG Baruah Road', 'VIP Road Guwahati', 'MG Road Guwahati'],
    zones: ['Dispur', 'Ganeshguri', 'Paltan Bazaar', 'Uzan Bazaar'],
    description: 'GS Road flyover construction and water pipeline laying works.'
  },
  {
    name: 'Chandigarh',
    lat: 30.7333, lng: 76.7794,
    roads: ['Jan Marg', 'Madhya Marg', 'Udyog Marg', 'Himalaya Marg'],
    zones: ['Sector 17', 'Sector 35', 'Sector 22', 'Sector 43'],
    description: 'Cycle track expansions and smart water grid meter installations.'
  }
];

function generateProceduralMarkers(): MapMarker[] {
  const list: MapMarker[] = [];
  
  // 1. Keep original hardcoded Bengaluru markers to maintain consistency
  const originalBengaluru: MapMarker[] = [
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
    }
  ];
  list.push(...originalBengaluru);

  // 2. Keep original hardcoded Mumbai markers
  const originalMumbai: MapMarker[] = [
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
    }
  ];
  list.push(...originalMumbai);

  // 3. Generate markers for all remaining cities
  const contractorsList = [
    'Apex Infra Pvt. Ltd.',
    'Metropolis Diggers Ltd.',
    'L&T Infrastructure Corp.',
    'Civic Build Corp.',
    'Sharma Construction Works',
    'GreenPath Infra',
    'Kovalam Builders',
    'Delta Roads Pvt. Ltd.'
  ];

  const statusList: Array<'critical' | 'partial' | 'in-progress' | 'repaired'> = [
    'critical', 'partial', 'in-progress', 'repaired'
  ];

  const workDescriptions = [
    'Excavation for major stormwater drainage systems',
    'Laying of high-speed underground fiber optic cables',
    'Replacing broken water main pipelines',
    'Subway construction corridor leveling',
    'Underground natural gas line installations',
    'Road widening and pavement reconstruction work',
    'Metro rail concrete pillar foundation drilling',
    'Median landscaping and tree planting work',
    'Electrical grid cabling and transformer maintenance'
  ];

  indianCities.forEach(city => {
    // Generate 6 realistic markers per city (skip main Mumbai/Bengaluru markers which we added above)
    const isMain = city.name === 'Bengaluru' || city.name === 'Mumbai';
    const numToGenerate = isMain ? 2 : 6;
    const startIndex = isMain ? 6 : 0;

    for (let i = 0; i < numToGenerate; i++) {
      const roadName = city.roads[(startIndex + i) % city.roads.length];
      const zoneName = city.zones[Math.floor(Math.random() * city.zones.length)];
      const contractor = contractorsList[Math.floor(Math.random() * contractorsList.length)];
      const status = statusList[Math.floor(Math.random() * statusList.length)];
      
      let overdueDays = 0;
      if (status === 'critical') overdueDays = 15 + Math.floor(Math.random() * 25);
      else if (status === 'partial') overdueDays = 5 + Math.floor(Math.random() * 15);
      else if (status === 'in-progress') overdueDays = Math.random() > 0.7 ? 1 + Math.floor(Math.random() * 4) : 0;

      // Small lat/lng offset so they scatter realistically around the city center
      const latOffset = (Math.random() - 0.5) * 0.03;
      const lngOffset = (Math.random() - 0.5) * 0.03;

      list.push({
        id: `gen-${city.name.toLowerCase().replace(/[^a-z0-9]/g, '')}-${i}`,
        city: city.name,
        lat: city.lat + latOffset,
        lng: city.lng + lngOffset,
        roadName: roadName,
        contractor: contractor,
        permitDate: `2026-04-${10 + Math.floor(Math.random() * 15)}`,
        promisedCompletion: `2026-05-${10 + Math.floor(Math.random() * 15)}`,
        status: status,
        overdueDays: overdueDays,
        zone: zoneName,
        nearSchool: Math.random() > 0.6,
        description: `${workDescriptions[Math.floor(Math.random() * workDescriptions.length)]} on ${roadName}.`
      });
    }
  });

  return list;
}

export const mapMarkers = generateProceduralMarkers();
