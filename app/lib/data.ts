'use client';

/* =============================================
   DATA STORE — The Infinity Creators
   Local storage-backed data management
   ============================================= */

export interface CommitteeMember {
  id: string;
  name: string;
  position: string;
  classGrade: string;
  bio: string;
  responsibilities: string;
  term: string;
  photo: string;
  contact: string;
  order: number;
}

export interface Coordinator {
  id: string;
  number: number;
  name: string;
  photo: string;
  classGrade: string;
  portfolio: string;
  bio: string;
  academicYear: string;
  contact: string;
}

export interface Principal {
  id: string;
  name: string;
  designation: string;
  role: string;
  photo?: string;
}

export interface Teacher {
  id: string;
  name: string;
  photo: string;
  designation: string;
  subject: string;
  introduction: string;
  role: string;
  contact: string;
  isInCharge: boolean;
}

export interface ClubMember {
  id: string;
  memberNumber: number;
  name: string;
  grade: string;
  section?: string;
  interestArea: string;
  joinedYear: string;
  badge?: string;
  photo?: string;
  bio?: string;
}

export interface ClubEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  organizingTeam: string;
  participatingGrades: string;
  purpose: string;
  description: string;
  schedule: string;
  guestSpeakers: string;
  teacherSupervisors: string;
  participantCount: string;
  outcomes: string;
  coverImage: string;
  photos: string[];
  documents: string[];
  status: 'draft' | 'published' | 'archived';
  achievements: string;
}

export interface Achievement {
  id: string;
  title: string;
  category: string;
  date: string;
  studentNames: string;
  competition: string;
  level: string;
  description: string;
  photo: string;
  relatedEvent: string;
  documentation: string;
  status: 'draft' | 'published';
  featured: boolean;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  coverImage: string;
  photos: GalleryPhoto[];
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  photographer: string;
}

export interface ShowcaseProject {
  id: string;
  title: string;
  studentName: string;
  classGrade: string;
  description: string;
  concepts: string;
  date: string;
  images: string[];
  references: string;
  status: 'submitted' | 'selected' | 'completed' | 'award-winning';
  category: string;
}

export interface Document {
  id: string;
  title: string;
  documentId: string;
  category: string;
  subcategory: string;
  description: string;
  date: string;
  fileUrl: string;
  fileType: string;
  author: string;
  status: 'draft' | 'published';
  academicYear: string;
}

export interface ClubData {
  welcomeMessage: string;
  presidentName: string;
  presidentPhoto: string;
  principals: Principal[];
  teachers: Teacher[];
  committee: CommitteeMember[];
  coordinators: Coordinator[];
  members: ClubMember[];
  events: ClubEvent[];
  achievements: Achievement[];
  gallery: GalleryAlbum[];
  showcase: ShowcaseProject[];
  documents: Document[];
  timelineMilestones: { id: string; date: string; title: string; description: string }[];
  aboutContent: {
    introduction: string;
    history: string;
    background: string;
    objectives: string;
    coreValues: string;
    mottoMeaning: string;
    membershipEligibility: string;
    membershipResponsibilities: string;
    mainActivities: string;
    schoolRelationship: string;
    futurePlans: string;
  };
  vision: string;
  mission: string;
  objectives: string[];
}

const DEFAULT_DATA: ClubData = {
  welcomeMessage: "Welcome to The Infinity Creators — the official MATH CLUB of KM/KM/ Al-Ashraq MMV (National School), Nintavur. Our club is dedicated to exploring the beauty and power of mathematics, developing logical minds, and inspiring the next generation of thinkers and innovators. We believe every student has the potential to discover the wonder of mathematics.",
  presidentName: '',
  presidentPhoto: '',
  principals: [
    {
      id: 'prin-1',
      name: 'Mr. A. Abdul Gafoor',
      designation: 'Principal',
      role: 'Patron of The Infinity Creators MATH CLUB',
      photo: '',
    },
    {
      id: 'prin-2',
      name: 'Mr. HMM. Anees',
      designation: 'Deputy Principal',
      role: 'Advisory Board & Academic Oversight',
      photo: '',
    },
    {
      id: 'prin-3',
      name: 'Mr. AAMM. Aslam Merza',
      designation: 'Deputy Principal',
      role: 'Advisory Board & Student Leadership',
      photo: '',
    },
    {
      id: 'prin-4',
      name: 'Mrs. IM. Inafa Nazhath',
      designation: 'Assistant Principal',
      role: 'Academic Advisory & Curriculum Support',
      photo: '',
    },
    {
      id: 'prin-5',
      name: 'Mr. MMM. Uvaiz',
      designation: 'Assistant Principal',
      role: 'Administrative Coordination & Student Mentorship',
      photo: '',
    },
  ],
  teachers: [
    {
      id: 't-01',
      name: 'Mr. MYM. Sathik',
      photo: '',
      designation: 'Math Club Incharge',
      subject: 'Mathematics',
      introduction: 'Guiding and mentoring the club, supervising academic and extracurricular initiatives, and nurturing mathematical curiosity across student grades.',
      role: 'Direct supervision, student guidance, and institutional academic mentorship.',
      contact: '',
      isInCharge: true,
    },
    {
      id: 't-02',
      name: 'Mrs. NM. Zilmy',
      photo: '',
      designation: 'Math Club Co-Incharge',
      subject: 'Mathematics',
      introduction: 'Coordinating club schedules, mentoring competitive mathematics preparations, and guiding student committee members.',
      role: 'Co-supervision, event planning, and student mentorship.',
      contact: '',
      isInCharge: true,
    },
    {
      id: 't-03',
      name: 'Mr. MI. Nawas',
      photo: '',
      designation: 'Maths Coordinator',
      subject: 'Mathematics',
      introduction: 'Coordinating mathematics curriculum alignment, seminar series, and analytical skill-building workshops.',
      role: 'Academic coordination and curriculum integration.',
      contact: '',
      isInCharge: false,
    },
    {
      id: 't-04',
      name: 'Mrs. SM. Saajitha Banu',
      photo: '',
      designation: 'Maths Teacher',
      subject: 'Mathematics',
      introduction: 'Faculty mentor supporting student engagement in mathematical problem solving and conceptual clarity.',
      role: 'Mathematics Faculty Mentor',
      contact: '',
      isInCharge: false,
    },
    {
      id: 't-05',
      name: 'Mr. AL. Farook',
      photo: '',
      designation: 'Maths Teacher',
      subject: 'Mathematics',
      introduction: 'Guiding students in algebraic problem-solving and rigorous mathematical reasoning.',
      role: 'Mathematics Faculty Mentor',
      contact: '',
      isInCharge: false,
    },
    {
      id: 't-06',
      name: 'Mrs. AK. Shihama',
      photo: '',
      designation: 'Maths Teacher',
      subject: 'Mathematics',
      introduction: 'Encouraging exploratory mathematics, peer problem solving, and secondary math foundation.',
      role: 'Mathematics Faculty Mentor',
      contact: '',
      isInCharge: false,
    },
    {
      id: 't-07',
      name: 'Mr. A. Wahesan',
      photo: '',
      designation: 'Maths Teacher',
      subject: 'Mathematics',
      introduction: 'Dedicated mathematics educator inspiring analytical thinking and competitive problem solving.',
      role: 'Mathematics Faculty Mentor',
      contact: '',
      isInCharge: false,
    },
    {
      id: 't-08',
      name: 'Mrs. SL. Fathima Rifna',
      photo: '',
      designation: 'Maths Teacher',
      subject: 'Mathematics',
      introduction: 'Supporting student mathematics circles, concept mastery, and academic Olympiad training.',
      role: 'Mathematics Faculty Mentor',
      contact: '',
      isInCharge: false,
    },
    {
      id: 't-09',
      name: 'Mr. IL. Isthihar',
      photo: '',
      designation: 'Maths Teacher',
      subject: 'Mathematics',
      introduction: 'Fostering passion for mathematical problem-solving, arithmetic reasoning, and geometry.',
      role: 'Mathematics Faculty Mentor',
      contact: '',
      isInCharge: false,
    },
    {
      id: 't-10',
      name: 'Mrs. P. Sarveswaran',
      photo: '',
      designation: 'Maths Teacher',
      subject: 'Mathematics',
      introduction: 'Guiding students through foundational and advanced mathematical concepts with enthusiasm.',
      role: 'Mathematics Faculty Mentor',
      contact: '',
      isInCharge: false,
    },
    {
      id: 't-11',
      name: 'Mr. ALM. Sameer',
      photo: '',
      designation: 'Maths Teacher',
      subject: 'Mathematics',
      introduction: 'Promoting logical deduction, mathematics exhibitions, and student interactive learning.',
      role: 'Mathematics Faculty Mentor',
      contact: '',
      isInCharge: false,
    },
  ],
  committee: [
    { id: 'pres', name: 'L. Mohamed Simam', position: 'President', classGrade: '12 Phy.Sci', bio: 'Leads the club operations, chairs general and executive assemblies, and represents the club in school and regional mathematics events.', responsibilities: 'Lead the club, chair meetings, represent the club at school events, coordinate all club activities, and ensure the club achieves its objectives.', term: '2026', photo: '', contact: '', order: 1 },
    { id: 'sec', name: 'MJ. Abdullah', position: 'Secretary', classGrade: '12 Phy.Sci', bio: 'Manages official club correspondence, agendas, minutes of meetings, and membership records.', responsibilities: 'Maintain records, handle correspondence, prepare meeting agendas and minutes, manage membership records, and coordinate communication.', term: '2026', photo: '', contact: '', order: 2 },
    { id: 'tres', name: 'M. Ahamed Zahin', position: 'Treasurer', classGrade: '12 Phy.Sci', bio: 'Manages financial records, budgets, and transparent reporting for all club events and projects.', responsibilities: 'Manage club finances, maintain financial records, prepare budgets, handle income and expenditure, and present financial reports.', term: '2026', photo: '', contact: '', order: 3 },
    { id: 'pro', name: 'AR. Bhazil Ahamed', position: 'P.R.O', classGrade: '12 Phy.Sci', bio: 'Directs public communication, student outreach, event promotions, and club community presence.', responsibilities: 'Manage public communications, social media presence, event promotions, photography, and maintain the club\'s public image.', term: '2026', photo: '', contact: '', order: 4 },
    { id: 'doc', name: 'S. Muhammathu Amal', position: 'Documentation Officer', classGrade: 'Grade 10', bio: 'Documents club activities, maintains digital archives, compiles reports, and preserves institutional knowledge.', responsibilities: 'Document all club activities, maintain the archive, prepare reports, manage the digital documentation system, and preserve institutional knowledge.', term: '2026', photo: '', contact: '', order: 5 },
  ],
  coordinators: [
    { id: 'coord-1', number: 1, name: 'L. Mohamed Simthy', photo: '', classGrade: 'Grade 10', portfolio: 'Coordinator', bio: 'Student coordinator managing academic workshops, problem-solving circles, and event coordination.', academicYear: '2026', contact: '' },
    { id: 'coord-2', number: 2, name: 'S. Affly Humaid', photo: '', classGrade: 'Grade 10', portfolio: 'Coordinator', bio: 'Student coordinator managing academic workshops, problem-solving circles, and event coordination.', academicYear: '2026', contact: '' },
    { id: 'coord-3', number: 3, name: 'MH. Mazin Abdullah', photo: '', classGrade: 'Grade 10', portfolio: 'Coordinator', bio: 'Student coordinator managing academic workshops, problem-solving circles, and event coordination.', academicYear: '2026', contact: '' },
    { id: 'coord-4', number: 4, name: 'JG. Abdullah Hani', photo: '', classGrade: 'Grade 10', portfolio: 'Coordinator', bio: 'Student coordinator managing academic workshops, problem-solving circles, and event coordination.', academicYear: '2026', contact: '' },
    { id: 'coord-5', number: 5, name: 'MZ. Yusri Aqar', photo: '', classGrade: 'Grade 10', portfolio: 'Coordinator', bio: 'Student coordinator managing academic workshops, problem-solving circles, and event coordination.', academicYear: '2026', contact: '' },
    { id: 'coord-6', number: 6, name: 'R. Kithursan', photo: '', classGrade: 'Grade 10', portfolio: 'Coordinator', bio: 'Student coordinator managing academic workshops, problem-solving circles, and event coordination.', academicYear: '2026', contact: '' },
    { id: 'coord-7', number: 7, name: 'AS. Aakif Ahmed', photo: '', classGrade: 'Grade 10', portfolio: 'Coordinator', bio: 'Student coordinator managing academic workshops, problem-solving circles, and event coordination.', academicYear: '2026', contact: '' },
  ],
  members: [
    {
      id: 'mem-01',
      memberNumber: 1,
      name: 'Mohamed Akeel',
      grade: 'Grade 12',
      section: 'Maths-A',
      interestArea: 'Pure Mathematics & Complex Numbers',
      joinedYear: '2026',
      badge: 'Senior Circle',
      bio: 'Enthusiastic about higher-level problem solving, limits, and algebraic structures. Active contributor in weekly mathematics discussions.',
    },
    {
      id: 'mem-02',
      memberNumber: 2,
      name: 'Fathima Nuha',
      grade: 'Grade 12',
      section: 'Maths-B',
      interestArea: 'Applied Mathematics & Mechanics',
      joinedYear: '2026',
      badge: 'Peer Tutor',
      bio: 'Specializes in real-world mathematical modeling and physics-linked mechanics problems. Enjoys mentoring junior members.',
    },
    {
      id: 'mem-03',
      memberNumber: 3,
      name: 'Ahmed Rayan',
      grade: 'Grade 11',
      section: 'A',
      interestArea: 'Euclidean Geometry & Circle Theorems',
      joinedYear: '2026',
      badge: 'Olympiad Circle',
      bio: 'Fascinated by synthetic geometry, geometric proofs, and preparing for national mathematical competitions.',
    },
    {
      id: 'mem-04',
      memberNumber: 4,
      name: 'Aisha Shifna',
      grade: 'Grade 11',
      section: 'B',
      interestArea: 'Algebra & Polynomial Functions',
      joinedYear: '2026',
      badge: 'Active Member',
      bio: 'Passionate about equations, series, and sequences. Regular participant in club seminar sessions.',
    },
    {
      id: 'mem-05',
      memberNumber: 5,
      name: 'Salman Faris',
      grade: 'Grade 10',
      section: 'A',
      interestArea: 'Number Theory & Prime Sequences',
      joinedYear: '2026',
      badge: 'Junior Circle Lead',
      bio: 'Explores modular arithmetic, prime distributions, and number puzzles. Eager to explore computational algorithms.',
    },
    {
      id: 'mem-06',
      memberNumber: 6,
      name: 'Zahra Minha',
      grade: 'Grade 10',
      section: 'B',
      interestArea: 'Combinatorics & Logic Puzzles',
      joinedYear: '2026',
      badge: 'Quiz Enthusiast',
      bio: 'Loves permutation problems, pigeonhole principle, and competitive quiz challenges within the school community.',
    },
    {
      id: 'mem-07',
      memberNumber: 7,
      name: 'Mohamed Sajid',
      grade: 'Grade 12',
      section: 'Maths-A',
      interestArea: 'Calculus & Mathematical Analysis',
      joinedYear: '2026',
      badge: 'Senior Circle',
      bio: 'Focuses on differential calculus, integration techniques, and graphical functions analysis.',
    },
    {
      id: 'mem-08',
      memberNumber: 8,
      name: 'Hafsa Rameez',
      grade: 'Grade 11',
      section: 'C',
      interestArea: 'Trigonometry & Spatial Visualization',
      joinedYear: '2026',
      badge: 'Active Member',
      bio: 'Interested in trigonometric identities, height and distance problems, and architectural geometry.',
    },
    {
      id: 'mem-09',
      memberNumber: 9,
      name: 'Umar Farooq',
      grade: 'Grade 9',
      section: 'A',
      interestArea: 'Coordinate Geometry & Linear Graphs',
      joinedYear: '2026',
      badge: 'Junior Circle',
      bio: 'Developing strong skills in 2D coordinate systems, gradient calculations, and algebraic graphing.',
    },
    {
      id: 'mem-10',
      memberNumber: 10,
      name: 'Maryam Safa',
      grade: 'Grade 9',
      section: 'B',
      interestArea: 'Probability & Statistical Reasoning',
      joinedYear: '2026',
      badge: 'Data Explorer',
      bio: 'Enjoys analyzing real data, probability experiments, and visual representation of statistical information.',
    },
    {
      id: 'mem-11',
      memberNumber: 11,
      name: 'Mohamed Afzal',
      grade: 'Grade 8',
      section: 'A',
      interestArea: 'Mental Arithmetic & Speed Math',
      joinedYear: '2026',
      badge: 'Young Thinker',
      bio: 'Practicing Vedic speed math and mental computation strategies to solve everyday arithmetic rapidly.',
    },
    {
      id: 'mem-12',
      memberNumber: 12,
      name: 'Asiya Hameed',
      grade: 'Grade 8',
      section: 'B',
      interestArea: 'Patterns, Sequences & Geometric Art',
      joinedYear: '2026',
      badge: 'Young Thinker',
      bio: 'Enjoys exploring tessellations, Fibonacci spirals in nature, and mathematical origami models.',
    },
  ],
  events: [
    {
      id: 'event-01',
      title: 'Math Club Introduction Seminar & Zonal Mathematics Debate',
      category: 'Seminar',
      date: '2026-10-11',
      time: '08:30 AM – 12:30 PM',
      venue: 'Al-Azhar Vidyalaya, Kalmunai',
      organizingTeam: 'Zonal Education Office, Kalmunai',
      participatingGrades: 'All 12 Committee Members & Teacher In-Charge',
      purpose: 'Equip newly appointed club leadership with comprehensive knowledge on club governance, planning engaging mathematical events, and developing competitive mathematical debate and problem-solving skills.',
      description: 'The Math Club Introduction Seminar was conducted by the Zonal Education Office Kalmunai on 11.10.2026 from 8:30 AM to 12:30 PM at Al-Azhar Vidyalaya, Kalmunai, featuring keynote speaker and resource person Mr. Nilaxan. All 12 committee members of The Infinity Creators MATH CLUB participated alongside our Teacher In-charge. Our delegation enthusiastically engaged across all interactive modules, mathematical games, and collaborative team challenges. A standout achievement was our participation in the Inter-School Mathematics Debate, where President L. Mohamed Simam, Secretary MJ. Abdullah, and Documentation Officer S. Muhammathu Amal represented our school on stage with exemplary poise and sharp logical arguments. The team gained essential insights into club leadership, event curation, and fostering mathematical curiosity across the student body.',
      schedule: '08:30 AM – Registration & Inauguration\n09:00 AM – Keynote Address by Speaker Nilaxan: "Running a Dynamic & Impactful Math Club"\n10:15 AM – Interactive Mathematical Games & Speed Problem-Solving Challenges\n11:15 AM – Inter-School Mathematics Debate Competition (Debaters: L. Mohamed Simam, MJ. Abdullah, S. Muhammathu Amal)\n12:15 PM – Knowledge Synthesis, Group Photo & Closing Remarks',
      guestSpeakers: 'Mr. Nilaxan (Keynote Speaker & Resource Person, Zonal Education Office Kalmunai)',
      teacherSupervisors: 'Mr. MYM. Sathik (Math Club In-charge)',
      participantCount: '12 Committee Members + Teacher In-charge',
      outcomes: 'Mastered club administrative guidelines, acquired hands-on experience in mathematical competition design, and represented the school successfully in the zonal mathematics debate.',
      coverImage: '/images/events/seminar-group-photo.jpg',
      photos: [
        '/images/events/seminar-cover-debate.jpg',
        '/images/events/seminar-group-photo.jpg',
        '/images/events/seminar-session-table.jpg',
      ],
      documents: [],
      status: 'published',
      achievements: 'High commendation from the Zonal Education Office for our team\'s active debate performance and leadership engagement.',
    },
    {
      id: 'event-02',
      title: 'Math Club Internal Meeting — 80th Anniversary Exhibition Coordination',
      category: 'Meeting',
      date: '2026-10-14',
      time: '10:30 AM – 11:00 AM',
      venue: 'Mathematics Laboratory, Mahindodaya Block',
      organizingTeam: 'The Infinity Creators MATH CLUB Committee',
      participatingGrades: 'Committee Members, Coordinators & Teacher Faculty',
      purpose: 'To discuss and coordinate invitations for the exhibition organised as part of the school\'s 80th Anniversary Celebration.',
      description: 'The Math Club held a formal internal meeting on Wednesday, 14 October 2026 from 10:30 AM to 11:00 AM in the Mathematics Laboratory, Mahindodaya Block. The meeting commenced with the recitation of the Holy Qur\'an, followed by an address by Mrs. NM. Zilmy (Co-Incharge) regarding the Math Club. Mr. MI. Nawas (Maths Coordinator) addressed the students and extended an invitation to participate in the school\'s 80th Anniversary Exhibition through the Math Club. President L. Mohamed Simam delivered a presentation introducing the Math Club and its vision and objectives. Secretary MJ. Abdullah delivered a motivational speech on stage fear and discussed ways to overcome it, encouraging members to develop their confidence and public-speaking skills. Mrs. SM. Saajitha Banu presented ideas for the development and activities of the Math Club, with club members sharing their own suggestions for the successful organisation of the exhibition. Coordinators were appointed to assist in organising the exhibition — 7 coordinators from Grade 10 and 2 from Grade 12 Physical Science for the Boys section, and 7 from Grade 12 Physical Science for the Girls section (16 total). The meeting concluded with Salawath.',
      schedule: '10:30 AM – Commencement with recitation of the Holy Qur\'an\n10:35 AM – Address by Mrs. NM. Zilmy (Co-Incharge) on Math Club\n10:40 AM – Mr. MI. Nawas invites participation in the 80th Anniversary Exhibition\n10:45 AM – President L. Mohamed Simam presents the Math Club vision & objectives\n10:50 AM – Secretary MJ. Abdullah delivers motivational speech on overcoming stage fear\n10:55 AM – Mrs. SM. Saajitha Banu shares development ideas; members present suggestions\n10:58 AM – Appointment of 16 Exhibition Coordinators (Boys & Girls sections)\n11:00 AM – Vote of Thanks by MJ. Abdullah; conclusion with Salawath',
      guestSpeakers: 'None (Internal meeting)',
      teacherSupervisors: 'Mrs. NM. Zilmy (Co-Incharge), Mr. MI. Nawas (Maths Coordinator), Mrs. SM. Saajitha Banu (Maths Teacher)',
      participantCount: 'Committee Members, Coordinators & Teacher Faculty',
      outcomes: 'Exhibition coordinators appointed (16 total). Members equipped with roles and responsibilities for the 80th Anniversary Exhibition. Club vision presented. Motivational insight shared on overcoming stage fear.',
      coverImage: '/images/events/meeting-oct14-img3.jpg',
      photos: [
        '/images/events/meeting-oct14-img1.jpg',
        '/images/events/meeting-oct14-img2.jpg',
        '/images/events/meeting-oct14-img3.jpg',
        '/images/events/meeting-oct14-img4.jpg',
        '/images/events/meeting-oct14-img5.jpg',
      ],
      documents: [],
      status: 'published',
      achievements: '',
    },
  ],
  achievements: [
    {
      id: 'ach-01',
      title: 'Inter-School Mathematics Debate — High Commendation Award',
      category: 'Mathematics Competition',
      date: '2026-10-11',
      studentNames: 'L. Mohamed Simam (President), MJ. Abdullah (Secretary), S. Muhammathu Amal (Doc. Officer)',
      competition: 'Zonal Education Office Kalmunai Inter-School Math Seminar & Debate',
      level: 'Zonal',
      description: 'The Infinity Creators debate delegation achieved prestigious high commendation from the Zonal Education Office Kalmunai for exemplary logical presentation, analytical agility, and structured mathematical debate on stage.',
      photo: '/images/events/seminar-cover-debate.jpg',
      relatedEvent: 'event-01',
      documentation: '',
      status: 'published',
      featured: true,
    },
    {
      id: 'ach-02',
      title: 'Official Charter & Club Establishment Milestone',
      category: 'Other',
      date: '2026',
      studentNames: 'All 12 Executive Committee Members & Student Coordinators',
      competition: 'School Mathematical Advancement Charter — KM/KM/ Al-Ashraq MMV',
      level: 'School',
      description: 'The Infinity Creators MATH CLUB was officially chartered and inaugurated under the leadership of Principal Mr. A. Abdul Gafoor and Teacher In-Charge Mr. MYM. Sathik, mobilizing over 150 student members.',
      photo: '/images/events/seminar-group-photo.jpg',
      relatedEvent: '',
      documentation: '',
      status: 'published',
      featured: true,
    },
  ],
  gallery: [
    {
      id: 'album-01',
      title: 'Math Club Introduction Seminar & Debate — Zonal Education Office Kalmunai',
      category: 'Workshops and seminars',
      date: '2026-10-11',
      description: 'Official photographic archive of The Infinity Creators at the Math Club Introduction Seminar held on 11.10.2026 at Al-Azhar Vidyalaya, Kalmunai. Featuring our full 12-member committee delegation, teacher in-charge, workshop games, and the inter-school mathematics debate on stage.',
      coverImage: '/images/events/seminar-group-photo.jpg',
      photos: [
        {
          id: 'photo-01',
          url: '/images/events/seminar-cover-debate.jpg',
          caption: 'Inter-School Mathematics Debate on Stage — President L. Mohamed Simam, Secretary MJ. Abdullah, and Documentation Officer S. Muhammathu Amal representing The Infinity Creators.',
          photographer: 'Event Media Team',
        },
        {
          id: 'photo-02',
          url: '/images/events/seminar-group-photo.jpg',
          caption: 'Official Delegation Group Photo — All 12 Committee Members with Teacher In-charge at Al-Azhar Vidyalaya, Kalmunai.',
          photographer: 'Zonal Education Office Kalmunai',
        },
        {
          id: 'photo-03',
          url: '/images/events/seminar-session-table.jpg',
          caption: 'Collaborative Problem Solving & Interactive Math Games — Committee members engaged in team problem-solving challenges.',
          photographer: 'Documentation Officer',
        },
      ],
    },
    {
      id: 'album-02',
      title: 'Math Club Internal Meeting — 80th Anniversary Exhibition Coordination (14 Oct 2026)',
      category: 'Meetings',
      date: '2026-10-14',
      description: 'Official photographic record of the Math Club meeting held on Wednesday, 14 October 2026 at the Mathematics Laboratory, Mahindodaya Block. The meeting covered exhibition coordination for the school\'s 80th Anniversary, vision presentation by President L. Mohamed Simam, a motivational address by Secretary MJ. Abdullah, and the appointment of 16 exhibition coordinators.',
      coverImage: '/images/events/meeting-oct14-img3.jpg',
      photos: [
        {
          id: 'mtg-photo-01',
          url: '/images/events/meeting-oct14-img1.jpg',
          caption: 'Secretary MJ. Abdullah addressing the committee members during the Math Club meeting — Mathematics Laboratory.',
          photographer: 'Club Documentation Team',
        },
        {
          id: 'mtg-photo-02',
          url: '/images/events/meeting-oct14-img2.jpg',
          caption: 'Mr. MI. Nawas (Maths Coordinator) presenting the 80th Anniversary Exhibition invitation to the committee — four-panel view of the session.',
          photographer: 'Club Documentation Team',
        },
        {
          id: 'mtg-photo-03',
          url: '/images/events/meeting-oct14-img3.jpg',
          caption: 'Mr. MI. Nawas addressing the full assembly of male and female committee members in the Mathematics Laboratory.',
          photographer: 'Club Documentation Team',
        },
        {
          id: 'mtg-photo-04',
          url: '/images/events/meeting-oct14-img4.jpg',
          caption: 'President L. Mohamed Simam presenting the Math Club vision and objectives to the committee and teacher faculty.',
          photographer: 'Club Documentation Team',
        },
        {
          id: 'mtg-photo-05',
          url: '/images/events/meeting-oct14-img5.jpg',
          caption: 'Committee members attentively engaged during the Math Club meeting session — Mathematics Laboratory, Mahindodaya Block.',
          photographer: 'Club Documentation Team',
        },
      ],
    },
  ],
  showcase: [],
  documents: [],
  timelineMilestones: [
    { id: 'ms-1', date: '2026', title: 'Club Established', description: 'The Infinity Creators MATH CLUB was officially established at KM/KM/ Al-Ashraq MMV (National School), Nintavur.' },
    { id: 'ms-2', date: '11.10.2026', title: 'Zonal Math Club Seminar & Debate Participation', description: 'All 12 committee members and in-charge teacher represented the club at Al-Azhar Vidyalaya Kalmunai, excelling in the math debate and acquiring operational leadership training.' },
    { id: 'ms-3', date: '14.10.2026', title: 'Internal Meeting — 80th Anniversary Exhibition Coordination', description: 'Formal club meeting held in the Mathematics Laboratory to coordinate the school\'s 80th Anniversary Exhibition. 16 exhibition coordinators appointed. Vision presented by President, motivational address by Secretary.' },
  ],
  aboutContent: {
    introduction: 'The Infinity Creators is the official MATH CLUB of KM/KM/ Al-Ashraq MMV (National School), Nintavur. Established in 2026, our club brings together students who share a passion for mathematics, logic, and creative problem-solving.',
    history: 'Founded in 2026, The Infinity Creators was established with the vision of creating a vibrant mathematical community within the school. The club was formed to provide students with opportunities to explore mathematics beyond the regular curriculum.',
    background: 'Mathematics is the foundation of all scientific and technological advancement. Recognizing the need for a dedicated platform for mathematics enthusiasts, the school established this club to nurture mathematical talent and curiosity.',
    objectives: 'Our club aims to develop logical reasoning, encourage mathematical creativity, improve problem-solving skills, organize competitions and workshops, and build a sustainable mathematics community within the school.',
    coreValues: 'Curiosity, Integrity, Collaboration, Creativity, Excellence, Perseverance',
    mottoMeaning: '"Think. Explore. Solve. Create." — This motto captures the essence of mathematical inquiry. We begin by thinking critically, explore new concepts and ideas, solve challenging problems with determination, and create innovative solutions that inspire others.',
    membershipEligibility: 'All students of KM/KM/ Al-Ashraq MMV (National School) are welcome to join The Infinity Creators. We believe every student can benefit from mathematical exploration, regardless of their current academic level.',
    membershipResponsibilities: 'Members are expected to attend regular meetings, participate actively in club events, maintain good academic standing, support fellow members, and contribute to the club\'s growth and development.',
    mainActivities: 'Our club organizes mathematics competitions, quizzes, workshops, seminars, exhibitions, peer-learning sessions, problem-solving challenges, and community outreach activities.',
    schoolRelationship: 'The Infinity Creators operates under the guidance of the school administration and the Teacher-in-Charge. The club follows school rules and contributes to the school\'s academic and extracurricular environment.',
    futurePlans: 'We aim to expand our activities, participate in regional and national mathematics events, develop digital learning resources, create inter-school mathematics networks, and establish a tradition of mathematical excellence at our school.',
  },
  vision: 'To cultivate a generation of confident mathematical thinkers who use logic, creativity, and innovation to contribute positively to society.',
  mission: 'To promote mathematical curiosity, strengthen problem-solving skills, encourage collaborative learning, and create opportunities for students to explore mathematics beyond the classroom.',
  objectives: [
    'Develop logical reasoning and analytical thinking.',
    'Encourage mathematical creativity and exploration.',
    'Improve problem-solving and critical-thinking skills.',
    'Organize mathematics competitions, quizzes, exhibitions, and workshops.',
    'Connect mathematics with science, engineering, technology, and everyday life.',
    'Encourage peer learning, teamwork, and academic leadership.',
    'Identify and support students with an interest in mathematics.',
    'Document club activities and preserve institutional knowledge.',
    'Encourage participation in school, regional, national, and international mathematics events where appropriate.',
    'Build a sustainable mathematics community within the school.',
  ],
};

const STORAGE_KEY = 'infinity-creators-data';

export function loadData(): ClubData {
  if (typeof window === 'undefined') return DEFAULT_DATA;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...DEFAULT_DATA,
        ...parsed,
        principals: (parsed.principals && parsed.principals.length >= 5) ? parsed.principals : DEFAULT_DATA.principals,
        teachers: (parsed.teachers && parsed.teachers.length >= 11 && parsed.teachers[0].name === DEFAULT_DATA.teachers[0].name) ? parsed.teachers : DEFAULT_DATA.teachers,
        committee: (parsed.committee && parsed.committee.length >= 5 && parsed.committee[1]?.name === DEFAULT_DATA.committee[1].name) ? parsed.committee : DEFAULT_DATA.committee,
        coordinators: (parsed.coordinators && parsed.coordinators.length >= 7 && parsed.coordinators[0].name === DEFAULT_DATA.coordinators[0].name) ? parsed.coordinators : DEFAULT_DATA.coordinators,
        members: (parsed.members && parsed.members.length > 0) ? parsed.members : DEFAULT_DATA.members,
        events: (parsed.events && parsed.events.length >= 2 && parsed.events[0]?.coverImage === DEFAULT_DATA.events[0]?.coverImage && parsed.events[1]?.coverImage === DEFAULT_DATA.events[1]?.coverImage) ? parsed.events : DEFAULT_DATA.events,
        achievements: (parsed.achievements && parsed.achievements.length > 0 && parsed.achievements[0]?.title) ? parsed.achievements : DEFAULT_DATA.achievements,
        gallery: (parsed.gallery && parsed.gallery.length >= 2 && parsed.gallery[0]?.coverImage === DEFAULT_DATA.gallery[0]?.coverImage && parsed.gallery[1]?.coverImage === DEFAULT_DATA.gallery[1]?.coverImage) ? parsed.gallery : DEFAULT_DATA.gallery,
        timelineMilestones: (parsed.timelineMilestones && parsed.timelineMilestones.length >= 3) ? parsed.timelineMilestones : DEFAULT_DATA.timelineMilestones,
      };
    }
  } catch {
    console.error('Error loading data');
  }
  return DEFAULT_DATA;
}

export function saveData(data: ClubData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    console.error('Error saving data');
  }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
