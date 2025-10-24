import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateHistoryText = async (): Promise<string> => {
  try {
    const prompt = `
    Alanya yakınlarındaki tarihi Herkül Köprüsü (Roma Köprüsü) hakkında, profesyonel bir tarih veya arkeoloji sitesinde yer alacakmış gibi bilgilendirici bir metin yaz.
    - Metin kısa bir paragraf (yaklaşık 4-5 cümle) uzunluğunda olsun.
    - Konu: Köprünün Roma İmparatorluğu döneminde, muhtemelen M.S. 2. yüzyılda, yakındaki antik Syedra kentine hizmet etmek için inşa edildiğini belirt.
    - Mimari: Kuru duvar tekniğiyle (harçsız) yerleştirilmiş büyük kesme taş bloklardan yapıldığını ve Roma mühendisliğinin dayanıklılığını sergilediğini vurgula.
    - Ton: Metin tamamen bilgilendirici, nesnel ve akıcı olmalı. Kişisel veya romantik bir ton içermemeli, sanki rastgele keşfedilmiş bir bilgi kaynağı gibi durmalı.
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating history text:", error);
    return "Tarihin derinliklerinden bir hata süzüldü. Lütfen daha sonra tekrar deneyin.";
  }
};

export const generateProposalText = async (): Promise<string> => {
    try {
        const prompt = `
        Bir evlilik teklifi için kısa, samimi ve çok romantik bir metin hazırla. Metin şu ana fikri işlemeli:
        - İsim: Emirhan
        - İlişki süresi: 8 yıl
        - Tema: Emirhan, 8 yıllık muhteşem yolculuklarının ardından, bu tarihi köprünün şahitliğinde hayatlarının bir sonraki bölümüne birlikte başlamak istiyor. Bu sadece bir soru değil, bir ömür boyu sürecek bir maceraya davet.
        - Metin, 'Benimle evlenir misin?' sorusuyla bitmeli. Metni uzun ve şiirsel yapma, kısa ve kalpten olsun.
        `;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error generating proposal text:", error);
        return "Sonsuzluğa uzanan bu yolda, kelimeler kifayesiz kaldı... Ama kalbimdeki soru baki: Benimle evlenir misin?";
    }
};