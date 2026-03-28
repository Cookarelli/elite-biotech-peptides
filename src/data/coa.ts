export type COARecord = {
  id: string;
  compound: string;
  batchId: string;
  testedOn: string;
  purity: string;
  assay: string;
  lab: string;
  status: "Released" | "Pending";
  file: string;
};

export const coaRecords: COARecord[] = [
  {
    id: "coa-001",
    compound: "CJC-1295 with DAC",
    batchId: "EBP-CJC-2401A",
    testedOn: "2026-01-14",
    purity: "99.2%",
    assay: "LC-MS + HPLC",
    lab: "Aether Analytics",
    status: "Released",
    file: "/coa/EBP-CJC-2401A.txt",
  },
  {
    id: "coa-002",
    compound: "Ipamorelin",
    batchId: "EBP-IPA-2402B",
    testedOn: "2026-01-19",
    purity: "98.7%",
    assay: "LC-MS + HPLC",
    lab: "NovaLab Systems",
    status: "Released",
    file: "/coa/EBP-IPA-2402B.txt",
  },
  {
    id: "coa-003",
    compound: "BPC-157",
    batchId: "EBP-BPC-2402F",
    testedOn: "2026-01-24",
    purity: "99.0%",
    assay: "HPLC",
    lab: "Aether Analytics",
    status: "Released",
    file: "/coa/EBP-BPC-2402F.txt",
  },
  {
    id: "coa-004",
    compound: "NAD+",
    batchId: "EBP-NAD-2403C",
    testedOn: "2026-02-03",
    purity: "99.5%",
    assay: "Enzymatic + HPLC",
    lab: "Helix QC Group",
    status: "Released",
    file: "/coa/EBP-NAD-2403C.txt",
  },
  {
    id: "coa-005",
    compound: "Ipamorelin",
    batchId: "EBP-IPA-2403D",
    testedOn: "2026-02-09",
    purity: "98.9%",
    assay: "LC-MS",
    lab: "NovaLab Systems",
    status: "Pending",
    file: "/coa/EBP-IPA-2403D.txt",
  },
];
