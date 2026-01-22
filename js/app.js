document.addEventListener('DOMContentLoaded', function () {

    function sanitizeHTML(text) {
        const temp = document.createElement('div');
        temp.textContent = text;
        return temp.innerHTML;
    }

    // Data - Using verified Unsplash IDs to avoid broken/premium links
    const continents = [
        {
            name: "North America",
            coords: [45, -100],
            zoom: 3.5,
            description: "Vast forests, towering cities, and grand canyons.",
            facts: [
                "Home to over 500 million people.",
                "Has the longest coastline in the world (Canada).",
                "Contains the world's largest freshwater lake."
            ],
            gallery: [
                "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Mountain
                "https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Ice/Glacier
                "https://images.unsplash.com/photo-1501693988750-8495148d47e6?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop"  // Mountain Landscape
            ],
            wikiLink: "https://en.wikipedia.org/wiki/North_America"
        },
        {
            name: "South America",
            coords: [-15, -60],
            zoom: 3.5,
            description: "The Amazon rainforest and the Andes mountains.",
            facts: [
                "Home to the world's largest river by volume (Amazon).",
                "Longest continental mountain range (Andes).",
                "Driest non-polar desert on Earth (Atacama)."
            ],
            gallery: [
                "https://images.unsplash.com/photo-1594858737685-dd84d45f1b4c?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Green/Hills
                "https://images.unsplash.com/photo-1516926133025-705ee504386d?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Desert
                "https://images.unsplash.com/photo-1501693988750-8495148d47e6?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop"  // Mountain
            ],
            wikiLink: "https://en.wikipedia.org/wiki/South_America"
        },
        {
            name: "Europe",
            coords: [50, 15],
            zoom: 4.5,
            description: "Ancient history, diverse cultures, and modern art.",
            facts: [
                "Second smallest continent, but high density.",
                "Birthplace of Western civilization.",
                "Home to the world's smallest country (Vatican City)."
            ],
            gallery: [
                "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Forest/Lake
                "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Forest/Mist
                "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop"  // Mountain
            ],
            wikiLink: "https://en.wikipedia.org/wiki/Europe"
        },
        {
            name: "Africa",
            coords: [0, 20],
            zoom: 3.5,
            description: "Majestic wildlife, vast deserts, and rich traditions.",
            facts: [
                "World's hottest continent.",
                "Home to the Sahara Desert.",
                "The Nile is the longest river in the world."
            ],
            gallery: [
                "https://images.unsplash.com/photo-1601692422905-989203a4e977?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Savanna
                "https://images.unsplash.com/photo-1516926133025-705ee504386d?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Desert
                "https://images.unsplash.com/photo-1594858737685-dd84d45f1b4c?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop"  // Green/Jungle
            ],
            wikiLink: "https://en.wikipedia.org/wiki/Africa"
        },
        {
            name: "Asia",
            coords: [40, 100],
            zoom: 3.5,
            description: "The largest continent, full of contrasts and wonders.",
            facts: [
                "Most populous continent (4.5+ billion).",
                "Home to Mount Everest.",
                "The Great Wall of China is here."
            ],
            gallery: [
                "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Mountain
                "https://images.unsplash.com/photo-1594858737685-dd84d45f1b4c?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Hills/Rice Terrace feel
                "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop"  // Forest
            ],
            wikiLink: "https://en.wikipedia.org/wiki/Asia"
        },
        {
            name: "Australia",
            coords: [-25, 135],
            zoom: 4,
            description: "Unique wildlife, coral reefs, and the Outback.",
            facts: [
                "The only continent that is also a country.",
                "Home to the Great Barrier Reef.",
                "No active volcanoes."
            ],
            gallery: [
                "https://images.unsplash.com/photo-1516926133025-705ee504386d?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Outback/Desert
                "https://images.unsplash.com/photo-1501693988750-8495148d47e6?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Mountain/Coast feel
                "https://images.unsplash.com/photo-1601692422905-989203a4e977?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop"  // Bush
            ],
            wikiLink: "https://en.wikipedia.org/wiki/Australia"
        },
        {
            name: "Antarctica",
            coords: [-80, 0],
            zoom: 3.5,
            description: "A frozen wilderness of ice and penguins.",
            facts: [
                "Holds 70% of the world's fresh water.",
                "Coldest, windiest continent.",
                "No permanent residents."
            ],
            gallery: [
                "https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Ice/Glacier
                "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Mountain/Cold
                "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop"  // Lake/Cold
            ],
            wikiLink: "https://en.wikipedia.org/wiki/Antarctica"
        }
    ];

    const welcomeScreen = document.getElementById('welcome-screen');
    const beginButton = document.getElementById('begin-button');
    const sidebar = document.getElementById('sidebar');
    const bottomSheet = document.getElementById('bottom-sheet');
    let map;

    beginButton.addEventListener('click', function() {
        this.disabled = true;
        welcomeScreen.classList.add('fade-out');

        welcomeScreen.addEventListener('transitionend', () => {
            welcomeScreen.style.display = 'none';
            initializeMap();
        }, { once: true });
    });

    function initializeMap() {
        const loader = document.getElementById('loader');
        map = L.map('map', {
            zoomControl: false,
            attributionControl: false,
            center: [20, 0],
            zoom: 2.5,
            minZoom: 2.5,
            maxZoom: 7,
            maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
        });

        // Switch to CartoDB Voyager for a cleaner, modern look
        const tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        });

        tileLayer.on('loading', function() { loader.style.display = 'block'; });
        tileLayer.on('load', function() { loader.style.display = 'none'; });

        tileLayer.addTo(map);

        // Terminator (Day/Night line) - Make it subtle but visible
        const terminator = L.terminator({
            fillColor: '#0A2540',
            fillOpacity: 0.12,
            color: 'transparent',
            resolution: 10
        }).addTo(map);

        setInterval(() => { terminator.setTime(); }, 60000);

        L.control.attribution({ position: 'bottomleft', prefix: '' }).addTo(map);

        // Custom Zoom Controls
        document.getElementById('zoom-in').addEventListener('click', () => map.setZoom(map.getZoom() + 1));
        document.getElementById('zoom-out').addEventListener('click', () => map.setZoom(map.getZoom() - 1));

        const closeUI = () => {
             sidebar.classList.remove('active');
             bottomSheet.classList.remove('active');
             document.body.classList.remove('ui-active');
             map.flyTo([20, 0], 2.5, { animate: true, duration: 1.5 });
        };

        // Close buttons
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeUI();
            });
        });

        // Swipe down on bottom sheet (Smart closing)
        let touchStartY = 0;
        const contentBody = document.getElementById('sheet-content');

        bottomSheet.addEventListener('touchstart', e => {
            touchStartY = e.changedTouches[0].screenY;
        }, {passive: true});

        bottomSheet.addEventListener('touchend', e => {
            const touchEndY = e.changedTouches[0].screenY;
            const distance = touchEndY - touchStartY;
            const isAtTop = contentBody.scrollTop === 0;

            // Only close if we swiped down significantly AND we are at the top of the content
            if (distance > 100 && isAtTop) {
                closeUI();
            }
        }, {passive: true});


        continents.forEach((continent, index) => {
            const continentIcon = L.divIcon({
                className: 'continent-marker',
                html: `<div class="pin" role="button" aria-label="${continent.name}" tabindex="0" style="animation: fadeInUp 0.5s ease-out forwards ${index * 100}ms; opacity: 0;">
                         <div class="pin-ring"></div>
                         <div class="pin-inner"></div>
                       </div>`,
                iconSize: [48, 48],
                iconAnchor: [24, 24]
            });

            const marker = L.marker(continent.coords, { icon: continentIcon, title: continent.name }).addTo(map);

            marker.bindTooltip(continent.name, {
                direction: 'top',
                className: 'custom-tooltip',
                offset: [0, -32],
                opacity: 1
            });

            const sanitizedName = sanitizeHTML(continent.name);
            const sanitizedDesc = sanitizeHTML(continent.description);
            const galleryHTML = continent.gallery.map(url => `<img src="${url}" alt="${sanitizedName}" loading="lazy">`).join('');
            const factsHTML = continent.facts.map(fact =>
                `<div class="fact-card"><p><strong>Did you know?</strong><br>${sanitizeHTML(fact)}</p></div>`
            ).join('');

            const contentHTML = `
                <div class="gallery-grid">${galleryHTML}</div>
                <h3 style="margin-bottom:12px; font-weight:600; color:var(--primary);">Quick Facts</h3>
                ${factsHTML}
                <div style="margin-top: 24px; text-align: center;">
                    <a href="${continent.wikiLink}" class="read-more-link" target="_blank" rel="noopener noreferrer">
                        <span>Read more on Wikipedia</span>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                </div>
            `;

            const populateContent = (titleId, descId, contentId) => {
                document.getElementById(titleId).textContent = sanitizedName;
                document.getElementById(descId).textContent = sanitizedDesc;
                document.getElementById(contentId).innerHTML = contentHTML;
            };

            const handleMarkerInteraction = (e) => {
                L.DomEvent.stopPropagation(e);
                populateContent('sidebar-title', 'sidebar-desc', 'sidebar-content');
                populateContent('sheet-title', 'sheet-desc', 'sheet-content');

                const isDesktop = window.innerWidth > 768;

                if (isDesktop) {
                    // Desktop: Fly to allow sidebar space on left
                    // We shift center WEST so target is EAST
                    map.flyTo([continent.coords[0], continent.coords[1] - 30], continent.zoom, {
                        animate: true, duration: 1.2, easeLinearity: 0.2
                    });
                    sidebar.classList.add('active');
                    bottomSheet.classList.remove('active');
                } else {
                    // Mobile: Sidebar is bottom, so we shift map SOUTH so target is NORTH (top)
                    map.flyTo([continent.coords[0] - 15, continent.coords[1]], continent.zoom - 0.5, {
                        animate: true, duration: 1.2, easeLinearity: 0.2
                    });
                    bottomSheet.classList.add('active');
                    sidebar.classList.remove('active');
                }
                    document.body.classList.add('ui-active');
            };

            marker.on('click', handleMarkerInteraction);
            marker.on('keyup', (e) => {
                if (e.originalEvent.key === 'Enter' || e.originalEvent.key === ' ') {
                    handleMarkerInteraction(e);
                }
            });
        });


        map.on('click', function(e) {
            if (e.originalEvent.target.closest('.continent-marker')) return;
            closeUI();
        });

        // Sailing Boat
        function addSailingBoat() {
            const boatIcon = L.divIcon({
                className: 'sailing-boat',
                html: '<div class="boat-rotate-wrapper" style="transition: transform 0.2s linear; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"><svg viewBox="0 0 24 24" style="width: 30px; height: 30px; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2));"><path d="M3.95 19H19.05L12 5.45z M12 3L2 21h20L12 3z" fill="#fefae0" stroke="#0A2540" stroke-width="1.5"></path></svg></div>',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });

            const boatPath = [
                [30, -30], [32, -35], [33, -40], [32, -45], [30, -50],
                [28, -55], [25, -60], [22, -62], [20, -60], [18, -55],
                [19, -50], [21, -45], [20, -40], [18, -35], [20, -30],
                [22, -25], [25, -22], [28, -25], [30, -30]
            ];

            const boatMarker = L.marker(boatPath[0], { icon: boatIcon }).addTo(map);
            let currentIndex = 0;
            let animationFrameId;

            function getBearing(start, end) {
                const startLat = start[0] * Math.PI / 180;
                const startLng = start[1] * Math.PI / 180;
                const endLat = end[0] * Math.PI / 180;
                const endLng = end[1] * Math.PI / 180;
                const y = Math.sin(endLng - startLng) * Math.cos(endLat);
                const x = Math.cos(startLat) * Math.sin(endLat) -
                          Math.sin(startLat) * Math.cos(endLat) * Math.cos(endLng - startLng);
                const theta = Math.atan2(y, x);
                return (theta * 180 / Math.PI + 360) % 360;
            }

            function animateBoat() {
                const start = boatPath[currentIndex];
                const end = boatPath[(currentIndex + 1) % boatPath.length];
                let startTime = performance.now();

                // Calculate rotation
                const angle = getBearing(start, end);
                const el = boatMarker.getElement();
                if (el) {
                    const wrapper = el.querySelector('.boat-rotate-wrapper');
                    if (wrapper) wrapper.style.transform = `rotate(${angle}deg)`;
                }

                function step(now) {
                    const elapsed = now - startTime;
                    const duration = 12000;
                    const progress = Math.min(elapsed / duration, 1);

                    const lat = start[0] + (end[0] - start[0]) * progress;
                    const lng = start[1] + (end[1] - start[1]) * progress;
                    boatMarker.setLatLng([lat, lng]);

                    if (progress < 1) {
                        animationFrameId = requestAnimationFrame(step);
                    } else {
                        currentIndex = (currentIndex + 1) % boatPath.length;
                        animationFrameId = requestAnimationFrame(animateBoat);
                    }
                }
                animationFrameId = requestAnimationFrame(step);
            }
            animateBoat();
        }
        addSailingBoat();
    }
});
