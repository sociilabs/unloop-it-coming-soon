"use server"

export async function subscribeToBrevo(
  _prevState: { success: boolean; message: string } | undefined,
  formData?: FormData,
) {
  // 1️⃣ Guard: first render = no formData
  if (!formData) {
    return { success: false, message: "" }
  }

  const email = formData.get("email") as string | null
  if (!email) {
    return {
      success: false,
      message: "Email is required",
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address",
    }
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY || "",
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          FIRSTNAME: "",
          LASTNAME: "",
        },
        listIds: [Number.parseInt(process.env.BREVO_LIST_ID || "1")], // Your Brevo list ID
        updateEnabled: true, // Update contact if already exists
      }),
    })

    // Brevo returns 201 with an empty body on success.
    if (response.ok) {
      return {
        success: true,
        message: "Successfully subscribed! We'll notify you when we launch.",
      }
    }

    // Non-2xx → try to extract JSON error, but guard against empty body
    let data: any = {}
    try {
      data = await response.json()
    } catch {
      /* body empty */
    }

    // Handle specific Brevo errors
    if (data?.code === "duplicate_parameter") {
      return {
        success: true,
        message: "You're already subscribed! We'll notify you when we launch.",
      }
    }

    console.error("Brevo API Error:", data)
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  } catch (error) {
    console.error("Subscription error:", error)
    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
    }
  }
}
