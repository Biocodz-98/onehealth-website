import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
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
  purchase_type: 'buy_now' | 'subscription';
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

interface PersonaResponse {
  persona_name: string;
}

interface CartResponse {
  items: Array<{
    product_id: number;
    product_name: string;
    product_image: string;
    price: number;
    quantity: number;
    purchase_type: 'buy_now' | 'subscribe';
    duration_months?: number;
    dosage?: string;
    auto_refill?: boolean;
    refill_days?: number;
  }>;
  subtotal: number;
  total: number;
}

interface ProductSurveyItem {
  id: number;
  name: string;
  image: string;
  category?: string;
}

interface ProductSurveyResponse {
  products: ProductSurveyItem[];
}

interface FeedbackRequest {
  type: 'missing_product' | 'general' | 'issue';
  content: string;
}

interface FeedbackResponse {
  id: number;
  type: string;
  content: string;
  created_at: string;
}

interface FeedbackListResponse {
  feedbacks: FeedbackResponse[];
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
  getPersonaData: () => Promise<PersonaResponse>;
  getMedicineProducts: () => Promise<ProductSurveyResponse>;
  getPersonalCareProducts: () => Promise<ProductSurveyResponse>;
  getBabyCareProducts: () => Promise<ProductSurveyResponse>;
  submitConsent: (consent: boolean) => Promise<void>;
  getCart: () => Promise<CartResponse>;
  submitFeedback: (feedback: FeedbackRequest) => Promise<FeedbackResponse>;
  getFeedback: () => Promise<FeedbackListResponse>;
  updateCart: (sessionId: string, item: CartItem) => Promise<any>;
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

      const json: any = await response.json();
      // return json.data;
      return ('data' in json ? json.data : json) as T;
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
      session_id: string;
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

  async getPersona(sessionUuid: string) {
    return this.request<PersonaResponse>(`/persona/${sessionUuid}`, {
      method: 'GET',
    });
  }

  async getMedicineProducts() {
    return this.request<ProductSurveyResponse>('/product-surveys/medicine', {
      method: 'GET',
    });
  }

  async getPersonalCareProducts() {
    return this.request<ProductSurveyResponse>('/product-surveys/skincare', {
      method: 'GET',
    });
  }

  async getBabyCareProducts() {
    return this.request<ProductSurveyResponse>('/product-surveys/babycare', {
      method: 'GET',
    });
  }

  async getCart(sessionUuid: string) {
    return this.request<CartResponse>(`/sessions/${sessionUuid}/cart`, {
      method: 'GET',
    });
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
  async submitFeedback(sessionUuid: string, feedback: FeedbackRequest) {
    return this.request<FeedbackResponse>(`/sessions/${sessionUuid}/feedback`, {
      method: 'POST',
      body: JSON.stringify(feedback),
    });
  }

  async getFeedback(sessionUuid: string) {
    return this.request<FeedbackListResponse>(
      `/sessions/${sessionUuid}/feedback`,
      {
        method: 'GET',
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
      console.log('Setting sessionUuid to:', response.session_id);

      setSessionUuid(response.session_id);
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

  const updateCart = async (sessionUuid: string, item: CartItem) => {
    if (!sessionUuid) throw new Error('No active session');
    setIsLoading(true);
    setError(null);
    try {
      await apiService.updateCart(sessionUuid, item);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to add item to cart';
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

  const getPersonaData = async (): Promise<PersonaResponse> => {
    if (!sessionUuid) throw new Error('No active session');
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.getPersona(sessionUuid);
      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to get persona data';
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

  const getMedicineProducts = async (): Promise<ProductSurveyResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.getMedicineProducts();
      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to get medicine products';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getPersonalCareProducts = async (): Promise<ProductSurveyResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.getPersonalCareProducts();
      return response;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to get personal care products';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getBabyCareProducts = async (): Promise<ProductSurveyResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.getBabyCareProducts();
      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to get baby care products';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getCart = async (): Promise<CartResponse> => {
    if (!sessionUuid) throw new Error('No active session');
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.getCart(sessionUuid);
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to get cart';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const submitFeedback = async (
    feedback: FeedbackRequest,
  ): Promise<FeedbackResponse> => {
    if (!sessionUuid) throw new Error('No active session');
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.submitFeedback(sessionUuid, feedback);
      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to submit feedback';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getFeedback = async (): Promise<FeedbackListResponse> => {
    if (!sessionUuid) throw new Error('No active session');
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.getFeedback(sessionUuid);
      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to get feedback';
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
    getPersonaData,
    submitConsent,
    clearSession,
    getMedicineProducts,
    getPersonalCareProducts,
    getBabyCareProducts,
    updateCart,
    getCart,
    submitFeedback,
    getFeedback,
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
