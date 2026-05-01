// ─── Shared ───────────────────────────────────────────────────────────────────

export interface ApiPartner {
  id: number;
  name: string;
  logo: string;
  description: string;
  website: string;
  blocks?: import('@/types/api.types').ContentBlock[];
}

export interface ApiMentor {
  id: number;
  fullname: string;
  photo: string;
  position: string;
  about: string;
  decorImage: string | null;
}

export interface ApiSkillTag {
  name: string;
  icon: string | null;
}

export interface ApiTechnology {
  name: string;
  icon: string | null;
}

export interface ApiProject {
  id: number;
  title: string;
  description: string;
}

export interface ApiCertificate {
  id: number;
  title: string;
  template: string;
  description: string;
}

export interface ApiGraduate {
  id: number;
  fullname: string;
  position: string;
  photo: string;
}

// ─── Skill (public detail) ────────────────────────────────────────────────────

export interface ApiSkillLesson {
  id: number;
  title: string;
  isPublic: boolean;
}

export interface ApiSkillTest {
  id: number;
  name: string;
}

export interface ApiSkillModule {
  id: number;
  title: string;
  description: string;
  lessonCount: number;
  testCount: number;
  lessons: ApiSkillLesson[];
  tests: ApiSkillTest[];
}

export interface ApiSkill {
  id: number;
  name: string;
  title: string;
  subtitle?: string;
  description: string;
  courseOutcomes: string | null;
  photo: string | null;
  cardImage: string | null;
  icon: string | null;
  decorImage: string | null;
  price: number;
  pricingType: 'FREE' | 'PAID';
  duration: number;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  partners: ApiPartner[];
  modules: ApiSkillModule[];
  mentor: ApiMentor | null;
  enrollmentCount: number;
}

// ─── Course (public detail) ───────────────────────────────────────────────────

export interface ApiCourseLesson {
  id: number;
  title: string;
}

export interface ApiCourseModule {
  id: number;
  title: string;
  description: string;
  lessonCount: number;
  testCount: number;
  lessons: ApiCourseLesson[];
}

export interface ApiLearningOutcome {
  title: string;
  description: string;
}

export interface ApiCourse {
  id: number;
  name: string;
  title: string;
  subtitle?: string;
  description: string;
  photo: string | null;
  cardImage: string | null;
  icon: string | null;
  decorImage: string | null;
  courseOutcomes: ApiLearningOutcome[] | string | null;
  price: number;
  pricingType: 'FREE' | 'PAID';
  publishDate: string | null;
  partners: ApiPartner[];
  modules: ApiCourseModule[];
  mentor: ApiMentor | null;
  skills: ApiSkillTag[];
  technologies: ApiTechnology[];
  projects: ApiProject[];
  certificates: ApiCertificate[];
  enrollmentCount: number;
}

// ─── Profession (public detail) ───────────────────────────────────────────────

export interface ApiProfession {
  id: number;
  name: string;
  title: string;
  subtitle?: string;
  description: string;
  photo: string | null;
  cardImage: string | null;
  icon: string | null;
  decorImage: string | null;
  price: number;
  pricingType: 'FREE' | 'PAID';
  publishDate: string | null;
  partners: ApiPartner[];
  modules: ApiCourseModule[];
  mentor: ApiMentor | null;
  skills: ApiSkillTag[];
  technologies: ApiTechnology[];
  projects: ApiProject[];
  certificates: ApiCertificate[];
  graduates: ApiGraduate[];
  enrollmentCount: number;
}

// ─── Module list (authenticated) ─────────────────────────────────────────────

export interface ApiModuleLesson {
  id: number;
  title: string;
  isPublic: boolean;
  isCompleted: boolean;
}

export interface ApiModuleTest {
  id: number;
  name: string;
  isPassed: boolean | null;
  totalQuestions: number | null;
  correctAnswers: number | null;
}

export interface ApiModule {
  id: number;
  title: string;
  order: number;
  test: ApiModuleTest | null;
  lessons: ApiModuleLesson[] | null;
}

export interface ApiModuleProgress {
  moduleTitile: string | null;
  completedLessonsCount: number;
  totalLessonsCount: number;
}

export interface ApiCourseModules {
  id: number;
  name: string;
  title: string;
  description: string;
  photo: string | null;
  icon: string | null;
  difficulty: string;
  price: number;
  duration: number;
  pricingType: 'FREE' | 'PAID';
  mentor: ApiMentor | null;
  modules: ApiModule[];
  enrollmentCount: number;
  progress: ApiModuleProgress;
  partners: ApiPartner[];
}

// ─── Presale ─────────────────────────────────────────────────────────────────

export interface ApiPresale {
  id: number;
  courseId: number;
  originalPrice: number;
  presalePrice: number;
  discountPercent: number;
  enrolledCount: number;
  isActive: boolean;
  startDate: string | null;
  endDate: string | null;
}

// ─── Waitlist ────────────────────────────────────────────────────────────────

export interface ApiWaitlistEntry {
  id: number;
  courseId: number;
  queueNumber: number;
  courseName?: string;
  coursePhoto?: string;
}

// ─── Promocode ─────────────────────────────────────────────────────────────

export interface ApiPromocodeValidation {
  id: number;
  code: string;
  discountType: 'PERCENT' | 'FIXED';
  discountValue: number;
  isValid: boolean;
}

// ─── Generic API response wrapper ────────────────────────────────────────────

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}
