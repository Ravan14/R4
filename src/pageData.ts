import type { ExplorerRecord } from './widgets/RecordExplorer.tsx';

/*
 * Published copy, rewritten in plain language (CONTENT-REPORT.md).
 *
 * The application portfolio records that used to live here were removed
 * together with the Applications explorer: each domain is now described
 * once, on its audience page (Defence or Civil). These records drive the
 * Careers explorer and the Civil disclosure list; ids, categories, icons,
 * and tags are stable so the existing filter and disclosure controllers
 * keep working unchanged.
 */

export const careerRecords: ExplorerRecord[] = [
  { id: 'satellite-systems-engineer', category: 'space', icon: 'satellite', title: 'Satellite systems engineer', description: 'Design the satellites end to end: architecture, requirements, interfaces, budgets, and verification.' },
  { id: 'payload-engineer', category: 'space', icon: 'optical', title: 'Payload engineer', description: 'Build the sensors — radar, camera, heat, and radio — and own calibration, characterisation, and validation.' },
  { id: 'guidance-navigation-control-engineer', category: 'space', icon: 'orbit', title: 'Guidance, navigation, and control engineer', description: 'Make the three satellites fly in formation: relative navigation, attitude control, autonomy, and mission simulation.' },
  { id: 'rf-communications-engineer', category: 'space', icon: 'signal', title: 'RF and communications engineer', description: 'Own the links: space-to-ground radios, onboard networks, spectrum engineering, and modem integration.' },
  { id: 'remote-sensing-scientist', category: 'data', icon: 'radar', title: 'Remote-sensing scientist', description: 'Turn raw sensor data into science: geospatial algorithms, calibration, validation, and application research.' },
  { id: 'ai-machine-learning-engineer', category: 'data', icon: 'chip', title: 'AI and machine-learning engineer', description: 'Teach the platform to see: multi-sensor fusion, object detection, anomaly analysis, and prediction.' },
  { id: 'geospatial-data-engineer', category: 'data', icon: 'globe', title: 'Geospatial data engineer', description: 'Build the data backbone: ingestion, catalogues, tiling, STAC and OGC services, and scalable pipelines.' },
  { id: 'cloud-platform-engineer', category: 'platform', icon: 'layers', title: 'Cloud and platform engineer', description: 'Run the platform: distributed storage, orchestration, GPU workloads, APIs, and deployment automation.' },
  { id: 'cybersecurity-engineer', category: 'platform', icon: 'shield', title: 'Cybersecurity engineer', description: 'Protect the mission: threat modelling, identity, key management, secure architecture, and auditability.' },
  { id: 'business-development', category: 'business', icon: 'people', title: 'Business development', description: 'Find the missions: customer discovery, institutional partnerships, pilots, proposals, and strategic accounts.' },
  { id: 'space-policy-regulation', category: 'business', icon: 'compass', title: 'Space policy and regulation', description: 'Navigate the rules: licensing, spectrum, remote-sensing regulation, export control, and data policy.' },
  { id: 'research-engineering-internships', category: 'intern', icon: 'analytics', title: 'Research and engineering internships', description: 'Structured projects in mission analysis, remote sensing, AI, simulation, software, and market research.' },
];

export const civilRecords: ExplorerRecord[] = [
  { id: 'civil-disaster-management', category: 'public-safety', icon: 'radar', tag: 'Public safety', title: 'Disaster management', description: 'Map floods, fires, and damage within hours — and find the places that need help first.', meta: ['Flood extent', 'Damage maps', 'Priority areas'] },
  { id: 'civil-climate-ecosystem', category: 'environment', icon: 'globe', tag: 'Environment', title: 'Climate and ecosystem observation', description: 'Track coasts, wetlands, and forests over time, and spot change early.', meta: ['Coastal change', 'Deforestation', 'Compliance'] },
  { id: 'civil-agriculture-water', category: 'agriculture', icon: 'leaf', tag: 'Agriculture', title: 'Agriculture and water intelligence', description: 'See crop health, irrigation performance, and water availability at field scale.', meta: ['Crop condition', 'Moisture', 'Heat stress'] },
  { id: 'civil-infrastructure-monitoring', category: 'infrastructure', icon: 'infrastructure', tag: 'Infrastructure', title: 'Infrastructure monitoring', description: 'Watch roads, cities, and construction sites for change, encroachment, and condition.', meta: ['Change maps', 'Asset inventory'] },
  { id: 'civil-energy-industrial', category: 'energy', icon: 'thermal', tag: 'Energy', title: 'Energy and industrial operations', description: 'Monitor pipelines, power lines, and industrial sites for activity and anomalies.', meta: ['Thermal anomalies', 'Remote assets'] },
  { id: 'civil-insurance-financial', category: 'risk', icon: 'analytics', tag: 'Risk', title: 'Insurance and financial risk', description: 'Give underwriters and claims teams hard evidence: exposure maps and event verification.', meta: ['Risk scores', 'Claims evidence'] },
  { id: 'civil-maritime-fisheries', category: 'maritime', icon: 'wave', tag: 'Maritime', title: 'Maritime safety and fisheries', description: 'Find vessels that should not be there, spot oil spills, and prioritise search areas.', meta: ['Illegal fishing', 'Spill detection'] },
  { id: 'civil-aviation-remote', category: 'aviation', icon: 'satellite', tag: 'Aviation', title: 'Aviation and remote-area awareness', description: 'Check airfield status and connectivity in remote regions using transponder data and imagery.', meta: ['ADS-B', 'Airfield status'] },
  { id: 'civil-urban-regional', category: 'urban', icon: 'company', tag: 'Urban', title: 'Urban and regional planning', description: 'Measure settlement growth, land-use change, heat islands, and public assets.', meta: ['Land-use change', 'Heat islands'] },
];
