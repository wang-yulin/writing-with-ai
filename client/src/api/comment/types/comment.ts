export interface CreateRequestData {
  id: string;
}

export interface CreateResponseData {
  model: string;
  created_at: string;
  message: {
    role: string;
    content: string;
  };
  done_reason: string;
  done: boolean;
}
