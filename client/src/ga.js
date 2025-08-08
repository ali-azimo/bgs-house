export const initGA = (measurementId) => {
  if (!measurementId || typeof window === 'undefined') return;
  if (window.gtagInitialized) return; // evita reinicializações

  // injeta script do gtag.js
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', '${measurementId}', {
      send_page_view: false,
      anonymize_ip: true
    });
  `;
  document.head.appendChild(script2);

  window.gtagInitialized = true;
};

export const logPageView = () => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: window.location.pathname + window.location.search,
    });
  }
};
