export interface ContactInquiry {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  serviceType?: string;
  createdAt?: string;
}

export interface SubmissionResult {
  success: boolean;
  message: string;
  storageTarget: 'supabase' | 'web3forms' | 'local_storage';
}

const LOCAL_STORAGE_KEY = 'portfolio_inquiries';

/**
 * Submit contact inquiry to configured database (Supabase, Web3Forms)
 * with automatic fallback to localStorage.
 */
export async function submitInquiry(inquiry: ContactInquiry): Promise<SubmissionResult> {
  const timestamp = new Date().toISOString();
  const inquiryData: ContactInquiry = {
    ...inquiry,
    id: inquiry.id || `inq_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    createdAt: timestamp,
  };

  // 1. Always backup locally to localStorage
  saveToLocalStorage(inquiryData);

  // Read environment variables
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  // 2. If Supabase is configured, store in Supabase PostgreSQL database
  if (supabaseUrl && supabaseAnonKey) {
    try {
      const response = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/contact_submissions`, {
        method: 'POST',
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          name: inquiryData.name,
          email: inquiryData.email,
          phone: inquiryData.phone || '',
          message: inquiryData.message,
          service_type: inquiryData.serviceType || 'General Project',
          created_at: inquiryData.createdAt,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn('Supabase submission returned error:', response.status, errorText);
        // Fall back gracefully
      } else {
        return {
          success: true,
          message: 'Saved to Supabase database successfully',
          storageTarget: 'supabase',
        };
      }
    } catch (err) {
      console.error('Supabase network error, stored locally:', err);
    }
  }

  // 3. If Web3Forms is configured, forward via email/cloud inbox
  if (web3FormsKey) {
    try {
      const formData = new FormData();
      formData.append('access_key', web3FormsKey);
      formData.append('name', inquiryData.name);
      formData.append('email', inquiryData.email);
      formData.append('replyto', inquiryData.email);
      formData.append('message', inquiryData.message);
      formData.append('service_type', inquiryData.serviceType || 'General Project');
      formData.append('subject', `🚀 New Project Inquiry: ${inquiryData.name} (${inquiryData.email})`);
      formData.append('from_name', `${inquiryData.name} (Portfolio)`);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        return {
          success: true,
          message: 'Forwarded via Web3Forms successfully',
          storageTarget: 'web3forms',
        };
      } else {
        console.warn('Web3Forms response was not success:', data);
      }
    } catch (err) {
      console.error('Web3Forms network error, stored locally:', err);
    }
  }

  // 4. Default: Simulating a brief delay (400ms) for pleasant UX and returning local storage result
  await new Promise((resolve) => setTimeout(resolve, 450));

  return {
    success: true,
    message: 'Saved to local storage successfully',
    storageTarget: 'local_storage',
  };
}

/**
 * Save entry to browser's localStorage
 */
function saveToLocalStorage(inquiry: ContactInquiry) {
  try {
    const existing = localStorage.getItem(LOCAL_STORAGE_KEY);
    const inquiries: ContactInquiry[] = existing ? JSON.parse(existing) : [];
    inquiries.unshift(inquiry);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(inquiries));
    console.info('Saved contact inquiry to localStorage:', inquiry);
  } catch (err) {
    console.error('Could not save to localStorage:', err);
  }
}

/**
 * Retrieve saved local inquiries (useful for testing & admin preview)
 */
export function getStoredInquiries(): ContactInquiry[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
