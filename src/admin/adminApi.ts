const API_BASE =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE ||
  'http://localhost:3000/api';

// Helper to get token
const getToken = () => localStorage.getItem('havenique_admin_token');

// Helper for authenticated fetch
const authFetch = async (url: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  return response.json();
};

// --- Fallback Data ---
const fallbackStats = {
  totalServices: 20,
  totalStaff: 2,
  blogPosts: 3,
  unreadMessages: 2
};

const fallbackMessages = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '0971234567',
    service: 'Wound Dressing',
    message: 'Need someone to look at a surgical wound.',
    date: '2026-04-08T10:00:00Z',
    read: false
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '0969876543',
    service: 'Palliative Care',
    message: 'Inquiring about care for my elderly mother.',
    date: '2026-03-29T14:30:00Z',
    read: false
  },
  {
    id: 3,
    name: 'Peter Banda',
    email: 'peter@example.com',
    phone: '0955555555',
    service: 'Physiotherapy',
    message: 'Do you offer home physio?',
    date: '2026-02-14T09:15:00Z',
    read: true
  }
];

const fallbackServices = [
  {
    id: 1,
    name: 'Wound Dressing',
    description: 'Professional care and dressing of surgical, acute, and chronic wounds.',
    icon: 'Bandage',
    visible: true,
    order: 1
  },
  {
    id: 2,
    name: 'Catheter Care',
    description: 'Insertion, maintenance, and removal of urinary catheters with strict hygiene.',
    icon: 'Activity',
    visible: true,
    order: 2
  }
];

const fallbackStaff = [
  {
    id: 1,
    name: 'Womba Kampewu',
    role: 'CEO',
    tags: ['Leadership', 'Management'],
    bio: 'Womba Kampewu leads Havenique with a vision to transform home-based healthcare in Zambia.',
    qualifications: ['BSc Business Administration'],
    visible: true,
    order: 1,
    isFounder: true
  },
  {
    id: 2,
    name: 'Queen Blessing Kampewu',
    role: 'Vice CEO / Registered Nurse',
    tags: ['RN', 'HIV Nurse Practitioner'],
    bio: 'Queen Blessing is a highly experienced Registered Nurse and HIV Nurse Practitioner.',
    qualifications: ['BSc Nursing', 'Registered Nurse (GNC)', 'Certified HIV Nurse Practitioner'],
    visible: true,
    order: 2,
    isFounder: true
  }
];

const fallbackTestimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    location: 'Kabulonga',
    rating: 5,
    quote: 'The nurses from Havenique were incredibly professional...',
    status: 'approved',
    date: '2026-09-15'
  },
  {
    id: 2,
    name: 'David K.',
    location: 'Woodlands',
    rating: 5,
    quote: 'Having 24/7 access to such qualified professionals...',
    status: 'approved',
    date: '2026-09-20'
  },
  {
    id: 3,
    name: 'Anonymous',
    location: 'Roma',
    rating: 4,
    quote: 'Good service but arrived a bit late.',
    status: 'pending',
    date: '2026-04-15'
  }
];

const fallbackBlogPosts = [
  {
    id: 1,
    slug: 'benefits-of-home-nursing',
    title: 'The Benefits of Home-Based Nursing Care',
    category: 'Healthcare',
    excerpt: 'Discover why more families are choosing home-based care...',
    date: '2026-01-12',
    status: 'published'
  },
  {
    id: 2,
    slug: 'managing-diabetes-at-home',
    title: 'Managing Diabetes Effectively at Home',
    category: 'Wellness',
    excerpt: 'Practical tips for monitoring blood sugar...',
    date: '2026-02-25',
    status: 'draft'
  }
];

// --- API Service ---
export const adminApi = {
  login: async (credentials: any) => {
    const response = await fetch(`${API_BASE}/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    if (!response.ok) throw new Error('Invalid email or password');
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('havenique_admin_token', data.token);
    }
    return data;
  },

  logout: async () => {
    localStorage.removeItem('havenique_admin_token');
    try {
      await authFetch(`${API_BASE}/admin/auth/logout`, { method: 'POST' });
    } catch (e) {
      // Ignore logout errors
    }
  },

  getDashboard: async () => {
    try {
      return await authFetch(`${API_BASE}/admin/dashboard`);
    } catch (e) {
      return { stats: fallbackStats, recent_submissions: fallbackMessages };
    }
  },

  getSettings: async () => {
    try {
      return await authFetch(`${API_BASE}/admin/settings`);
    } catch (e) {
      return {
        business_name: 'Havenique Home Based Nursing Care',
        slogan: 'Compassionate · Reliable · Confidential — Care in the Comfort of Your Home',
        phone_primary: '+260 965 556 390',
        phone_secondary: '+260 978 299 696',
        email: 'haveniquecare.zm@gmail.com',
        address: 'Lusaka, Zambia',
        whatsapp: '260978299696',
        emergency_number: '+260 965 556 390',
        facebook_url: '',
        instagram_url: '',
        maps_embed_url: '',
        logo_url: ''
      };
    }
  },

  updateSettings: async (data: any) => {
    return await authFetch(`${API_BASE}/admin/settings`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }).catch((e) => {
      console.error('Failed to update settings:', e);
      throw e;
    });
  },

  getAbout: async () => {
    try {
      return await authFetch(`${API_BASE}/admin/about`);
    } catch (e) {
      return {
        story: 'Havenique Home Based Nursing Care was founded with a simple yet profound mission...',
        mission: 'To provide exceptional, personalized home-based nursing care that enhances the quality of life.',
        year_established: 2026,
        service_areas: 'Lusaka and surrounding districts.'
      };
    }
  },

  updateAbout: async (data: any) => {
    return await authFetch(`${API_BASE}/admin/about`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }).catch((e) => {
      console.error('Failed to update about page:', e);
      throw e;
    });
  },

  getServices: async () => {
    try {
      return await authFetch(`${API_BASE}/admin/services`);
    } catch (e) {
      return fallbackServices;
    }
  },
  createService: async (data: any) => {
    return await authFetch(`${API_BASE}/admin/services`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  updateService: async (id: string, data: any) => {
    return await authFetch(`${API_BASE}/admin/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },
  deleteService: async (id: string) => {
    return await authFetch(`${API_BASE}/admin/services/${id}`, {
      method: 'DELETE'
    });
  },

  getStaff: async () => {
    try {
      return await authFetch(`${API_BASE}/admin/staff`);
    } catch (e) {
      return fallbackStaff;
    }
  },
  createStaff: async (data: any) => {
    return await authFetch(`${API_BASE}/admin/staff`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  updateStaff: async (id: string, data: any) => {
    return await authFetch(`${API_BASE}/admin/staff/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },
  deleteStaff: async (id: string) => {
    return await authFetch(`${API_BASE}/admin/staff/${id}`, { method: 'DELETE' });
  },

  getPricing: async () => {
    try {
      return await authFetch(`${API_BASE}/admin/pricing`);
    } catch (e) {
      return [];
    }
  },
  createPricing: async (data: any) => {
    return await authFetch(`${API_BASE}/admin/pricing`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  updatePricing: async (id: string, data: any) => {
    return await authFetch(`${API_BASE}/admin/pricing/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },
  deletePricing: async (id: string) => {
    return await authFetch(`${API_BASE}/admin/pricing/${id}`, { method: 'DELETE' });
  },

  getBlogPosts: async () => {
    try {
      return await authFetch(`${API_BASE}/admin/blog`);
    } catch (e) {
      return fallbackBlogPosts;
    }
  },
  createBlogPost: async (data: any) => {
    return await authFetch(`${API_BASE}/admin/blog`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  updateBlogPost: async (id: string, data: any) => {
    return await authFetch(`${API_BASE}/admin/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },
  deleteBlogPost: async (id: string) => {
    return await authFetch(`${API_BASE}/admin/blog/${id}`, { method: 'DELETE' });
  },

  getFaq: async () => {
    try {
      return await authFetch(`${API_BASE}/admin/faq`);
    } catch (e) {
      return [];
    }
  },
  createFaq: async (data: any) => {
    return await authFetch(`${API_BASE}/admin/faq`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  updateFaq: async (id: string, data: any) => {
    return await authFetch(`${API_BASE}/admin/faq/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },
  deleteFaq: async (id: string) => {
    return await authFetch(`${API_BASE}/admin/faq/${id}`, { method: 'DELETE' });
  },

  getTestimonials: async () => {
    try {
      return await authFetch(`${API_BASE}/admin/testimonials`);
    } catch (e) {
      return fallbackTestimonials;
    }
  },
  updateTestimonial: async (id: string, data: any) => {
    return await authFetch(`${API_BASE}/admin/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },
  deleteTestimonial: async (id: string) => {
    return await authFetch(`${API_BASE}/admin/testimonials/${id}`, { method: 'DELETE' });
  },

  getInbox: async () => {
    try {
      return await authFetch(`${API_BASE}/admin/contact`);
    } catch (e) {
      return fallbackMessages;
    }
  },
  markAsRead: async (id: string) => {
    return await authFetch(`${API_BASE}/admin/contact/${id}/read`, { method: 'PUT' }).catch((e) => {
      console.error('Failed to mark message as read:', e);
      throw e;
    });
  },
  deleteMessage: async (id: string) => {
    return await authFetch(`${API_BASE}/admin/contact/${id}`, { method: 'DELETE' });
  },

  uploadImage: async (file: File) => {
    const token = getToken();
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_BASE}/admin/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    if (!response.ok) throw new Error('Upload failed');
    return response.json();
  }
};
