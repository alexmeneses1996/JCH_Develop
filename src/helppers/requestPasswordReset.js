
export const requestPasswordReset = async (cedula) => {
  try {
    const response = await fetch("/api/request-password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cedula }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error desconocido");
    }

    return { success: true, message: data.mensaje };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
