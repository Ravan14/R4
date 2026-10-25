/*
 * Per-page document head data and the filename each page publishes as.
 * Titles and descriptions rewritten in plain language (CONTENT-REPORT.md);
 * the `investors` entry is new with the content replan.
 */

export type PageKey = 'home' | 'technology' | 'applications' | 'defence' | 'civil' | 'company' | 'investors' | 'careers' | 'contact' | 'not-found';

export const PAGES: Record<PageKey, {
  file: string;
  title: string;
  description: string;
  themeColor: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogType: string;
  ogImage: string;
  bodyClass: string;
  hasChrome: boolean;
}> = {
  "home": {
    "file": "index.html",
    "title": "R4 Aerospace & Defence | Integrated Earth Intelligence",
    "description": "R4 flies a small satellite formation that sees the same place with four sensors at once — delivering complete, all-weather Earth intelligence for defence and civil missions.",
    "themeColor": "#FCFCFD",
    "robots": "",
    "ogTitle": "R4 Aerospace & Defence | Integrated Earth Intelligence",
    "ogDescription": "R4 flies a small satellite formation that sees the same place with four sensors at once — delivering complete, all-weather Earth intelligence for defence and civil missions.",
    "ogType": "website",
    "ogImage": "BG.jpg",
    "bodyClass": "home-page",
    "hasChrome": true
  },
  "technology": {
    "file": "technology.html",
    "title": "Technology | R4 Aerospace & Defence",
    "description": "How R4's three satellites see the same place at the same moment with radar, camera, heat, and radio — and turn it into decisions.",
    "themeColor": "#FCFCFD",
    "robots": "",
    "ogTitle": "Technology | R4 Aerospace & Defence",
    "ogDescription": "How R4's three satellites see the same place at the same moment with radar, camera, heat, and radio — and turn it into decisions.",
    "ogType": "website",
    "ogImage": "BG.jpg",
    "bodyClass": "",
    "hasChrome": true
  },
  "applications": {
    "file": "applications.html",
    "title": "Applications | R4 Aerospace & Defence",
    "description": "One system, many missions: maritime security, disaster response, agriculture, infrastructure, and insurance — built on same-moment satellite sensing.",
    "themeColor": "#FCFCFD",
    "robots": "",
    "ogTitle": "Applications | R4 Aerospace & Defence",
    "ogDescription": "One system, many missions: maritime security, disaster response, agriculture, infrastructure, and insurance — built on same-moment satellite sensing.",
    "ogType": "website",
    "ogImage": "BG.jpg",
    "bodyClass": "",
    "hasChrome": true
  },
  "defence": {
    "file": "defence.html",
    "title": "Defence & Security | R4 Aerospace & Defence",
    "description": "Persistent, all-weather watch of sea lanes, borders, and strategic sites — with evidence verified the moment it is collected.",
    "themeColor": "#FCFCFD",
    "robots": "",
    "ogTitle": "Defence & Security | R4 Aerospace & Defence",
    "ogDescription": "Persistent, all-weather watch of sea lanes, borders, and strategic sites — with evidence verified the moment it is collected.",
    "ogType": "website",
    "ogImage": "BG.jpg",
    "bodyClass": "",
    "hasChrome": true
  },
  "civil": {
    "file": "civil.html",
    "title": "Civil & Commercial | R4 Aerospace & Defence",
    "description": "Faster flood maps, crop and water intelligence, infrastructure monitoring, and insurance evidence from same-moment satellite sensing.",
    "themeColor": "#FCFCFD",
    "robots": "",
    "ogTitle": "Civil & Commercial | R4 Aerospace & Defence",
    "ogDescription": "Faster flood maps, crop and water intelligence, infrastructure monitoring, and insurance evidence from same-moment satellite sensing.",
    "ogType": "website",
    "ogImage": "BG.jpg",
    "bodyClass": "",
    "hasChrome": true
  },
  "company": {
    "file": "company.html",
    "title": "Company | R4 Aerospace & Defence",
    "description": "The mission, principles, leadership, and roadmap behind R4 — led by Dr. Kathiravan Thanagvel.",
    "themeColor": "#FCFCFD",
    "robots": "",
    "ogTitle": "Company | R4 Aerospace & Defence",
    "ogDescription": "The mission, principles, leadership, and roadmap behind R4 — led by Dr. Kathiravan Thanagvel.",
    "ogType": "website",
    "ogImage": "BG.jpg",
    "bodyClass": "",
    "hasChrome": true
  },
  "investors": {
    "file": "investors.html",
    "title": "Investors | R4 Aerospace & Defence",
    "description": "R4 is raising a $2M pre-seed round to de-risk its synchronous multi-modal Earth-intelligence system before flight hardware.",
    "themeColor": "#FCFCFD",
    "robots": "",
    "ogTitle": "Investors | R4 Aerospace & Defence",
    "ogDescription": "R4 is raising a $2M pre-seed round to de-risk its synchronous multi-modal Earth-intelligence system before flight hardware.",
    "ogType": "website",
    "ogImage": "BG.jpg",
    "bodyClass": "",
    "hasChrome": true
  },
  "careers": {
    "file": "careers.html",
    "title": "Careers | R4 Aerospace & Defence",
    "description": "Build the eyes that watch over Earth: spacecraft, sensing, AI, geospatial, security, and business roles at R4.",
    "themeColor": "#FCFCFD",
    "robots": "",
    "ogTitle": "Careers | R4 Aerospace & Defence",
    "ogDescription": "Build the eyes that watch over Earth: spacecraft, sensing, AI, geospatial, security, and business roles at R4.",
    "ogType": "website",
    "ogImage": "BG.jpg",
    "bodyClass": "",
    "hasChrome": true
  },
  "contact": {
    "file": "contact.html",
    "title": "Contact | R4 Aerospace & Defence",
    "description": "Tell us what you need to see. Reach R4 for mission studies, pilots, partnerships, and collaboration.",
    "themeColor": "#FCFCFD",
    "robots": "",
    "ogTitle": "Contact | R4 Aerospace & Defence",
    "ogDescription": "Tell us what you need to see. Reach R4 for mission studies, pilots, partnerships, and collaboration.",
    "ogType": "website",
    "ogImage": "BG.jpg",
    "bodyClass": "",
    "hasChrome": true
  },
  "not-found": {
    "file": "404.html",
    "title": "Page Not Found | R4 Aerospace & Defence",
    "description": "",
    "themeColor": "",
    "robots": "noindex",
    "ogTitle": "",
    "ogDescription": "",
    "ogType": "",
    "ogImage": "",
    "bodyClass": "",
    "hasChrome": false
  }
};
