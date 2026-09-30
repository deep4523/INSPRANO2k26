// Pure In-Memory Data Store for Netlify & Static Deployment (Zero Database Dependency)

export const INITIAL_CATEGORIES = [
  { id: 1, name: 'General', slug: 'general', icon: 'compass', display_order: 1 },
  { id: 2, name: 'ME', slug: 'mechanical', icon: 'cog', display_order: 2 },
  { id: 3, name: 'CSE', slug: 'cse', icon: 'cpu', display_order: 3 },
  { id: 4, name: 'CE', slug: 'civil', icon: 'landmark', display_order: 4 },
  { id: 5, name: 'EE/ECE', slug: 'ee-ece', icon: 'zap', display_order: 5 },
  { id: 6, name: 'Esports', slug: 'esports', icon: 'gamepad-2', display_order: 6 },
  { id: 7, name: 'School Students', slug: 'school-students', icon: 'graduation-cap', display_order: 7 },
];

export const INITIAL_EVENTS = [
  { id: 1, name: 'EV working model challenge', slug: 'ev-working-model-challenge', category_id: 1, department: 'General / EE / ME', prize_amount: 4000, first_prize: 4000, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: true, rounds_count: 1, google_form_url: 'https://docs.google.com/forms/d/e/1FAIpQLSc-t9w8ZezTZNSgrH8N-ACGw2c_VEAKIKdEsDw-sYykRU3kwQ/viewform' },
  { id: 2, name: 'Tech Writing', slug: 'tech-writing', category_id: 1, department: 'General', prize_amount: 1500, first_prize: 1500, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: false, rounds_count: 1, google_form_url: 'https://forms.gle/pjLnPfomvMp7dDeWA' },
  { id: 3, name: 'Tech Talk', slug: 'tech-talk', category_id: 1, department: 'General', prize_amount: 1500, first_prize: 1500, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: false, rounds_count: 1, google_form_url: 'https://forms.gle/6dbRKfS1uvbzG5Dz6' },
  { id: 4, name: 'Poster Presentation', slug: 'poster-presentation', category_id: 1, department: 'General', prize_amount: 2500, first_prize: 2500, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: true, rounds_count: 1, google_form_url: 'https://forms.gle/Uqsp4mNP6vfXvdPT6' },
  { id: 5, name: 'Hackathon', slug: 'hackathon', category_id: 3, department: 'CSE (Computer Science & Engineering)', prize_amount: 35000, first_prize: 35000, second_prize: 0, third_prize: 0, trophy_info: 'Trophy + Certificates', registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: true, rounds_count: 2, google_form_url: 'https://hackverse.codebreakersgcek.tech/register' },
  { id: 6, name: 'Science Exhibition (For School Students)', slug: 'science-exhibition-school-students', category_id: 7, department: 'School Section', prize_amount: 2500, first_prize: 2500, second_prize: 0, third_prize: 0, trophy_info: 'Trophies + Certificates', registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: true, rounds_count: 1, google_form_url: 'NA' },
  { id: 7, name: 'BGMI', slug: 'bgmi', category_id: 6, department: 'Esports', prize_amount: 1500, first_prize: 1500, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: false, rounds_count: 1, google_form_url: 'https://forms.gle/biQ5FixgcYZZQrcF7' },
  { id: 8, name: 'Free Fire', slug: 'free-fire', category_id: 6, department: 'Esports', prize_amount: 1500, first_prize: 1500, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: false, rounds_count: 1, google_form_url: 'https://forms.gle/Ragw5xPHYBhviSZk7' },
  { id: 9, name: 'Treasure Hunt', slug: 'treasure-hunt', category_id: 1, department: 'General', prize_amount: 1500, first_prize: 1500, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: false, rounds_count: 1, google_form_url: 'https://forms.gle/z6VetbtEtsHz4jdKA' },
  { id: 10, name: 'Food Without Fire', slug: 'food-without-fire', category_id: 1, department: 'General', prize_amount: 1500, first_prize: 1500, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: false, rounds_count: 1, google_form_url: 'https://forms.gle/SoviEzA88v1Q4v4d9' },
  { id: 11, name: 'Who’s the Mech ? (ME EVENTS)', slug: 'whos-the-mech', category_id: 2, department: 'ME (Mechanical Engineering)', prize_amount: 1500, first_prize: 1500, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: false, rounds_count: 1, google_form_url: 'https://forms.gle/ncZDkYABBHGFpZns9' },
  { id: 12, name: 'Mech-A-Quiz', slug: 'mech-a-quiz', category_id: 2, department: 'ME (Mechanical Engineering)', prize_amount: 1500, first_prize: 1500, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: false, rounds_count: 1, google_form_url: 'https://forms.gle/sXbhYv8p8r3AvpPd9' },
  { id: 13, name: 'Mech-A-Pixel', slug: 'mech-a-pixel', category_id: 2, department: 'ME (Mechanical Engineering)', prize_amount: 1500, first_prize: 1500, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: false, rounds_count: 1, google_form_url: 'https://forms.gle/fg1NKSgR9Ax4G1h47' },
  { id: 14, name: 'Machine Hunt', slug: 'machine-hunt', category_id: 2, department: 'ME (Mechanical Engineering)', prize_amount: 1500, first_prize: 1500, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: false, rounds_count: 1, google_form_url: 'https://forms.gle/ko7s5kWHK2f2JusW7' },
  { id: 15, name: 'Tech Charades (CSE EVENTS)', slug: 'tech-charades', category_id: 3, department: 'CSE (Computer Science & Engineering)', prize_amount: 1500, first_prize: 1500, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: false, rounds_count: 1, google_form_url: 'https://forms.gle/yfdcLKf1whi4NWGC8' },
  { id: 16, name: 'Prompt Craft', slug: 'prompt-craft', category_id: 3, department: 'CSE (Computer Science & Engineering)', prize_amount: 1500, first_prize: 1500, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: false, rounds_count: 1, google_form_url: 'https://forms.gle/ZiDSsfroaoPYF9z26' },
  { id: 17, name: 'Recovery Room', slug: 'recovery-room', category_id: 3, department: 'CSE (Computer Science & Engineering)', prize_amount: 1500, first_prize: 1500, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: false, rounds_count: 1, google_form_url: 'https://forms.gle/VsBcRTxv2h4CeNkj8' },
  { id: 18, name: 'Tech Battle', slug: 'tech-battle', category_id: 3, department: 'CSE (Computer Science & Engineering)', prize_amount: 1500, first_prize: 1500, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: false, rounds_count: 1, google_form_url: 'https://forms.gle/Q4HCCn3MGJAXXkyLA' },
  { id: 19, name: 'Civil X (CIVIL EVENTS)', slug: 'civil-x', category_id: 4, department: 'CE (Civil Engineering)', prize_amount: 1500, first_prize: 1500, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: false, rounds_count: 1, google_form_url: 'https://forms.gle/J4UdLx6TqK5KCzFx8' },
  { id: 20, name: 'Bridge It', slug: 'bridge-it', category_id: 4, department: 'CE (Civil Engineering)', prize_amount: 1500, first_prize: 1500, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: false, rounds_count: 1, google_form_url: 'https://forms.gle/tdYVfWpWgvLC8w6t8' },
  { id: 21, name: 'Civil Treasure Hunt', slug: 'civil-treasure-hunt', category_id: 4, department: 'CE (Civil Engineering)', prize_amount: 1500, first_prize: 1500, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: false, rounds_count: 1, google_form_url: 'https://forms.gle/AuxNDpgeAJ6wUi599' },
  { id: 22, name: 'Jenga-Engineering Edition', slug: 'jenga-engineering-edition', category_id: 4, department: 'CE (Civil Engineering)', prize_amount: 1500, first_prize: 1500, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: false, rounds_count: 1, google_form_url: 'https://docs.google.com/forms/d/e/1FAIpQLSfbIHdelBJyLBNpM_mX1yAxGpT45EiYvqrsDiUdS41FjtfUSw/viewform?usp=header' },
  { id: 23, name: 'DEBUGGING DERBY (EE C ECE EVENTS)', slug: 'debugging-derby', category_id: 5, department: 'EE & ECE (Electrical & Electronics)', prize_amount: 1500, first_prize: 1500, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: false, rounds_count: 1, google_form_url: 'https://forms.gle/VzD3VQ13u1g4K6kL6' },
  { id: 24, name: 'NEXUS BLUEPRINT', slug: 'nexus-blueprint', category_id: 5, department: 'EE & ECE (Electrical & Electronics)', prize_amount: 1500, first_prize: 1500, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: false, rounds_count: 1, google_form_url: 'https://forms.gle/sbDuVsdE1kfXUvfP8' },
  { id: 25, name: 'LOGIC LATTICE', slug: 'logic-lattice', category_id: 5, department: 'EE & ECE (Electrical & Electronics)', prize_amount: 1500, first_prize: 1500, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: false, rounds_count: 1, google_form_url: 'https://forms.gle/npkR1DTAUdN7pQJL6' },
  { id: 26, name: 'JOULE TRIVIA', slug: 'joule-trivia', category_id: 5, department: 'EE & ECE (Electrical & Electronics)', prize_amount: 1500, first_prize: 1500, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: false, rounds_count: 1, google_form_url: 'https://forms.gle/fng1TGCfg1AwcU7fA' },
  { id: 27, name: 'SILICON SCAN', slug: 'silicon-scan', category_id: 5, department: 'EE & ECE (Electrical & Electronics)', prize_amount: 1500, first_prize: 1500, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: false, rounds_count: 1, google_form_url: 'https://forms.gle/9HK3FUPCmahyJaxm8' },
  { id: 28, name: 'IMPEDANCE AND INNOVATION', slug: 'impedance-and-innovation', category_id: 5, department: 'EE & ECE (Electrical & Electronics)', prize_amount: 1500, first_prize: 1500, second_prize: 0, third_prize: 0, trophy_info: null, registration_status: 'OPEN', publish_status: 'PUBLISHED', featured: false, rounds_count: 1, google_form_url: 'https://forms.gle/qZLAtsfG7hvKCabB6' },
];

export const INITIAL_SCHEDULE = [
  { id: 1, day_number: 1, date_label: '8 OCTOBER 2026', time_label: 'Day 1 — Technical & General Events', title: 'Grand Opening & General Challenges', category: 'General', venue: 'Seminar Hall', description: 'Registration verification, inauguration ceremony, EV Working Model Challenge, Tech Writing, and Poster Presentations.', display_order: 1 },
  { id: 2, day_number: 2, date_label: '9 OCTOBER 2026', time_label: 'Day 2 — Core Department Events', title: 'Department Showdowns & Hackathon Kickoff', category: 'Departmental', venue: 'Department Labs & CS Block', description: 'Mech, CSE, Civil, EE/ECE departmental competitions and 24-hr Hackathon sprint commences.', display_order: 2 },
  { id: 3, day_number: 3, date_label: '10 OCTOBER 2026', time_label: 'Day 3 — Final Rounds & Valedictory', title: 'Final Rounds, Prize Distribution & Closing', category: 'Celebration', venue: 'Open Air Stage', description: 'Final presentations, Hackathon jury evaluation, grand prize ceremony (₹85,000+), and valedictory address.', display_order: 3 },
];

export const INITIAL_SETTINGS: Record<string, string> = {
  fest_name: 'INSPRANO 2K26',
  college_name: 'Government College of Engineering Kalahandi',
  college_location: 'Bhawanipatna, Odisha',
  tagline: 'ENGINEERING BEYOND LIMITS',
  motto: 'LEARN • BUILD • INNOVATE • TOGETHER',
  start_date: '2026-10-08',
  end_date: '2026-10-10',
  venue: 'GCEK Campus, Bhawanipatna, Odisha',
  official_email: 'insprano2026.gcek@gmail.com',
  official_phone: '',
  registration_open: 'true',
};

export const INITIAL_LEADERSHIP = [
  {
    id: 1,
    full_name: 'Prof. (Dr.) Shubranshu Sekhar Dash',
    designation: 'Principal',
    department: 'Government College of Engineering Kalahandi, Bhawanipatna',
    role_category: 'PRINCIPAL & CHIEF PATRON',
    bio: 'Principal & Chief Patron of INSPRANO 2K26, guiding technical innovation and academic excellence at Government College of Engineering Kalahandi, Bhawanipatna.',
    photo_url: 'https://i.ibb.co/JR2QZZCQ/Whats-App-Image-2026-09-28-at-11-49-02-AM.jpg',
    published: true,
  },
  {
    id: 2,
    full_name: 'Prof. (Dr.) Chitaranjan Dash',
    designation: 'Dean, Student Welfare (DSW)',
    department: 'Government College of Engineering Kalahandi, Bhawanipatna',
    role_category: 'DEAN STUDENT WELFARE (DSW)',
    bio: 'Dean Student Welfare at Government College of Engineering Kalahandi, Bhawanipatna, guiding student development, activities, and technical innovation for INSPRANO 2K26.',
    photo_url: 'https://i.ibb.co/21RJmXbf/Whats-App-Image-2026-09-28-at-11-05-52-PM.jpg',
    published: true,
  },
  {
    id: 3,
    full_name: 'Prof. Basanta Kumar Mahapatro',
    designation: 'Vice President (VP), INSPRANO 2K26',
    department: 'Government College of Engineering Kalahandi, Bhawanipatna',
    role_category: 'VICE PRESIDENT (VP)',
    bio: 'Vice President of INSPRANO 2K26, coordinating festival operations, technical events, and student innovation at Government College of Engineering Kalahandi, Bhawanipatna.',
    photo_url: 'https://i.ibb.co/9CH4ZbG/IMG-7310-Copy.avif',
    phone: '9438622015',
    published: true,
  },
  {
    id: 4,
    full_name: 'Assoc. Prof. (Dr.) Basanta Kumar Swain',
    designation: 'Registrar',
    department: 'Government College of Engineering Kalahandi, Bhawanipatna',
    role_category: 'REGISTRAR',
    bio: 'Registrar at Government College of Engineering Kalahandi, Bhawanipatna, administrative leader supporting technical innovation and INSPRANO 2K26 operations.',
    photo_url: 'https://i.ibb.co/2YYTCNbM/Whats-App-Image-2026-09-28-at-11-39-24-PM.jpg',
    published: true,
  },
  {
    id: 5,
    full_name: 'Sibaram Panigrahi',
    designation: 'Chief Student Coordinator',
    department: '3rd Year, Mechanical Engineering, GCEK',
    role_category: 'CHIEF STUDENT COORDINATOR',
    bio: 'Chief Student Coordinator of INSPRANO 2K26, leading student teams, festival operations, and event management.',
    photo_url: 'https://i.ibb.co/Ps0jJHHp/Whats-App-Image-2026-09-29-at-1-59-53-AM.jpg',
    phone: '8984705487',
    published: true,
  },
  {
    id: 6,
    full_name: 'Atreya Panda',
    designation: 'Student Chief Co-Coordinator',
    department: '3rd Year, Mechanical Engineering, GCEK',
    role_category: 'STUDENT CHIEF CO-COORDINATOR',
    bio: 'Student Chief Co-Coordinator of INSPRANO 2K26, coordinating festival operations, student leadership, and event execution.',
    photo_url: 'https://i.ibb.co/LXd5vgpX/atreya.jpg',
    phone: '9439574712',
    published: true,
  },
];

export const INITIAL_GALLERY = [
  {
    id: 1,
    title: 'Faculty Members of INSPRANO 2K26',
    category: 'FACULTY & CONVENERS',
    caption: 'Faculty members and event conveners of INSPRANO 2K26 at Government College of Engineering Kalahandi, Bhawanipatna.',
    image_url: 'https://i.ibb.co/S4mPXsL1/Whats-App-Image-2026-09-29-at-11-17-30-PM.jpg',
  },
  {
    id: 2,
    title: 'Coordinators of INSPRANO 2K26',
    category: 'COORDINATORS',
    caption: 'Student coordinators team leading event execution, technical challenges, and festival operations for INSPRANO 2K26.',
    image_url: 'https://i.ibb.co/MkmdqCYF/Whats-App-Image-2026-09-29-at-11-28-27-PM.jpg',
  },
  {
    id: 3,
    title: 'Co-Coordinators of INSPRANO 2K26',
    category: 'CO-COORDINATORS',
    caption: 'Student co-coordinators team supporting festival management, technical arena coordination, and event logistics.',
    image_url: 'https://i.ibb.co/vGvq1SX/Whats-App-Image-2026-09-29-at-11-36-22-PM.jpg',
  },
];

export async function executeQuery<T = any>(
  sql: string,
  params: any[] = []
): Promise<{ rows: T[]; rowCount?: number }> {
  const lower = sql.trim().toLowerCase();

  if (lower.startsWith('select count(*) as totalevents') || lower.includes('sum(prize_amount)')) {
    const totalEvents = INITIAL_EVENTS.length;
    const totalPrize = INITIAL_EVENTS.reduce((acc, ev) => acc + (ev.prize_amount || 0), 0);
    return {
      rows: [{
        totalEvents,
        totalPrize,
        publishedEvents: totalEvents,
        upcomingEvents: totalEvents,
        totalRegistrations: 0,
        totalSponsors: 0,
        totalLeadership: INITIAL_LEADERSHIP.length,
        totalGallery: INITIAL_GALLERY.length,
        categoriesCount: INITIAL_CATEGORIES.length,
      }] as unknown as T[],
    };
  }

  if (lower.includes('from event_categories') || lower.includes('from categories')) {
    return { rows: INITIAL_CATEGORIES as unknown as T[] };
  }

  if (lower.includes('from events')) {
    let list = [...INITIAL_EVENTS];
    if (params.length > 0 && typeof params[0] === 'string' && lower.includes('where slug =')) {
      list = list.filter(e => e.slug === params[0]);
    } else if (params.length > 0 && lower.includes('where id =')) {
      list = list.filter(e => e.id === Number(params[0]));
    }
    return { rows: list as unknown as T[] };
  }

  if (lower.includes('from schedule_items')) {
    return { rows: INITIAL_SCHEDULE as unknown as T[] };
  }

  if (lower.includes('from leadership_members')) {
    return { rows: INITIAL_LEADERSHIP as unknown as T[] };
  }

  if (lower.includes('from gallery_items') || lower.includes('from gallery')) {
    return { rows: INITIAL_GALLERY as unknown as T[] };
  }

  if (lower.includes('from site_settings')) {
    const arr = Object.entries(INITIAL_SETTINGS).map(([key, value]) => ({ setting_key: key, setting_value: value }));
    return { rows: arr as unknown as T[] };
  }

  return { rows: [] as unknown as T[] };
}
