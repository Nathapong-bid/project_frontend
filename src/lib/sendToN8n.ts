// ในไฟล์ lib/sendToN8n.ts
const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

// Interface สำหรับข้อมูลที่เราจะส่งไป n8n
interface N8nPayload {
    event: "sentence_submitted";
    word: string;
    meaning: string | undefined;
    userSentence: string;
    score: number;
    timestamp: number;
}

export const sendToN8n = async (data: any) => {
    const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    
    if (!N8N_WEBHOOK_URL) {
        console.error("N8N Webhook URL is not configured.");
        return;
    }

    try {
        const response = await fetch(N8N_WEBHOOK_URL, {
            // โค้ดที่ถูกต้องตามมาตรฐาน Fetch API
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(data), 
        });

        // ตรวจสอบ Response
        if (!response.ok) {
            console.error("N8N Webhook failed with status:", response.status);
        }
    } catch (error) {
        console.error("Error sending data to n8n:", error);
    }
};