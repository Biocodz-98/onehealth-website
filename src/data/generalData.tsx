import { BsWhatsapp } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { Icons } from "@/components/Icons";
import {
  NeedMedicalGuide1,
  NeedMedicalGuide2,
  NeedMedicalGuide3,
  CoughColdTestimonial,
  HerHealthTestimonial,
  HisHealthTestimonial,
  MultivitaminsTestimonial,
  SexualHealthTestimonial,
  MotherChildCat,
  Antimaleria,
  Antibiotics,
  Contraceptives,
} from "./imageData";

export const GuideCardData = [
  {
    image: NeedMedicalGuide1,
  },
  {
    image: NeedMedicalGuide2,
  },
  {
    image: NeedMedicalGuide3,
  },
];

export const ContactGuideInfoData = [
  {
    Icon: BsWhatsapp,
    title: "09079840233",
  },
  {
    Icon: Icons.call,
    title: "08188762448",
  },
  {
    Icon: FiMail,
    title: "customerservice@onehealthng.com",
  },
];

export const TestimonialCardData = [
  {
    image: CoughColdTestimonial,
    alt: "Cough and cold medication from OneHealth online pharmacy in Nigeria.",
    title: "Cough & Cold",
    link: "https://onehealthng.com/category/cough-cold",
    content: "Links to the same tab in the same window",
    arialLabel: "Link to Cough and Cold category page",
  },
  {
    image: HerHealthTestimonial,
    alt: "Women's health medication from OneHealth online pharmacy in Nigeria.",
    title: "Her Health",
    link: "https://onehealthng.com/category/her-health",
    content: "Links to the same tab in the same window",
    arialLabel: "Link to Her health category page",
  },
  {
    image: HisHealthTestimonial,
    alt: " Image for men's health medication from OneHealth online pharmacy in Nigeria.",
    title: "His Health",
    link: "https://onehealthng.com/category/his-health",
    content: "Links to the same tab in the same window",
    arialLabel: "Link to His health category page",
  },
  {
    image: SexualHealthTestimonial,
    alt: "Sexual health medication from OneHealth online pharmacy in Nigeria.",
    title: "Sexual Health",
    link: "https://onehealthng.com/category/sexual-health",
    content: "Links to the same tab in the same window",
    arialLabel: "Link to Sexual health category page",
  },
  {
    image: MultivitaminsTestimonial,
    alt: "Multivitamins from OneHealth online pharmacy in Nigeria.",
    title: "Multivitamins",
    link: "https://onehealthng.com/category/vitamins",
    content: "Links to the same tab in the same window",
    arialLabel: "Link to Multi-vitamins category page",
  },
  {
    image: CoughColdTestimonial,
    alt: "Cough and cold medication from OneHealth online pharmacy in Nigeria.",
    title: "Cough & flu",
    link: "https://onehealthng.com/category/cough-cold-and-flu",
    content: "Links to the same tab in the same window",
    arialLabel: "Link to Cough and Flu category page",
  },
  {
    image: MotherChildCat,
    alt: "Mother and child medication from OneHealth online pharmacy in Nigeria",
    title: "Mother & Child",
    link: "https://onehealthng.com/category/mother-child",
    content: "Links to the same tab in the same window",
    arialLabel: "Link to Mother and Child category page",
  },
  {
    image: Antimaleria,
    alt: "Anti-malarial medication from OneHealth online pharmacy in Nigeria.",
    title: "Anti-Malaria",
    link: "https://onehealthng.com/category/malaria-medications",
    content: "Links to the same tab in the same window",
    arialLabel: "Link to Anti-Malaria category page",
  },
  {
    image: Antibiotics,
    alt: "Antibiotics from OneHealth online pharmacy in Nigeria.",
    title: "Antibiotics",
    link: "https://onehealthng.com/category/antibiotics",
    content: "Links to the same tab in the same window",
    arialLabel: "Link to Antibiotics category page",
  },
  {
    image: Contraceptives,
    alt: "Contraceptives from OneHealth online pharmacy in Nigeria.",
    title: "Contraceptives",
    link: "https://onehealthng.com/category/contraceptives",
    content: "Links to the same tab in the same window",
    arialLabel: "Link to Contraceptives category page",
  },
];

export const TestimonialSholaData = [
  {
    title: "Tab Amlodipine 2.5mg",
    body: "Take One by mouth Once daily for 7days.",
  },
  {
    title: "Cap Omeprazole 20mg",
    body: "Take One by mouth everyday for 14days.",
  },
];
