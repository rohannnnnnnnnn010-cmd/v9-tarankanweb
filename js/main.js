document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const forms = document.querySelectorAll('form[data-inquiry]');
  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const data = Object.fromEntries(new FormData(form).entries());
      console.log('Tarankan inquiry:', data);
      if (status) {
        status.textContent = 'Thank you. Your inquiry has been recorded on this demo site. Connect this form to your email/backend before launch.';
        status.style.marginTop = '15px';
      }
      form.reset();
    });
  });

  document.querySelectorAll('[data-reveal]').forEach(el => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('revealed'); });
    }, {threshold:.15});
    io.observe(el);
  });
});



/* =========================================
   EXPORT MARKETS - SCROLL MAP
   ========================================= */

document.addEventListener("DOMContentLoaded", async function () {

    const mapContainer = document.getElementById("marketsMapSvg");

    if (!mapContainer) return;

    try {

        const response = await fetch("assets/markets/tarankan-world-map.svg");

        if (!response.ok) {
            throw new Error("Could not load world map SVG.");
        }

        const svgText = await response.text();

        mapContainer.innerHTML = svgText;

        const usa = mapContainer.querySelector("#market-usa");
        const germany = mapContainer.querySelector("#market-germany");
        const uae = mapContainer.querySelector("#market-uae");
        const africa = mapContainer.querySelector("#market-africa");
        const bangladesh = mapContainer.querySelector("#market-bangladesh");

        const countries = [
            {
                map: usa,
                label: document.querySelector(".market-label-usa")
            },
            {
                map: germany,
                label: document.querySelector(".market-label-germany")
            },
            {
                map: uae,
                label: document.querySelector(".market-label-uae")
            },
            {
                map: africa,
                label: document.querySelector(".market-label-africa")
            },
            {
                map: bangladesh,
                label: document.querySelector(".market-label-bangladesh")
            }
        ];

        const section = document.querySelector(".markets-animation");

        if (!section) return;

        function updateMarkets() {

            const rect = section.getBoundingClientRect();

            const scrollableHeight =
                section.offsetHeight - window.innerHeight;

            const progress =
                Math.min(
                    Math.max(-rect.top / scrollableHeight, 0),
                    1
                );

            const totalCountries = countries.length;

            /*
             * Divide the scroll into 5 equal stages.
             */
            // const activeCount = Math.min(
            //     Math.floor(progress * totalCountries) + 1,
            //     totalCountries
            // );
            const activeCount = Math.floor(progress * totalCountries);

            /*
             * Keep all previous countries active.
             */
            countries.forEach(function (country, index) {

                const isActive = index < activeCount;

                if (country.map) {
                    country.map.classList.toggle(
                        "is-active",
                        isActive
                    );
                }

                if (country.label) {
                    country.label.classList.toggle(
                        "active",
                        isActive
                    );
                }

            });
        }

        window.addEventListener(
            "scroll",
            updateMarkets,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            updateMarkets
        );

        updateMarkets();

    } catch (error) {

        console.error(
            "Export market map could not be loaded:",
            error
        );

    }

});