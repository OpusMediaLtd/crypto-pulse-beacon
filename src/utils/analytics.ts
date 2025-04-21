
export const GA_TRACKING_ID = "G-XXXXXXXXXX"; // Replace with your GA tracking ID

export const initGA = () => {
  if (typeof window !== 'undefined') {
    // Google Analytics initialization code
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID);
  }
};
