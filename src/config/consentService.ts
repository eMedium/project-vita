// consentService.ts
export const getConsent = (): boolean | null => {
    const consent = localStorage.getItem("userConsent");
    return consent ? JSON.parse(consent) : null;
  };
  
  export const setConsent = (consent: boolean) => {
    localStorage.setItem("userConsent", JSON.stringify(consent));
  };
  