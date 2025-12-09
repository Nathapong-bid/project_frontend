export async function sendToN8n(payload: any) {
    try {
        const res = await fetch("http://localhost:5678/webhook-test/worddee_event", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        return await res.json();
    } catch (error) {
        console.error("Failed to send to n8n:", error);
    }
}