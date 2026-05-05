const API_BASE =
typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE ||
'http://localhost:3000/api';

// --- Fallback Data ---
const fallbackSettings = {
  business_name: 'Havenique Home Based Nursing Care',
  slogan:
  'Compassionate · Reliable · Confidential — Care in the Comfort of Your Home',
  phone: '+260 965 556 390',
  phone2: '+260 978 299 696',
  email: 'haveniquecare.zm@gmail.com',
  address: 'Lusaka, Zambia',
  whatsapp: '260978299696',
  emergency_number: '+260 965 556 390',
  year: new Date().getFullYear()
};

const fallbackServices = [
{
  id: 1,
  name: 'Wound Dressing',
  description:
  'Professional care and dressing of surgical, acute, and chronic wounds.',
  icon: 'Bandage'
},
{
  id: 2,
  name: 'Catheter Care',
  description:
  'Insertion, maintenance, and removal of urinary catheters with strict hygiene.',
  icon: 'Activity'
},
{
  id: 3,
  name: 'Health Education',
  description:
  'Empowering patients and families with knowledge for better health management.',
  icon: 'BookOpen'
},
{
  id: 4,
  name: 'Counselling',
  description:
  'Emotional and psychological support for patients and their families.',
  icon: 'Heart'
},
{
  id: 5,
  name: 'Colostomy Care',
  description:
  'Expert assistance with stoma care, bag changes, and skin maintenance.',
  icon: 'Shield'
},
{
  id: 6,
  name: 'Cannulation & IV Care',
  description:
  'Safe administration of intravenous fluids and medications at home.',
  icon: 'Droplet'
},
{
  id: 7,
  name: 'Mobility Assistance',
  description:
  'Help with moving, walking, and transferring to prevent falls and injuries.',
  icon: 'Users'
},
{
  id: 8,
  name: 'Newborn Bathing',
  description: 'Gentle, professional bathing and care for your newborn baby.',
  icon: 'Smile'
},
{
  id: 9,
  name: 'Bed Bath & Grooming',
  description:
  'Maintaining personal hygiene and dignity for bedbound patients.',
  icon: 'UserCheck'
},
{
  id: 10,
  name: 'Post-Hospital Care',
  description:
  'Smooth transition and continued care after hospital discharge.',
  icon: 'Home'
},
{
  id: 11,
  name: 'Palliative Care',
  description: 'Compassionate care focusing on comfort and quality of life.',
  icon: 'Heart'
},
{
  id: 12,
  name: 'Midwifery Services',
  description: 'Antenatal and postnatal care by qualified midwives.',
  icon: 'Users'
},
{
  id: 13,
  name: 'Stroke Patient Care',
  description:
  'Specialized support and rehabilitation assistance for stroke survivors.',
  icon: 'Activity'
},
{
  id: 14,
  name: 'Diabetes Management',
  description:
  'Blood sugar monitoring, insulin administration, and dietary advice.',
  icon: 'Droplet'
},
{
  id: 15,
  name: 'Hypertension Monitoring',
  description: 'Regular blood pressure checks and medication management.',
  icon: 'Activity'
},
{
  id: 16,
  name: 'Medication Administration',
  description:
  'Ensuring correct dosage and timing of prescribed medications.',
  icon: 'Shield'
},
{
  id: 17,
  name: 'Dementia Care',
  description:
  'Patient, understanding support for individuals with memory loss.',
  icon: 'UserCheck'
},
{
  id: 18,
  name: 'Physiotherapy at Home',
  description:
  'Exercises and therapies to improve mobility and relieve pain.',
  icon: 'Activity'
},
{
  id: 19,
  name: 'Nutrition Support',
  description: 'Meal planning and feeding assistance for optimal health.',
  icon: 'Smile'
},
{
  id: 20,
  name: 'Post-Surgical Care',
  description: 'Monitoring and support during the critical recovery period.',
  icon: 'Shield'
}];


const fallbackStaff = [
{
  id: 1,
  name: 'Womba Kampeu',
  role: 'CEO',
  tags: ['Leadership', 'Management'],
  bio: 'Womba Kampeu leads Havenique with a vision to transform home-based healthcare in Zambia, ensuring every patient receives compassionate, professional care in their own home.',
  qualifications: [
  'BSc Business Administration',
  'Healthcare Management Certificate']

},
{
  id: 2,
  name: 'Queen Blessing Kampewu',
  role: 'Vice CEO / Registered Nurse',
  tags: ['RN', 'HIV Nurse Practitioner'],
  bio: 'Queen Blessing is a highly experienced Registered Nurse and HIV Nurse Practitioner. She oversees all clinical operations, ensuring the highest standards of medical care are delivered to our patients.',
  qualifications: [
  'BSc Nursing',
  'Registered Nurse (GNC)',
  'Certified HIV Nurse Practitioner']

}];


const fallbackTestimonials = [
{
  id: 1,
  name: 'Sarah M.',
  location: 'Kabulonga',
  rating: 5,
  quote:
  "The nurses from Havenique were incredibly professional and compassionate during my mother's recovery. Highly recommended."
},
{
  id: 2,
  name: 'David K.',
  location: 'Woodlands',
  rating: 5,
  quote:
  'Having 24/7 access to such qualified professionals gave our family immense peace of mind. Thank you, Havenique.'
},
{
  id: 3,
  name: 'Grace C.',
  location: 'Roma',
  rating: 5,
  quote:
  'Excellent wound care service. The nurse was punctual, gentle, and very knowledgeable.'
}];


const fallbackFaq = [
{
  id: 1,
  question: 'What areas do you cover?',
  answer:
  'We currently provide home-based nursing care across all major neighborhoods in Lusaka, Zambia.'
},
{
  id: 2,
  question: 'How do I book a visit?',
  answer:
  'You can book a visit by calling our main line, sending us a WhatsApp message, or filling out the contact form on our website. We will assess your needs and schedule a nurse.'
},
{
  id: 3,
  question: 'Are your nurses registered?',
  answer:
  'Yes, all our nurses are fully qualified and registered with the General Nursing Council of Zambia (GNC).'
},
{
  id: 4,
  question: 'What happens in an emergency?',
  answer:
  'We have a 24/7 emergency support line for our registered patients. In case of a life-threatening medical emergency, we advise calling an ambulance while our team provides immediate over-the-phone guidance.'
},
{
  id: 5,
  question: 'Do you offer payment plans?',
  answer:
  'We offer various payment options and packages depending on the level and duration of care required. Please contact us for a customized quote.'
}];


const fallbackPricing = [
{
  id: 1,
  name: 'Basic Care Visit',
  price: '450',
  features: [
  'Up to 2 hours',
  'Vitals check',
  'Medication administration',
  'Basic grooming'],

  isPopular: false
},
{
  id: 2,
  name: 'Standard Daily Care',
  price: '1,200',
  features: [
  '8-hour shift',
  'Full personal care',
  'Meal assistance',
  'Mobility support',
  'Vitals monitoring'],

  isPopular: true
},
{
  id: 3,
  name: '24-Hour Premium Care',
  price: '2,800',
  features: [
  'Round-the-clock care',
  'Dedicated nursing team',
  'Complex care management',
  'Emergency support priority'],

  isPopular: false
}];


const fallbackAbout = {
  story:
  'Havenique Home Based Nursing Care was founded with a simple yet profound mission: to bring professional, compassionate healthcare directly to the homes of those who need it most in Lusaka. We understand that healing and comfort are often best achieved in familiar surroundings.',
  mission:
  'To provide exceptional, personalized home-based nursing care that enhances the quality of life, promotes independence, and preserves the dignity of our patients.',
  service_areas: 'Lusaka and surrounding districts.'
};

const fallbackBlogPosts = [
{
  id: 1,
  slug: 'benefits-of-home-nursing',
  title: 'The Benefits of Home-Based Nursing Care',
  category: 'Healthcare',
  excerpt:
  'Discover why more families are choosing home-based care for their loved ones recovering from illness or surgery.',
  date: '2026-01-12',
  content:
  '<p>Home-based nursing care offers numerous advantages over prolonged hospital stays. It allows patients to recover in a familiar, comfortable environment, which can significantly reduce stress and promote faster healing.</p><p>Furthermore, it provides personalized, one-on-one attention that is often difficult to achieve in a busy hospital setting.</p>'
},
{
  id: 2,
  slug: 'managing-diabetes-at-home',
  title: 'Managing Diabetes Effectively at Home',
  category: 'Wellness',
  excerpt:
  'Practical tips for monitoring blood sugar, maintaining a healthy diet, and knowing when to call a nurse.',
  date: '2026-02-25',
  content:
  '<p>Managing diabetes at home requires consistency and education. Regular blood sugar monitoring, a balanced diet, and proper medication administration are key.</p><p>Our nurses at Havenique can assist with setting up a routine and providing the necessary education to empower patients.</p>'
},
{
  id: 3,
  slug: 'caring-for-elderly-parents',
  title: 'A Guide to Caring for Elderly Parents',
  category: 'Family Care',
  excerpt:
  'Balancing your own life while ensuring your aging parents receive the care and respect they deserve.',
  date: '2026-03-18',
  content:
  "<p>Caring for aging parents is a noble but challenging responsibility. It's important to recognize when professional help is needed to ensure their safety and well-being, while also preventing caregiver burnout.</p>"
}];


// --- API Helper ---
const fetchWithFallback = async <T,>(
url: string,
fallback: T,
options?: RequestInit)
: Promise<T> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.warn(`API fetch failed for ${url}, using fallback data.`, error);
    return fallback;
  }
};

// --- API Service ---
export const api = {
  getSettings: () =>
  fetchWithFallback(`${API_BASE}/settings`, fallbackSettings),
  getAbout: () => fetchWithFallback(`${API_BASE}/about`, fallbackAbout),
  getServices: () =>
  fetchWithFallback(`${API_BASE}/services`, fallbackServices),
  getStaff: () => fetchWithFallback(`${API_BASE}/staff`, fallbackStaff),
  getPricing: () => fetchWithFallback(`${API_BASE}/pricing`, fallbackPricing),
  getBlogPosts: (params?: Record<string, string>) => {
    const qs = params ? `?${new URLSearchParams(params)}` : '';
    return fetchWithFallback(`${API_BASE}/blog${qs}`, fallbackBlogPosts);
  },
  getBlogPost: (slug: string) => {
    const post =
    fallbackBlogPosts.find((p) => p.slug === slug) || fallbackBlogPosts[0];
    return fetchWithFallback(`${API_BASE}/blog/${slug}`, post);
  },
  getTestimonials: () =>
  fetchWithFallback(`${API_BASE}/testimonials`, fallbackTestimonials),
  getFaq: () => fetchWithFallback(`${API_BASE}/faq`, fallbackFaq),
  submitContact: async (data: any) => {
    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to submit');
      return await response.json();
    } catch (error) {
      console.warn('Contact submit failed, simulating success.', error);
      return { success: true, message: 'Message sent successfully (fallback)' };
    }
  }
};