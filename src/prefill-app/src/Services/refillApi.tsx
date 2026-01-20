import {
  useState,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
} from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  account_status: string;
}

interface Session {
  id: string;
  phase: string;
  last_activity_at: string;
  can_resume: boolean;
}

interface SurveyAnswer {
  question_key: string;
  value: string[];
}

interface CartItem {
  product_id: number;
  quantity: number;
  purchase_type: 'buy_now' | 'subscribe';
  duration_months?: number;
}

interface DeliveryInfo {
  name: string;
  phone: string;
  address: string;
  lga: string;
  state: string;
}

interface SessionResponse {
  session: Session;
  user: User;
  survey: {
    medicines: SurveyAnswer[];
    personal_care: SurveyAnswer[];
  };
  cart: CartItem[];
  persona: string | null;
}

interface CheckoutResponse {
  checkout_id: number;
  payment_status: string;
}

interface SuccessResponse {
  persona: string;
  summary_card_url: string;
  share: {
    whatsapp: string;
    instagram: string;
  };
  consent_required: boolean;
  medicines?: Array<{
    id: string;
    name: string;
    dosage: string;
    image: string;
  }>;
}

interface RefillContextType {
  sessionUuid: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  startSession: (data: {
    name: string;
    email: string;
    phone: string;
    medicine_type: string;
  }) => Promise<void>;
  resumeSession: (sessionId: string) => Promise<SessionResponse>;
  saveSurvey: (category: string, answers: SurveyAnswer[]) => Promise<void>;
  addToCart: (item: CartItem) => Promise<void>;
  addToWishlist: (productId: number) => Promise<void>;
  checkout: (
    delivery: DeliveryInfo,
    paymentType: string,
  ) => Promise<CheckoutResponse>;
  getSuccessData: () => Promise<SuccessResponse>;
  submitConsent: (consent: boolean) => Promise<void>;
  clearSession: () => void;
}

const BASE_URL = 'https://dev.onehealthng.com/api/v1/refill';

class RefillAPIService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    const defaultHeaders = { 'Content-Type': 'application/json' };

    try {
      const response = await fetch(url, {
        ...options,
        headers: { ...defaultHeaders, ...options.headers },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `HTTP ${response.status}: ${response.statusText}`,
        );
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async startSession(data: {
    name: string;
    email: string;
    phone: string;
    medicine_type: string;
  }) {
    return this.request<{
      session_id: string; // Changed from session_uuid
      user_type: string;
      status: string;
      next_phase: string;
    }>('/start', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getSession(sessionUuid: string) {
    return this.request<SessionResponse>(`/sessions/${sessionUuid}`, {
      method: 'GET',
    });
  }

  async saveSurvey(
    sessionUuid: string,
    category: string,
    answers: SurveyAnswer[],
  ) {
    return this.request<{ saved: boolean; next_phase: string }>(
      `/sessions/${sessionUuid}/survey`,
      {
        method: 'PATCH',
        body: JSON.stringify({ category, answers }),
      },
    );
  }

  async updateCart(sessionUuid: string, item: CartItem) {
    return this.request<{ cart_updated: boolean }>(
      `/sessions/${sessionUuid}/cart`,
      {
        method: 'PATCH',
        body: JSON.stringify(item),
      },
    );
  }

  async addToWishlist(sessionUuid: string, productId: number) {
    return this.request<{ wishlisted: boolean }>(
      `/sessions/${sessionUuid}/wishlist`,
      {
        method: 'POST',
        body: JSON.stringify({ product_id: productId }),
      },
    );
  }

  async checkout(
    sessionUuid: string,
    delivery: DeliveryInfo,
    paymentType: string,
  ) {
    return this.request<CheckoutResponse>(`/sessions/${sessionUuid}/checkout`, {
      method: 'POST',
      body: JSON.stringify({ delivery, payment_type: paymentType }),
    });
  }

  async getSuccess(sessionUuid: string) {
    return this.request<SuccessResponse>(`/sessions/${sessionUuid}/success`, {
      method: 'GET',
    });
  }

  async submitConsent(sessionUuid: string, consent: boolean) {
    return this.request<{ completed: boolean }>(
      `/sessions/${sessionUuid}/consent`,
      {
        method: 'POST',
        body: JSON.stringify({ consent }),
      },
    );
  }
}

const apiService = new RefillAPIService();

const RefillContext = createContext<RefillContextType | undefined>(undefined);

export const RefillProvider = ({ children }: { children: ReactNode }) => {
  const [sessionUuid, setSessionUuid] = useState<string | null>(() =>
    localStorage.getItem('refill_session_uuid'),
  );
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('refill_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionUuid) {
      localStorage.setItem('refill_session_uuid', sessionUuid);
    } else {
      localStorage.removeItem('refill_session_uuid');
    }
  }, [sessionUuid]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('refill_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('refill_user');
    }
  }, [user]);

  const startSession = async (data: {
    name: string;
    email: string;
    phone: string;
    medicine_type: string;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.startSession(data);
      console.log('API Response:', response);
      console.log('Setting sessionUuid to:', response.session_id); // Changed from session_uuid

      setSessionUuid(response.session_id); // Changed from session_uuid
      setUser({
        id: 0,
        name: data.name,
        email: data.email,
        phone: data.phone,
        account_status: response.status,
      });

      console.log('Session state updated');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to start session';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resumeSession = async (sessionId: string): Promise<SessionResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.getSession(sessionId);
      setSessionUuid(response.session.id);
      setUser(response.user);
      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to resume session';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const saveSurvey = async (category: string, answers: SurveyAnswer[]) => {
    if (!sessionUuid) throw new Error('No active session');
    setIsLoading(true);
    setError(null);
    try {
      await apiService.saveSurvey(sessionUuid, category, answers);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to save survey';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (item: CartItem) => {
    if (!sessionUuid) throw new Error('No active session');
    setIsLoading(true);
    setError(null);
    try {
      await apiService.updateCart(sessionUuid, item);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to add to cart';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const addToWishlist = async (productId: number) => {
    if (!sessionUuid) throw new Error('No active session');
    setIsLoading(true);
    setError(null);
    try {
      await apiService.addToWishlist(sessionUuid, productId);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to add to wishlist';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const checkout = async (
    delivery: DeliveryInfo,
    paymentType: string,
  ): Promise<CheckoutResponse> => {
    if (!sessionUuid) throw new Error('No active session');
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.checkout(
        sessionUuid,
        delivery,
        paymentType,
      );
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to checkout';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getSuccessData = async (): Promise<SuccessResponse> => {
    if (!sessionUuid) throw new Error('No active session');
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.getSuccess(sessionUuid);
      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to get success data';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const submitConsent = async (consent: boolean) => {
    if (!sessionUuid) throw new Error('No active session');
    setIsLoading(true);
    setError(null);
    try {
      await apiService.submitConsent(sessionUuid, consent);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to submit consent';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearSession = () => {
    setSessionUuid(null);
    setUser(null);
    setError(null);
    localStorage.removeItem('refill_session_uuid');
    localStorage.removeItem('refill_user');
  };

  const value: RefillContextType = {
    sessionUuid,
    user,
    isLoading,
    error,
    startSession,
    resumeSession,
    saveSurvey,
    addToCart,
    addToWishlist,
    checkout,
    getSuccessData,
    submitConsent,
    clearSession,
  };

  return (
    <RefillContext.Provider value={value}>{children}</RefillContext.Provider>
  );
};

export const useRefill = () => {
  const context = useContext(RefillContext);
  if (!context) {
    throw new Error('useRefill must be used within RefillProvider');
  }
  return context;
};
