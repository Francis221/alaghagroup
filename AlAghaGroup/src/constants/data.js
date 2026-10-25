/* ═══════════════════════════════════════════════════════════════════════════
   AL AGHA GROUP — GLOBAL CONSTANT DATA
   All corporate identity, contact records, media config, and portfolio data.
═══════════════════════════════════════════════════════════════════════════ */

import {
  projDubaiCreek,
  projTownSquare,
  projBeach,
  projCity,
  chairmanPhoto,
  projectsDirectorPhoto,
  technicalManagerPhoto,
  hrManagerPhoto,
  projectManagerPhoto,
  hrOfficerPhoto,
  proManagerPhoto,
  proposalManagerPhoto,
  accountingManagerPhoto,
  accountantPhoto,
  seniorPurchasingOfficerPhoto,
  proPhoto,
  qsPhoto1,
  qsPhoto2,
  qsPhoto3,
  qsPhoto4,
  qsPhoto5,
  technicalEngineerPhoto,
  architectureDesignerPhoto,
  mepPhoto,
  electricalEngineerPhoto,
  mechanicalEngineerPhoto,
  siteEngineerPhoto1,
  siteEngineerPhoto2,
  siteEngineerPhoto3,
  secretaryPhoto,
  architecturalDraftsman,
  PurchaseOfficer,
  MechanicalProjectEngineer,
  QsEngineer,
  clientEmaar,
  clientDamac,
  clientDubaiProperties,
  clientEmirates,
  clientFrenchBakery,
  clientDubaiMunicipality,
  clientAurora,
  clientAbanos,
  clientNaffco,
  clientIdama,
  clientHorton,
  clientJcMaclean,
  clientNexus,
  clientFamHolding,
  clientBinHam,
  clientDubaiInvestments,
  clientDib,
  clientMbrHousing,
  consultantAlShandagha,
  consultantRenders,
  consultantAecom,
  consultantSaffarini,
  consultantShadid,
  consultantAlGurg,
  consultantKmc,
  consultantRmjm,
  consultantSsh,
  consultantNeb,
  contractorDubaiProperties,
  contractorBhcUae,
  contractorEcc,
  contractorDubaiCivilEng,
  contractorReemCapital,
  contractorArchgroup,
  contractorUnec,
  contractorLacasa,
  contractorA2z,
  contractorMbrHousing,
  contractorAbdulRahim,
  contractorBhg,
  contractorCscec,
  contractorDewan,
  contractorEngConsortium,
  contractorConin,
  contractorCityEngineering,
  contractorExpo2020,
  contractorTav,
  contractorAlTurath,
  cert1,
  cert2,
  cert3,
  cert4,
  cert5,
  cert6,
} from "./images";

/* ─── HERO BACKGROUND VIDEO URL ─── */
export const HERO_VIDEO = "https://res.cloudinary.com/iwfmnnaa/video/upload/v1784889132/0709_2_cfolje.mp4";
export const heroVideo = HERO_VIDEO;

/* ─── EMAILJS CONFIG ─── */
export const EMAILJS_SERVICE_ID = "service_8ezhvn9";
export const EMAILJS_TEMPLATE_ID = "template_e7zjtkk";
export const EMAILJS_PUBLIC_KEY = "KccrSYU3an3UhnK3F";
export const EMAILJS_CONFIG = {
  serviceId: EMAILJS_SERVICE_ID,
  templateId: EMAILJS_TEMPLATE_ID,
  publicKey: EMAILJS_PUBLIC_KEY
};

/* ─── NAVIGATION MENU ─── */
export const NAV = ["Home", "About", "Services", "Projects", "Clients", "Career", "Team"];

/* ─── COMPANY & CONTACT INFO ─── */
export const COMPANY_INFO = {
  name: "Al Agha Group",
  subtitle: "of Companies",
  address: "P.O. Box 92837, Dubai, United Arab Emirates",
  phone: "+971 4 294 7799",
  fax: "+971 4 294 7788",
  email: "info@alaghagroup.com",
  socials: {
    facebook: "https://www.facebook.com/alaghadubai",
    instagram: "https://www.instagram.com/alaghagroup/",
    whatsapp: "https://wa.me/971501234567",
    linkedin: "https://www.linkedin.com/company/al-agha-group/"
  }
};

/* ─── PROJECT SHOWREEL VIDEOS ─── */
export const PROJECT_VIDEOS = [
  {
    url: "https://res.cloudinary.com/iwfmnnaa/video/upload/v1784888978/SaveClip.App_AQMSBO34EVPtGXUGT4ggLnU0KArrQP7Lcg5hK5xmdIx1IhR5UWf0gXNfchLrmSLsaMu-aYzvaPLe9LOPpMiLeTcn_oydulj.mp4",
    title: "Gypsum False Ceiling Showreel",
    subtitle: "An immersive showcase of our precision false ceiling installation, custom bulkheads, and artistic gypsum designs across luxury commercial and residential spaces.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJWK-WZLosYT6yzhvBRlmNkrDNwGhrgMbICWOPzjWBoiME6kcjb1wz7sNO&s=10",
  },
  {
    url: "https://res.cloudinary.com/iwfmnnaa/video/upload/v1784889041/AQPdBg_r3OSVfwkk62s6qKACcep1N7Crt75RzOC72vo7O5-GXlepb5G5rYpWVPeSL-h9AzHqXGISNqDSRR02YxXET3f2gpCPaltauQSBFg_rfbxsl.mp4",
    title: "Complete Fit-Out & MEP Integration",
    subtitle: "A detailed look at our turnkey interior fit-out services, premium paint finishes, and MEP (Mechanical, Electrical, Plumbing) engineering excellence.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFOSsBiT6sVCYZ_qvZT848l8sPV0EQEu_u_fgF8BIlLoPc-W_BgGzT_j4&s=10",
  },
  {
    url: "https://res.cloudinary.com/iwfmnnaa/video/upload/v1784888965/SaveClip.App_AQM2ljy9dnv4rHa4ziL-fTp2ie73pCPWciznOqUb4VD0gq7ALB_gzENdc-1Evm7TmXhX_EVHe_HUY3Ch37PVNHpfVy9Ucyw59gEKNnc_xavse7.mp4",
    title: "False Ceiling & Partition Works",
    subtitle: "Foundation to façade — a timelapse walkthrough of our civil works teams delivering structural milestones on schedule.",
    poster: "https://cf.bstatic.com/xdata/images/hotel/max500/388733598.jpg?k=ca7b3ae0ceb82bd519181824f6781955388831ad835ecae80c9a233409ea5357&o=&hp=1",
  },
  {
    url: "https://res.cloudinary.com/iwfmnnaa/video/upload/v1784888937/SaveClip.App_AQNWNlW712xc0lbwvlkqOrSZOCRlshPeOaJ-GdBafCFArxd5orBjim8dK8ulWVQyNqmSQMt454YF-jnxwHgnKdoLOTzhD39vqR6eR_Q_axb9mk.mp4",
    title: "Site Safety & Quality Control",
    subtitle: "Behind the scenes of our ISO-certified safety protocols and on-site quality inspections across active project sites.",
    poster: projTownSquare,
  },
];

/* ─── SERVICES (HOME SUMMARY) ─── */
export const ALL_SERVICES = [
  { icon: "🏛️", title: "GYPSUM FALSE CEILING", desc: "We are offering services for Gypsum false ceiling works such as, regular false ceiling works (Wet and Dry Areas), partitions, bulkheads, 60 x 60 cm false ceiling tiles, Suspended ceiling works that are lightweight, sound insulated, fire resistance, soft and thermally insulated. We are experienced in the field of False Ceiling and we are focused on achieving professional goals and customer's satisfactions." },
  { icon: "✨", title: "GRC & GRG DECORATIVE", desc: "We are offering GRC & GRG Decorative Works for Villas, Mosque, Buildings, etc. That used for interior and exterior decorations such as GRG ceiling panels, GRG walls, GRG domes, GRC Moldings, GRC Decorative Panels, GRC Decorative Column etc. Based on our Main Contractor / client's approved layouts, designs and elevations details." },
  { icon: "🧱", title: "CLADDING & PARTITION", desc: "We are offering Cladding & Partition Gypsum Works for Villas, Mosque, Buildings, etc. That used for interior and exterior decorations such as gypsum dry wall, GRG ceiling panels, GRG walls, GRG domes, GRC Moldings, GRC Decorative Panels, GRC Decorative Column etc. Based on our Main Contractor / client's approved layouts, designs and elevation details." },
  { icon: "🏠", title: "INTERIOR WORKS", desc: "We offer Innovative and creative designs for Interior Works according to client needs and satisfactions. We also provide an exceptional service at every level of the project including overall project management of your interior design changes and a very strong attention to details." },
  { icon: "🎨", title: "PAINT WORKS", desc: "We are providing all kinds of decorative and standard paint works such as base coats; primer, first coat, Finish Coat; flat, eggshell, gloss and satin, Water-based and solvent-based paints, Specialty paints; bath room or kitchen paints, floor paint, metal paint, traditional paints, Painting a room; woodwork, walls and ceilings, floors." },
];

/* ─── PROJECTS (HOME SUMMARY) ─── */
export const ALL_PROJECTS = [
  { img: projDubaiCreek, title: "Dubai Creek Harbour Bridge District" },
  { img: "https://images.adsttc.com/media/images/6203/2036/44ba/f701/6571/b72a/newsletter/20211023-dubaj-pavilon-3048.jpg?1644372080", title: "Hungary Pavilion — Expo 2020 Dubai" },
  { img: projTownSquare, title: "Town Square — UNA Apartments" },
  { img: projBeach, title: "EMAAR Beachfront — Sunrise Bay" },
  { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSFZZT3CgKdgN7u9ED9gMukTeHo5BwWy1impTUjqGi_g&s=10", title: "Al Fatan Tower" },
  { img: projCity, title: "Park Ridge" },
];

/* ─── STATS ─── */
export const STATS = [
  { val: "2008", label: "ESTABLISHED" },
  { val: "800+", label: "EMPLOYEES" },
  { val: "100+", label: "MAJOR PROJECTS" },
  { val: "18+", label: "YEARS EXCELLENCE" },
];

/* ─── CERTIFICATIONS ─── */
export const CERTIFICATIONS = [
  { name: "ISO 9001:2015", desc: "Quality Management", image: cert1 },
  { name: "ISO 14001:2015", desc: "Environmental Mgmt", image: cert2 },
  { name: "ISO 45001-2018", desc: "Occupational Safety", image: cert3 },
  { name: "ISO 9001:2015", desc: "Quality Assurance", image: cert4 },
  { name: "ISO 14001:2015", desc: "Business Excellence", image: cert5 },
  { name: "ISO 45001-2018", desc: "Best Practices", image: cert6 },
];

/* ─── HERO SLIDER IMAGES ─── */
export const SLIDER_IMAGES = [
  { url: "https://cloud.famproperties.com/project/large/mulberry-at-park-heights-342681-124728.jpg", caption: "Mulberry at Park Heights — Dubai Hills", year: "2024", cat: "Residential" },
  { url: "https://www.299.com/images/858872grand-bleu-tower-hero.jpg", caption: "Grand Bleu Tower — Dubai Marina", year: "2024", cat: "Commercial" },
  { url: "https://images.adsttc.com/media/images/6203/2036/44ba/f701/6571/b72a/newsletter/20211023-dubaj-pavilon-3048.jpg?1644372080", caption: "Hungary Pavilion — Expo 2020 Dubai", year: "2021", cat: "Exhibition" },
];

/* ─── CLIENTS, CONSULTANTS & CONTRACTORS DATA ─── */
export const CLIENTS_DATA = {
  clients: [
    { name: "EMAAR Properties", src: clientEmaar },
    { name: "DAMAC Development", src: clientDamac },
    { name: "Dubai Properties", src: clientDubaiProperties },
    { name: "Emirates Airlines", src: clientEmirates },
    { name: "French Bakery", src: clientFrenchBakery },
    { name: "Dubai Municipality", src: clientDubaiMunicipality },
    { name: "Aurora Real Estate", src: clientAurora },
    { name: "Abanos Interior Fit-Out & Joinery", src: clientAbanos },
    { name: "NAFFCO", src: clientNaffco },
    { name: "IDAMA Facilities Management Solutions", src: clientIdama },
    { name: "Horton Tech Interiors", src: clientHorton },
    { name: "JC MACLEAN", src: clientJcMaclean },
    { name: "Nexus Intelligence", src: clientNexus },
    { name: "FAM HOLDING", src: clientFamHolding },
    { name: "Bin Ham Group", src: clientBinHam },
    { name: "Dubai Investments Real Estate", src: clientDubaiInvestments },
    { name: "Dubai Islamic Bank", src: clientDib },
    { name: "Mohammed Bin Rashid Housing Est.", src: clientMbrHousing },
  ],
  consultants: [
    { name: "AL SHANDAGHA MUSEUM", src: consultantAlShandagha },
    { name: "Renders Engineering Consultants", src: consultantRenders },
    { name: "AECOM", src: consultantAecom },
    { name: "Eng. Adnan Saffarini Office", src: consultantSaffarini },
    { name: "Shadid Engineering Consultants", src: consultantShadid },
    { name: "Al Gurg Consultants", src: consultantAlGurg },
    { name: "KMC Management Consultants", src: consultantKmc },
    { name: "RMJM", src: consultantRmjm },
    { name: "SSH", src: consultantSsh },
    { name: "NEB", src: consultantNeb },
  ],
  contractors: [
    { name: "Dubai Properties", src: contractorDubaiProperties },
    { name: "BHC UAE National Company", src: contractorBhcUae },
    { name: "ECC", src: contractorEcc },
    { name: "Dubai Civil Engineering", src: contractorDubaiCivilEng },
    { name: "Reem Capital Contracting LLC", src: contractorReemCapital },
    { name: "ARCHGROUP", src: contractorArchgroup },
    { name: "UNEC United Engineering Construction", src: contractorUnec },
    { name: "LACASA Architects & Engineering Consultants", src: contractorLacasa },
    { name: "A2Z Architectural Engineering Consultancies", src: contractorA2z },
    { name: "Mohammed Bin Rashid Housing Est.", src: contractorMbrHousing },
    { name: "ABDUL RAHIM ARCHITECTURE CONSULTANTS", src: contractorAbdulRahim },
    { name: "BHG", src: contractorBhg },
    { name: "CSCEC", src: contractorCscec },
    { name: "Dewan Architects + Engineers", src: contractorDewan },
    { name: "ENGINEERING CONSORTIUM", src: contractorEngConsortium },
    { name: "CONIN INCORPORATED CONSULTANT", src: contractorConin },
    { name: "CITY ENGINEERING", src: contractorCityEngineering },
    { name: "EXPO 2020 DUBAI UAE", src: contractorExpo2020 },
    { name: "TAV CONSTRUCTION", src: contractorTav },
    { name: "AL TURATH AL ASEEL CONTRACTING LLC", src: contractorAlTurath },
  ],
};

/* ─── CAREERS ─── */
export const CAREERS = [
  { role: "Purchase Officer", loc: "Dubai, UAE", type: "Full-time", dept: "Purchase" },
  { role: "Accountant", loc: "Dubai, UAE", type: "Full-time", dept: "Account" },
  { role: "Safety Officer", loc: "Dubai, UAE", type: "Full-time", dept: "Safety" },
  { role: "QS Engineer", loc: "Dubai, UAE", type: "Contract", dept: "Engineering" },
];

/* ─── CHAIRMAN MESSAGE ─── */
export const CHAIRMAN_MESSAGE = {
  name: "Abdul Karim Ali Agha",
  role: "Chairman",
  message: "When you care about your team, show them love and treat them as your own family; they will never let you down and will always give their best. This is the secret of our success.",
  photo: chairmanPhoto,
};

/* ─── LEADERSHIP ─── */
export const LEADERSHIP = [
  { name: "Abdul Karim Ali Agha", role: "Managing Director", note: "Founder & Group Chairman", photo: chairmanPhoto },
  { name: "Khalid Ali Agha", role: "Projects Director", note: "Strategic Operations Lead", photo: projectsDirectorPhoto },
];

/* ─── MANAGEMENT ─── */
export const MANAGEMENT = [
  { name: "Abdulhamid AlAbrch", role: "Technical Manager", dept: "Engineering", photo: technicalManagerPhoto },
  { name: "Irashad Ahmad Islam", role: "HR Manager", dept: "Human Resources", photo: hrManagerPhoto },
  { name: "Sayedur Rahman", role: "Project Manager", dept: "Operations", photo: projectManagerPhoto },
  { name: "Hesham Abouzeid", role: "HR Officer", dept: "Human Resources", photo: hrOfficerPhoto },
  { name: "M Taha Ali Agha", role: "P.R.O. Manager", dept: "Administration", photo: proManagerPhoto },
  { name: "Omar Ibrahim", role: "Accounting Manager", dept: "Finance", photo: accountingManagerPhoto },
];

/* ─── ENGINEERS ─── */
export const ENGINEERS = [
  { name: "Olga Regala", role: "Proposal & Estimating Engineer", dept: "Commercial", photo: proposalManagerPhoto },
  { name: "Abdulkader Mouine", role: "Accountant", dept: "Finance", photo: accountantPhoto },
  { name: "Fayaz Hyder Ali", role: "Senior Purchasing Officer", dept: "Procurement", photo: seniorPurchasingOfficerPhoto },
  { name: "Nour Al Hayek", role: "P.R.O.", dept: "Administration", photo: proPhoto },
  { name: "Jannath TP", role: "QS Engineer", dept: "Quantity Surveying", photo: qsPhoto1 },
  { name: "Vishnupriya Mohan", role: "QS Engineer", dept: "Quantity Surveying", photo: qsPhoto2 },
  { name: "Waseem Arumanichola", role: "QS Engineer", dept: "Quantity Surveying", photo: qsPhoto3 },
  { name: "Aneesa Noushad", role: "Senior QS Engineer", dept: "Quantity Surveying", photo: qsPhoto4 },
  { name: "Mohamed Sana", role: "QS Engineer", dept: "Quantity Surveying", photo: qsPhoto5 },
  { name: "Shanoob Rasheed", role: "Senior Technical Engineer", dept: "Engineering", photo: technicalEngineerPhoto },
  { name: "Muhammed Irfan", role: "Architectural Designer", dept: "Design", photo: architectureDesignerPhoto },
  { name: "Sumon Mondal", role: "Site Engineer", dept: "MEP", photo: mepPhoto },
  { name: "Shahzad Ahmad", role: "Electrical Engineer", dept: "MEP", photo: electricalEngineerPhoto },
  { name: "Sathish Jayaraman", role: "Mechanical Engineer", dept: "MEP", photo: mechanicalEngineerPhoto },
  { name: "Mohamed Javeed", role: "Project Site Engineer", dept: "Operations", photo: siteEngineerPhoto1 },
  { name: "Muhammed Suhair", role: "Project Site Engineer", dept: "Operations", photo: siteEngineerPhoto2 },
  { name: "Mohammed Firoz R.", role: "Project Site Engineer", dept: "Operations", photo: siteEngineerPhoto3 },
  { name: "Camille De Guzman", role: "Secretary", dept: "Operations", photo: secretaryPhoto },
  { name: "Thaha Muzzamil", role: "Architectural Draftsman", dept: "Operations", photo: architecturalDraftsman },
  { name: "Arshiya Tabassum", role: "Purchase Officer", dept: "Operations", photo: PurchaseOfficer },
  { name: "Abdullah Othman", role: "Mechanical Project Engineer", dept: "Operations", photo: MechanicalProjectEngineer },
  { name: "Sreelekshmi Prasanan", role: "QS Engineer", dept: "Operations", photo: QsEngineer },
];

/* ─── GROUP COMPANIES ─── */
export const GROUP_COMPANIES = [
  { abbr: "ADW", name: "Al Agha Decoration Works LLC", year: "2001", focus: "False Ceiling & Gypsum Decoration", arabic: "الآغا لأعمال الديكور" },
  { abbr: "ATS", name: "Al Agha Technical Services LLC", year: "2008", focus: "Interior Design & Fit-Out", arabic: "الآغا للخدمات الفنية" },
  { abbr: "ABC", name: "Al Agha Building Contracting LLC", year: "2008", focus: "Civil & MEP Works", arabic: "الآغا لمقاولات البناء" },
];

/* ─── DETAILED SERVICES (SERVICES PAGE) ─── */
export const SERVICES = [
  {
    id: 1, slug: "paint-works", icon: "🎨",
    title: "Paint Works", tagline: "Every surface, flawlessly finished.",
    description: "We provide all kinds of decorative and standard paint works — from base coats and primers through to final finish coats. Whether it's flat, eggshell, satin, or high-gloss, water-based or solvent-based, we have the experience and precision equipment to coat every wall and ceiling to the highest standard.",
    features: [
      { label: "Base Coats & Primers", desc: "Correct surface preparation for lasting adhesion and uniform coverage." },
      { label: "Finish Coats", desc: "Flat, eggshell, gloss, and satin — matched to the exact sheen and tone specified." },
      { label: "Specialty Paints", desc: "Bathroom, kitchen, floor, metal, and traditional paints for every environment." },
      { label: "Full-Room Painting", desc: "Woodwork, walls, ceilings, and floors completed to the highest trade standard." },
      { label: "Water & Solvent-Based", desc: "Complete product knowledge across all modern and legacy paint systems." },
      { label: "Decorative Finishes", desc: "Textured coatings, faux finishes, and specialist feature-wall treatments." },
    ],
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200&q=85",
    stat1: { val: "15+", label: "Years Experience" },
    stat2: { val: "500K+", label: "Sq.m Painted" },
  },
  {
    id: 2, slug: "cladding-partition", icon: "🏛️",
    title: "Cladding & Partition Works", tagline: "Structure, beauty, and precision in every panel.",
    description: "We offer complete Cladding & Partition Gypsum Works for villas, mosques, commercial buildings, and landmark towers. Our scope covers interior and exterior decorative systems — gypsum drywall, GRG ceiling panels, GRG walls, GRG domes, GRC mouldings, decorative panels, and ornate columns — all executed to approved layouts and elevation details.",
    features: [
      { label: "Gypsum Drywall Systems", desc: "Precision-fit lightweight partitions for residential, hospitality, and commercial projects." },
      { label: "GRG Ceiling Panels", desc: "Glass-fibre reinforced gypsum ceiling solutions for curved, feature, and flat applications." },
      { label: "GRG Walls & Domes", desc: "Monolithic and segmental GRG for grand atriums, mosques, and signature interiors." },
      { label: "GRC Mouldings", desc: "Cornices, architraves, and custom profiles in glass-fibre reinforced concrete." },
      { label: "GRC Decorative Panels", desc: "Bespoke façade and interior panels, patterned to any approved elevation design." },
      { label: "Decorative Columns", desc: "Fluted, smooth, and ornate columns in GRC for lobbies, entrances, and exteriors." },
    ],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85",
    stat1: { val: "200+", label: "Projects Delivered" },
    stat2: { val: "38+", label: "Major Developments" },
  },
  {
    id: 3, slug: "interior-works", icon: "✨",
    title: "Interior Works", tagline: "Spaces that inspire — designed around you.",
    description: "We deliver innovative and creative interior design solutions tailored to every client's brief and vision. Our service covers total project management — from concept design through coordination, procurement, delivery, and installation of all finishes and furnishings — ensuring every detail is delivered on programme and to the highest standard.",
    features: [
      { label: "Concept & Design", desc: "Client-centred design development from mood board through to full construction drawings." },
      { label: "Project Management", desc: "End-to-end oversight of schedules, budgets, contractors, and quality checkpoints." },
      { label: "Floor & Wall Coverings", desc: "Specification, sourcing, and installation of all floor and wall finishes." },
      { label: "Furniture & Lighting", desc: "Full FF&E coordination — procurement, tracking, delivery, and installation." },
      { label: "Contractor Coordination", desc: "Seamless interface with civil, MEP, and specialist subcontractors." },
      { label: "Aftercare & Maintenance", desc: "Post-handover support and maintenance guidance for all installed elements." },
    ],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=85",
    stat1: { val: "100+", label: "Happy Clients" },
    stat2: { val: "500+", label: "Team Members" },
  },
  {
    id: 4, slug: "mep-works", icon: "⚙️",
    title: "MEP Works", tagline: "Full-scope building services, seamlessly coordinated.",
    description: "Al Agha Group delivers full Mechanical, Electrical, and Plumbing installations across residential towers, villas, commercial buildings, government facilities, and industrial warehouses. Our MEP division is backed by certified engineers, a dedicated MEP Operations Manager, and a track record of on-programme delivery on some of Dubai's most recognised developments.",
    features: [
      { label: "HVAC & Ductwork", desc: "Supply, install, and commission air-handling units, FCUs, VRF systems, and full ductwork." },
      { label: "Plumbing & Drainage", desc: "Complete water supply, drainage, and sanitary installations to DEWA and DM standards." },
      { label: "Electrical Installations", desc: "LV power, lighting, containment, DB boards, and cable tray systems." },
      { label: "Fire Fighting Systems", desc: "Sprinkler networks, fire hose reels, and suppression systems per DCDA codes." },
      { label: "BMS & Controls", desc: "Building management system integration, CCTV, access control, and data cabling." },
      { label: "Testing & Commissioning", desc: "Full T&C protocols, pressure testing, and handover documentation packages." },
    ],
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200&q=85",
    stat1: { val: "50+", label: "MEP Projects" },
    stat2: { val: "3", label: "UAE Emirates" },
  },
];

export const MEP_PROJECTS = [
  { name: "Jewel of the Creek Development", location: "Dubai, UAE", client: "M/s Dubai Investment", consultant: "M/s. Al Hashemi", contractor: "M/s Prime Star Electrical & Mechanical Works LLC", type: "Residential & Commercial" },
  { name: "Fatima Villa G+1", location: "Nadd Al Shiba, Dubai, UAE", client: "Ms. Fatma Mohd. Abdulla", consultant: "M/s Naga Architects", contractor: "M/S Gulf Modern Contracting LLC", type: "Villa" },
  { name: "Dubai Prosecution New Building", location: "Um Hurair Second, Dubai, UAE", client: "M/s Dubai Municipality", consultant: "M/s Archdome Consulting Engineers", contractor: "M/s Prime Star Electrical & Mechanical Works LLC", type: "Government" },
  { name: "G+2P+6F+R Residential & Commercial", location: "Oud Metha, Dubai, UAE", client: "M/s Unicon Investment", consultant: "M/s Ozone Cool Electromechanical Works LLC", contractor: "M/s Synchro Electromechanical", type: "Mixed-Use" },
  { name: "B+G+17+R Residential Building", location: "Business Bay, Dubai, UAE", client: "Mr. Ahmed Ali Abdullah Al Alsari", consultant: "M/s Rimal Engineering Consultant", contractor: "M/s Technomech L.L.C.", type: "Residential Tower" },
  { name: "Warehouse Blocks A-2 & B-3", location: "Al Sajaa Industrial, Sharjah, UAE", client: "M/s Dubai Investment", consultant: "M/s. Al Hashemi", contractor: "M/s Prime Star Electrical & Mechanical Works LLC", type: "Industrial" },
  { name: "DHRE: Myrtyle Residence — City Walk", location: "Phase 5, City Walk, Dubai, UAE", client: "M/s MEERAS", consultant: "M/s. Arif & Bintoak", contractor: "M/s. Conversion Electromechanical Company LLC", type: "Residential" },

];
export const QUICK_LINKS = ["Home", "Services", "Projects", "Career", "Clients", "Team", "About"];
export const FOOTER_SERVICES = ["False Ceiling & Gypsum Decor", "Interior Design & Fit-Out", "Mechanical, Electrical, Plumbing (MEP)", "General Civil Works", "Paint & Wall Finishes", "Architectural Design & Planning"];

/* ─── DETAILED PROJECTS (PROJECTS PAGE) ─── */
export const CATEGORIES = [
  "All",
  "False Ceiling & Partition",
  "Interior Design & Fit-Out",
  "MEP Works",
  "Civil Works",
];
export const FALLBACKS = [
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=80",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700&q=80",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=700&q=80",
  "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=700&q=80",
];
export const PROJECTS = [
  { id: 1, name: "Beach House & Villas Fujairah", category: "False Ceiling & Partition", img: "./projectimg/beach.jpg", featured: true },
  { id: 2, name: "EMAAR Beachfront — Sunrise Bay", category: "False Ceiling & Partition", img: "./projectimg/beachfront.jpg", featured: true },
  { id: 3, name: "City Engineering Office — Al Fatan Tower", category: "Interior Design & Fit-Out", img: "./projectimg/city.jpg", featured: true },
  { id: 4, name: "Park Ridge — Hadaeq Sheikh Mohammed", category: "False Ceiling & Partition", img: "./projectimg/Park-Ridge-2.jpg", featured: true },
  { id: 5, name: "Warehouse — Al Sajaa Industrial Area", category: "Civil Works", img: "./projectimg/15465160233.png" },
  { id: 6, name: "Hyati Residence 2 — Block A, B, C", category: "False Ceiling & Partition", img: "./projectimg/SITE -001.jpg" },
  { id: 7, name: "2B+G+11 Commercial & Residential", category: "Civil Works", img: "./projectimg/Project Perspective.jpg" },
  { id: 8, name: "G+3 Apartment Buildings — Al Hamriya", category: "Civil Works", img: "./projectimg/AL HAMRIYA & UM HURAIR 0138-0435.jpg" },
  { id: 9, name: "Labour Accommodation — Al Muhaisnah", category: "Civil Works", img: "./projectimg/20181003_264-0338-Labor-camp-Muhaisnah-second-1024x576.jpg", featured: true },
  { id: 10, name: "Coral Deira Hotel", category: "Interior Design & Fit-Out", img: "./projectimg/coral-dubai-deira-hotel.jpg" },
  { id: 11, name: "The Point Tower — Dubai Marina", category: "False Ceiling & Partition", img: "./projectimg/the-point-14096_xl.jpg" },
  { id: 12, name: "Jumeirah Beach Residence Tower", category: "False Ceiling & Partition", img: "./projectimg/141217_366_JUMEIRAH-BEACH-RESIDENCE_AERIAL_zj-1536x1192.jpg" },
  { id: 13, name: "Marina Wharf 1", category: "False Ceiling & Partition", img: "./projectimg/marina-wharf-1618_xl.jpg" },
  { id: 14, name: "Torch Tower", category: "False Ceiling & Partition", img: "./projectimg/R.jpg" },
  { id: 15, name: "72 Villas — Hydra Village", category: "Civil Works", img: "./projectimg/Capture4.png" },
  { id: 16, name: "IV Quattro EMAAR — Business Bay", category: "Interior Design & Fit-Out", img: "./projectimg/Capture5.png" },
  { id: 17, name: "D101 G+8+HC — Dubai Silicon Oasis", category: "False Ceiling & Partition", img: "./projectimg/DUBAIS_1.jpg" },
  { id: 18, name: "Empire Heights", category: "False Ceiling & Partition", img: "./projectimg/1520077655140.jpg" },
  { id: 19, name: "Al Bareeq Tower", category: "False Ceiling & Partition", img: "./projectimg/01_Perspective__Al Bareeq Tower.jpg" },
  { id: 20, name: "Holiday Inn Hotel & Suites", category: "Interior Design & Fit-Out", img: "./projectimg/Holiday Inn Hotel and Suites Dubai Science Park - Photo 03.jpg", featured: true },
  { id: 21, name: "Marina Wharf 2 — 2B+G+27 Tower", category: "False Ceiling & Partition", img: "./projectimg/10208.jpg" },
  { id: 22, name: "Bobyan Tower", category: "False Ceiling & Partition", img: "./projectimg/bobyan-tower-1554_xl.jpg" },
  { id: 23, name: "Media Rotana Hotel", category: "Interior Design & Fit-Out", img: "./projectimg/424818958.jpg" },
  { id: 24, name: "2B+G+P+25 Tower — Al Nahda One", category: "False Ceiling & Partition", img: "./projectimg/Capture 1.png" },
  { id: 25, name: "Al Watani Residential Development", category: "Civil Works", img: "./projectimg/Al-Watani-Residential-Development-Project.jpg" },
  { id: 26, name: "City Seasons Hotel Burjman", category: "Interior Design & Fit-Out", img: "./projectimg/71683934.jpg" },
  { id: 27, name: "Emirates Flight Training — DWC", category: "MEP Works", img: "./projectimg/R (3).jpg", featured: true },
  { id: 28, name: "Shatha Tower Renovation — Media City", category: "Interior Design & Fit-Out", img: "./projectimg/Shatha-Tower-1.jpg" },
  { id: 29, name: "122 Villas — Mirdif", category: "Civil Works", img: "./projectimg/WhatsApp Image 2017-09-24 at 1.01.27 PM.jpg" },
  { id: 30, name: "Remraam Residential Building", category: "False Ceiling & Partition", img: "./projectimg/remraam-295214-121454.jpg" },
  { id: 31, name: "Office Building G+6 — TECOM Site A", category: "Civil Works", img: "./projectimg/3shotRecovered-Recovered.jpg" },
  { id: 32, name: "Bay Central — Dubai Marina", category: "False Ceiling & Partition", img: "./projectimg/Untitled Design - 1 copy.jpg" },
  { id: 33, name: "I Rise Tower", category: "False Ceiling & Partition", img: "./projectimg/irise-tower-210391-101916.jpg" },
  { id: 34, name: "23 Marina", category: "False Ceiling & Partition", img: "./projectimg/Capture3.png" },
  { id: 35, name: "25 Villas — Falcon City", category: "Civil Works", img: "./projectimg/Eastern-Residences-Image1.jpg" },
  { id: 36, name: "Mirdiff Hills Development", category: "False Ceiling & Partition", img: "./projectimg/1225 - c5c49ae8-4e0f-49d0-8f4b-b5b457fd9339.jpg" },
  { id: 37, name: "Stella Maris — Dubai Marina", category: "False Ceiling & Partition", img: "./projectimg/1275- 140826_853_Areal_Hig_FINAL-logo.jpg", featured: true },
  { id: 38, name: "G+P+10 Residential — Al Furjan", category: "False Ceiling & Partition", img: "./projectimg/pic1 (1).jpg" },
  { id: 39, name: "Zabeel Ladies Club", category: "Interior Design & Fit-Out", img: "./projectimg/download (3).png" },
  { id: 40, name: "TH8 Hotel — Palm Jumeirah", category: "Interior Design & Fit-Out", img: "./projectimg/hotel-exterior.jpg", featured: true },
  { id: 41, name: "Eaton Place — Jumeirah Village", category: "False Ceiling & Partition", img: "./projectimg/eaton-place-10254.jpg" },
  { id: 42, name: "The Kingdom of Sheba", category: "Interior Design & Fit-Out", img: "./projectimg/sheba_03_1920x1024.jpg" },
  { id: 43, name: "Symphony Tower (Radisson Blu)", category: "Interior Design & Fit-Out", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShyVUAL87651gDLZYdVLSTzwtGU4pl6jMKmcUdDohypA&s=10", featured: true },
  { id: 44, name: "Duja Tower — Trade Center First", category: "False Ceiling & Partition", img: "./projectimg/download (3) (1).png" },
  { id: 45, name: "Vantage — Jumeirah Village", category: "False Ceiling & Partition", img: "./projectimg/download (4).png" },
  { id: 46, name: "Mirdif Hills — North Avenue", category: "False Ceiling & Partition", img: "./projectimg/download (1) (2).png" },
  { id: 47, name: "MBR Dubai Hills — Mulberry at Park Heights", category: "False Ceiling & Partition", img: "./projectimg/download (2) (1).png" },
  { id: 48, name: "Town Square — Rawda 1, 2, 3 & 4", category: "False Ceiling & Partition", img: "./projectimg/download (3) (2).png" },
  { id: 49, name: "The Address Residences Dubai Opera", category: "Interior Design & Fit-Out", img: "./projectimg/the-address-residences-dubai-opera-9455_xl.jpg", featured: true },
  { id: 50, name: "Town Square — UNA Apartments", category: "False Ceiling & Partition", img: "./projectimg/1649835984RD883.jpg" },
  { id: 51, name: "Hyati Residence 2 — JVC Townhouses", category: "False Ceiling & Partition", img: "./projectimg/download (2) (2).png" },
  { id: 52, name: "Port de la Mer Phase 2", category: "False Ceiling & Partition", img: "./projectimg/download (5).png" },
  { id: 53, name: "Kalba Waterfront — Khor Kalba", category: "Civil Works", img: "./projectimg/download (6).png", featured: true },
  { id: 54, name: "Terhab Hotel & Tower", category: "Interior Design & Fit-Out", img: "./projectimg/download (1) (4).png" },
  { id: 55, name: "Gulf Tower — Um Hurair 2nd", category: "False Ceiling & Partition", img: "./projectimg/gulf-tower.jpg" },
  { id: 56, name: "Dubai Creek Harbour — Summer 1D1", category: "False Ceiling & Partition", img: "./projectimg/R (1).jpg" },
  { id: 57, name: "BADR Project Phase 1", category: "Civil Works", img: "./projectimg/download (2) (3).png" },
  { id: 58, name: "Areej 1–4 — Muwaileh, Sharjah", category: "False Ceiling & Partition", img: "./projectimg/download (3) (4).png" },
  { id: 59, name: "Grand Bleu Tower — Emaar Beachfront", category: "False Ceiling & Partition", img: "./projectimg/1620744002_grandbleu1_result.jpg", featured: true },
  { id: 60, name: "Dubai Prosecution Building", category: "MEP Works", img: "./projectimg/download (2) (4).png", featured: true },
  { id: 61, name: "Platinum 2 — Dubai Silicon Oasis", category: "False Ceiling & Partition", img: "./projectimg/PLATINUM 2.jpg" },
  { id: 62, name: "Platinum 1 — Dubai Silicon Oasis", category: "False Ceiling & Partition", img: "./projectimg/PLATINUM 1.jpg" },
  { id: 63, name: "Mira Oasis Townhouses — Reem Phase 2", category: "Civil Works", img: "./projectimg/3731.jpg" },
  { id: 64, name: "Sea Gate — Mina Rashid", category: "False Ceiling & Partition", img: "./projectimg/WhatsApp Image 2025-09-08 at 08.56.35_bdefc655.jpg", featured: true },
  { id: 65, name: "Kempinski Residences — Dubai Healthcare City", category: "Interior Design & Fit-Out", img: "./projectimg/download (8).png", featured: true },
  { id: 66, name: "Innovation Hub Phase 2", category: "MEP Works", img: "./projectimg/innovation-hub-4327_xl.jpg" },
  { id: 67, name: "District One Private Mansion", category: "Interior Design & Fit-Out", img: "./projectimg/download (2) (5).png" },
  { id: 68, name: "Shams Townhouses — Town Square", category: "Civil Works", img: "./projectimg/download (1) (6).png" },
  { id: 69, name: "AVA — Palm Jumeirah", category: "False Ceiling & Partition", img: "./projectimg/download (3) (5).png", featured: true },
  { id: 70, name: "Hyati H3 — Al Barsha South", category: "False Ceiling & Partition", img: "./projectimg/download (9).png" },
  { id: 71, name: "Anwa Aria Tower — Dubai Maritime City", category: "False Ceiling & Partition", img: "./projectimg/download (5) (1).png", featured: true },
  { id: 72, name: "Chic Tower — Business Bay", category: "False Ceiling & Partition", img: "./projectimg/download (7) (1).png" },
  { id: 73, name: "Elegance Tower", category: "False Ceiling & Partition", img: "./projectimg/download (8) (1).png" },
  { id: 74, name: "Greenside Residence — Dubai Hills", category: "False Ceiling & Partition", img: "./projectimg/download (9) (1).png" },
  { id: 75, name: "Prime Heart & Lung Hospital", category: "MEP Works", img: "./projectimg/download (10).png", featured: true },
  { id: 76, name: "Address The Bay — Emaar Beachfront", category: "False Ceiling & Partition", img: "./projectimg/download (11).png", featured: true },
  { id: 77, name: "Mixed Use — Al Medif, Khorfakkan", category: "Civil Works", img: "./projectimg/download (13).png" },
  { id: 78, name: "Nad Al Shiba School — Phase 1", category: "Civil Works", img: "./projectimg/download (14).png" },
  { id: 79, name: "SLS Residence — Palm Jumeirah", category: "Interior Design & Fit-Out", img: "./projectimg/download (15).png", featured: true },
  { id: 80, name: "Sky Spiral Tower (Biltmore Sufouh)", category: "False Ceiling & Partition", img: "./projectimg/Sky-Spiral-Tower-Day-View-614x1024.png", featured: true },
  { id: 81, name: "Parkside Hills — Dubai Hills Estate", category: "False Ceiling & Partition", img: "./projectimg/PARKSIDE_HILLS_IMAGE2-scaled.jpg", featured: true },
  { id: 82, name: "Marsa Al Arab L5 SPA", category: "Interior Design & Fit-Out", img: "./projectimg/Marsa-Al-Arab-Exterior.jpg", featured: true },
  { id: 84, name: "Makan Housing Project — Hatta", category: "Civil Works", img: "./projectimg/afssg.png" },
  { id: 85, name: "DP World Head Office — Expo City", category: "MEP Works", img: "./AAAAAA.jpg", featured: true },
  { id: 86, name: "Victoria International School — Kalba", category: "Civil Works", img: "./projectimg/59b0c1_3abb320e18504179a17880e6813489d0~mv2 (1).jpg" },
  { id: 87, name: "Proposed Residential Project — Plots 86–89", category: "Civil Works", img: "./projectimg/2834-ALG-86-ARC-M3-PRESPECTIVE3-3384450 (1).jpg" },
  { id: 88, name: "Techno Hub 4 — Dubai Silicon Oasis", category: "MEP Works", img: "./projectimg/large_D5_Image_8_20230714_013430_342968d0e3 (1).png", featured: true },
  { id: 89, name: "G+P+10 Residential Tower — Wadi Al Safa", category: "False Ceiling & Partition", img: "./projectimg/Screenshot 2025-10-03 084111 (1).png" },
  { id: 90, name: "Dubai Creek Harbour Bridge District", category: "Civil Works", img: "./projectimg/Screenshot 2025-10-03 102435.png", featured: true },
  { id: 91, name: "MAG JLT — Mixed Use Tower", category: "False Ceiling & Partition", img: "./projectimg/MAG JLT R3 VIEW B.jpg" },
  { id: 92, name: "South Living — Residential Building", category: "False Ceiling & Partition", img: "./projectimg/South_Living.jpg" },
  { id: 93, name: "Costa Coffee — Deira City Centre", category: "Interior Design & Fit-Out", img: "./projectimg/Screenshot 2026-03-06 105307.png", featured: true },
  { id: 94, name: "Muhaisnah Community Housing", category: "Civil Works", img: "./projectimg/SITE -001.jpg", featured: true },
  { id: 96, name: "Dubai Police Headquarters Complex", category: "Civil Works", img: "https://www.sheridanuae.com/wp-content/uploads/2020/12/D409-Al-Aweer-Police-HQ..jpg" },
  { id: 97, name: "Hungary Pavilion — EXPO 2020 Dubai", category: "Interior Design & Fit-Out", img: "https://images.adsttc.com/media/images/6203/2036/44ba/f701/6571/b72a/newsletter/20211023-dubaj-pavilon-3048.jpg?1644372080" },
  { id: 98, name: "Family House & Service Block — Rul Dibba", category: "Civil Works", img: "https://alu-glaze.com/wp-content/uploads/2025/08/85877@4x-1.jpg" },
  { id: 99, name: "Intercontinental Resort & Hotel — Mina Al Arab", category: "Interior Design & Fit-Out", img: "https://www.rakproperties.ae/wp-content/uploads/2024/06/ACEO-Intercon-Post-Web-Image.jpg" },
  { id: 100, name: "Amazon Delivery Station — Al Quoz", category: "MEP Works", img: "https://eccfitout.com/wp-content/uploads/2025/12/DDB7-Amazon-03.jpg" },
  { id: 102, name: "Mixed-Use Building — Al Muteena", category: "Civil Works", img: "https://range.ae/_next/image?url=%2Fapi%2Fmedia%2Ffile%2Fal-muteena-27255_xl.jpg&w=3840&q=75" },
  { id: 103, name: "Areej 5, 6 & 7 — Muwaileh", category: "False Ceiling & Partition", img: "https://cdn.fazwaz.com/nw/OjhjzYlOdDkJaNWGsOyUdRbIK88/375x300/project/6993/areej-apartments-by-arada.png" },
  { id: 104, name: "Residential Building — Al Satwa", category: "False Ceiling & Partition", img: "https://res.cloudinary.com/protenders/image/upload/c_limit,d_missing,dpr_3.0,f_auto,fl_progressive:semi,q_auto:eco,w_500/fd96defbc9e43d0445feacf872f98ea2.jpg" },
  { id: 105, name: "Etihad Mosque — Al Barsha 2nd", category: "Civil Works", img: "https://iacad.gov.ae/images/e556005c/3c01x2381wFFFFFF/png.aspx" },
  { id: 107, name: "Mosque — Al Quoz 3rd", category: "Civil Works", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUK3uVVBt0_qZJ_rEvH3srbWwlFjykV4u_qg&s" },
  { id: 108, name: "Residential & Commercial Building — Al Mamzar", category: "False Ceiling & Partition", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzFVsUC19t49HzVgSG8Dxpx0R7K9s_FHnWIA&s" },
  { id: 109, name: "Commercial Center — Al Warqa'a", category: "Civil Works", img: "https://corporate.unioncoop.ae/wp-content/uploads/2018/03/Al-Warqa%E2%80%99a-Commercial-Center.png" },
  { id: 110, name: "ACT1 / ACT2 — Burj Khalifa", category: "Interior Design & Fit-Out", featured: true, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpvOFA0_lnsQxejLZuuEFa-phXz2vF0PkgYw&s" },
  { id: 111, name: "Residential Development — Al Jadaf", category: "Civil Works", img: "https://property.constructionweekonline.com/cloud/2024/02/06/Image_Art-Bay.jpg" },
  { id: 112, name: "Vida Hotel & Residences — Dubai Creek Harbour", category: "Interior Design & Fit-Out", featured: true, img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/268427555.jpg?k=2ded2ec6b3097586061f0b1e207fb9b3e60d6490355ed908886069a6a39b7bdf&o=" },
  { id: 113, name: "10 Villas — Mirdif", category: "Civil Works", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR1Tl-nd35weIGB0DkU1_k7gkrYQJHmTma5g&s" },
  { id: 114, name: "Mosque of Reflection — City Walk", category: "Interior Design & Fit-Out", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkIFuwE0DLTG1lAFrV4-TsrESBFj2TYjk5sg&s" },
  { id: 115, name: "French Bakery — Multiple Branches", category: "Interior Design & Fit-Out", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_XuQGwAX_uWTPvJF0LF2hgVgkFaL_G77mTw&s" },
  { id: 117, name: "The Peninsula Sales Office", category: "Interior Design & Fit-Out", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYbYSjaO3qWgN5QDXqOm8ryNX9P33a-NziCg&s" },
  { id: 118, name: "Park Island — Dubai Creek Harbour", category: "Civil Works", img: "https://cloud.famproperties.com/project/large/island-park-245255-160558.jpg" },
  { id: 119, name: "Three Community Centers", category: "Civil Works", img: "https://www.hattakayaktours.com/wp-content/uploads/2024/07/Al-Khail-Gate-Community-Centre.jpg" },
  { id: 120, name: "Topaz 2 — Dubai Silicon Oasis", category: "False Ceiling & Partition", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzcqzwM7JNwXg0H3G1b_ihgw_3coCxjlYwcA&s" },
  { id: 121, name: "Jumeirah Zabeel Saray Hotel Refurbishment", category: "False Ceiling & Partition", img: "https://res.cloudinary.com/qh3zic6r/image/upload/v1783691662/aa8e7e5b-31c1-4b9b-9b27-68a587d2898c_ufr3q1.jpg" },
  { id: 122, name: "R3 MBL Signature Tower — JLT", category: "False Ceiling & Partition", img: "https://res.cloudinary.com/qh3zic6r/image/upload/v1783691662/dade3b21-6b1d-4fd4-8740-85c9083c58cf_cknp56.jpg" },
  { id: 123, name: "INNOVATION HUB — TECOM Phase 3", category: "False Ceiling & Partition", img: "https://res.cloudinary.com/qh3zic6r/image/upload/v1783691662/e8518bb1-4b72-41ec-b52d-692fa2318129_uxhooj.jpg" },
  { id: 124, name: "THE ACRES Phase 1 — Dubai Land", category: "False Ceiling & Partition", img: "https://res.cloudinary.com/qh3zic6r/image/upload/v1783691662/a278c122-fa90-48a5-8c65-35fe9e4e8e32_lqmd4k.jpg" },
  { id: 125, name: "CENTRAL BUSINESS DISTRICT — Mweileh Tejari", category: "False Ceiling & Partition", img: "https://res.cloudinary.com/qh3zic6r/image/upload/v1783691662/ca0a4189-048e-4004-a5b7-8aa43689fee8_mkeail.jpg" },
  { id: 126, name: "Mural Tower", category: "False Ceiling & Partition", img: "https://res.cloudinary.com/iwfmnnaa/image/upload/v1792515285/660633b1-ea0c-4e90-9ac9-22a42a972650_1_vu11vr.jpg" },
  { id: 127, name: "North Gateway District - Plot A09 - Albero & Plot 410", category: "False Ceiling & Partition", img: "https://res.cloudinary.com/iwfmnnaa/image/upload/v1792515285/fd22dd8e-1626-447e-b3ba-176a0f3b1e82_tyqdmh.jpg" },
  { id: 128, name: "Juma Masjid", category: "False Ceiling & Partition", img: "https://res.cloudinary.com/iwfmnnaa/image/upload/v1792515285/b926467c-cfb1-4770-a2f9-c0296c669495_jcgphc.jpg" },
  { id: 129, name: "The Actres Phase 1", category: "False Ceiling & Partition", img: "https://res.cloudinary.com/iwfmnnaa/image/upload/v1792515286/a1ecb5a6-b083-4b33-8530-6c50094cae22_gcejjd.jpg" },
  { id: 130, name: "The Actres Phase 2", category: "False Ceiling & Partition", img: "https://res.cloudinary.com/iwfmnnaa/image/upload/v1792515285/5eff968b-f443-45b2-a902-86e5854fa3aa_yrrj8x.jpg" },
  { id: 131, name: "The Actres Phase 3", category: "False Ceiling & Partition", img: "https://res.cloudinary.com/iwfmnnaa/image/upload/v1792515285/6b1e92fb-77ba-4632-ad1c-86b1a44ce761_ock9jw.jpg" },
  { id: 132, name: "Sidr Residence (Plot 3)", category: "False Ceiling & Partition", img: "https://res.cloudinary.com/iwfmnnaa/image/upload/v1792515286/d0659d6a-1a95-4493-9d8a-e08d2885cb66_gqzhou.jpg" },
  { id: 133, name: "Nobu Hotel & Residence", category: "False Ceiling & Partition", img: "https://res.cloudinary.com/iwfmnnaa/image/upload/v1792515286/9ab9b326-7fde-493a-b93d-fe89e77f424a_gooodv.jpg" },



];
export const CAT_META = {
  "All": { color: "#FFFFFF", bg: "#2563EB" },
  "False Ceiling & Partition": { color: "#FFFFFF", bg: "#2563EB" },
  "Interior Design & Fit-Out": { color: "#1D4ED8", bg: "#DCE6FA" },
  "MEP Works": { color: "#FFFFFF", bg: "#1D4ED8" },
  "Civil Works": { color: "#FFFFFF", bg: "#0B1220" },
};
