export async function getUsers() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/administrative/`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    console.log("before working....");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    console.log("after working....");
    return res.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}
