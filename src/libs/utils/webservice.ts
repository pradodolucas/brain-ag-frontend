export const callApi = async (
  route: string,
  body = {},
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET"
): Promise<{
  success: boolean;
  data?: any;
  error?: string[];
  status?: number;
}> => {
  try {
    const res = await fetch("http://localhost:3001/" + route, {
      method,
      headers: { "Content-Type": "application/json" },
      body: method !== "GET" ? JSON.stringify(body) : null,
    });

    const contentType = res.headers.get("content-type");
    let responseData: any = null;

    // tenta parsear como JSON se possível
    if (contentType && contentType.includes("application/json")) {
      responseData = await res.json();
    } else {
      responseData = await res.text();
    }

    if (res.ok) {
      return {
        success: true,
        data: responseData,
        status: res.status,
      };
    } else {
      const normalizedError = Array.isArray(responseData?.message)
        ? responseData.message
        : typeof responseData?.message === "string"
        ? [responseData.message]
        : [responseData?.error || `Erro ${res.status}`];

      return {
        success: false,
        error: normalizedError,
        status: res.status,
      };
    }
  } catch (error) {
    console.error("callApi error:", error);
    return {
      success: false,
      error: [error instanceof Error ? error.message : "Erro desconhecido"],
      status: 500,
    };
  }
};
