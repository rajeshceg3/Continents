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
            climate: "Varied from tropical in the south to arctic in the north.",
            wildlife: ["Grizzly Bear", "Bald Eagle", "Moose"],
            culture: "A melting pot of indigenous heritage and modern innovation.",
            landmarks: ["Grand Canyon", "Niagara Falls", "Chichen Itza"],
            gallery: [
                "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Mountain
                "https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Ice/Glacier
                "https://images.unsplash.com/photo-1501693988750-8495148d47e6?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop"  // Mountain Landscape
            ],
            wikiLink: "https://en.wikipedia.org/wiki/North_America",
            travelTips: {
                bestTime: "Spring (Apr-Jun) or Fall (Sep-Oct)",
                currency: "USD, CAD, MXN",
                language: "English, Spanish, French"
            },
            quiz: {
                question: "Which is the largest freshwater lake by surface area?",
                options: ["Lake Superior", "Lake Michigan", "Lake Huron"],
                answer: 0
            }
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
            climate: "Predominantly tropical, with arid deserts and alpine climates.",
            wildlife: ["Jaguar", "Llama", "Toucan"],
            culture: "Vibrant festivals, ancient traditions, and passionate rhythms.",
            landmarks: ["Machu Picchu", "Christ the Redeemer", "Angel Falls"],
            gallery: [
                "https://images.unsplash.com/photo-1594858737685-dd84d45f1b4c?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Green/Hills
                "https://images.unsplash.com/photo-1516926133025-705ee504386d?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Desert
                "https://images.unsplash.com/photo-1501693988750-8495148d47e6?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop"  // Mountain
            ],
            wikiLink: "https://en.wikipedia.org/wiki/South_America",
            travelTips: {
                bestTime: "June to August (Dry Season)",
                currency: "BRL, ARS, CLP",
                language: "Spanish, Portuguese"
            },
            quiz: {
                question: "What is the longest mountain range in the world?",
                options: ["The Rockies", "The Andes", "The Alps"],
                answer: 1
            }
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
            climate: "Temperate and continental, influenced by the Gulf Stream.",
            wildlife: ["Red Fox", "Wolf", "Reindeer"],
            culture: "A rich tapestry of art, history, and diverse culinary traditions.",
            landmarks: ["Eiffel Tower", "Colosseum", "Acropolis"],
            gallery: [
                "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Forest/Lake
                "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Forest/Mist
                "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop"  // Mountain
            ],
            wikiLink: "https://en.wikipedia.org/wiki/Europe",
            travelTips: {
                bestTime: "May to September",
                currency: "Euro (EUR), GBP, CHF",
                language: "English, French, German"
            },
            quiz: {
                question: "Which country is the smallest in the world?",
                options: ["Monaco", "San Marino", "Vatican City"],
                answer: 2
            }
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
            climate: "Hot and dry in deserts, tropical in rainforests, mediterranean on coasts.",
            wildlife: ["Lion", "Elephant", "Giraffe"],
            culture: "The cradle of humanity, known for its storytelling and rhythmic music.",
            landmarks: ["Pyramids of Giza", "Victoria Falls", "Table Mountain"],
            gallery: [
                "https://images.unsplash.com/photo-1601692422905-989203a4e977?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Savanna
                "https://images.unsplash.com/photo-1516926133025-705ee504386d?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Desert
                "https://images.unsplash.com/photo-1594858737685-dd84d45f1b4c?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop"  // Green/Jungle
            ],
            wikiLink: "https://en.wikipedia.org/wiki/Africa",
            travelTips: {
                bestTime: "June to October (Safari)",
                currency: "ZAR, EGP, KES",
                language: "Arabic, Swahili, English"
            },
            quiz: {
                question: "What is the longest river in the world?",
                options: ["The Nile", "The Amazon", "The Yangtze"],
                answer: 0
            }
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
            climate: "Extremely diverse, ranging from subarctic to tropical.",
            wildlife: ["Tiger", "Panda", "Snow Leopard"],
            culture: "Ancient civilizations blending spirituality with rapid modernization.",
            landmarks: ["Great Wall of China", "Taj Mahal", "Angkor Wat"],
            gallery: [
                "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Mountain
                "https://images.unsplash.com/photo-1594858737685-dd84d45f1b4c?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Hills/Rice Terrace feel
                "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop"  // Forest
            ],
            wikiLink: "https://en.wikipedia.org/wiki/Asia",
            travelTips: {
                bestTime: "November to March (Cool)",
                currency: "JPY, CNY, INR",
                language: "Mandarin, Hindi, Japanese"
            },
            quiz: {
                question: "Which structure is visible from space (myth)?",
                options: ["Taj Mahal", "Great Wall of China", "Burj Khalifa"],
                answer: 1
            }
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
            climate: "Arid to semi-arid in the center, tropical in the north, temperate in the south.",
            wildlife: ["Kangaroo", "Koala", "Wombat"],
            culture: "Laid-back coastal living with deep respect for Aboriginal roots.",
            landmarks: ["Sydney Opera House", "Uluru", "Great Barrier Reef"],
            gallery: [
                "https://images.unsplash.com/photo-1516926133025-705ee504386d?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Outback/Desert
                "https://images.unsplash.com/photo-1501693988750-8495148d47e6?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Mountain/Coast feel
                "https://images.unsplash.com/photo-1601692422905-989203a4e977?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop"  // Bush
            ],
            wikiLink: "https://en.wikipedia.org/wiki/Australia",
            travelTips: {
                bestTime: "September to November (Spring)",
                currency: "Australian Dollar (AUD)",
                language: "English"
            },
            quiz: {
                question: "What is the world's largest coral reef system?",
                options: ["Belize Barrier Reef", "Great Barrier Reef", "Red Sea"],
                answer: 1
            }
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
            climate: "The coldest, driest, and windiest continent on Earth.",
            wildlife: ["Emperor Penguin", "Weddell Seal", "Orca"],
            culture: "A continent dedicated to peace and scientific discovery.",
            landmarks: ["Mount Vinson", "McMurdo Station", "South Pole"],
            gallery: [
                "https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Ice/Glacier
                "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Mountain/Cold
                "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop"  // Lake/Cold
            ],
            wikiLink: "https://en.wikipedia.org/wiki/Antarctica",
            travelTips: {
                bestTime: "November to March (Summer)",
                currency: "None (Scientific)",
                language: "N/A"
            },
            quiz: {
                question: "What percentage of the world's fresh water is here?",
                options: ["50%", "70%", "90%"],
                answer: 1
            }
        }
    ];

    const welcomeScreen = document.getElementById('welcome-screen');
    const beginButton = document.getElementById('begin-button');
    const sidebar = document.getElementById('sidebar');
    const bottomSheet = document.getElementById('bottom-sheet');
    const passportModal = document.getElementById('passport-modal');
    const passportBtn = document.getElementById('passport-btn');
    const closePassportBtn = document.querySelector('.close-passport');

    // Passport State
    let visitedContinents = new Set(JSON.parse(localStorage.getItem('visitedContinents')) || []);

    // Journal State
    let currentJournalContinent = null;

    function savePassport() {
        localStorage.setItem('visitedContinents', JSON.stringify([...visitedContinents]));
    }

    function openJournal(continentName) {
        currentJournalContinent = continentName;
        document.getElementById('passport-grid').style.display = 'none';
        document.querySelector('.passport-progress').style.display = 'none';

        const journalView = document.getElementById('passport-journal-view');
        journalView.style.display = 'block';

        document.getElementById('journal-title').textContent = continentName;

        // Load existing note
        const savedNote = localStorage.getItem(`journal_${continentName}`) || '';
        document.getElementById('journal-textarea').value = savedNote;
    }

    function closeJournal() {
        document.getElementById('passport-journal-view').style.display = 'none';
        document.getElementById('passport-grid').style.display = 'grid';
        document.querySelector('.passport-progress').style.display = 'block';
        currentJournalContinent = null;
    }

    function saveJournal() {
        if (!currentJournalContinent) return;

        const note = document.getElementById('journal-textarea').value;
        localStorage.setItem(`journal_${currentJournalContinent}`, note);

        showToast('Journal Entry Saved!');
        closeJournal();
    }

    function markVisited(continentName) {
        if (!visitedContinents.has(continentName)) {
            visitedContinents.add(continentName);
            savePassport();
            showToast(`Passport Stamped: ${continentName}!`);
            updateMarkerStyle(continentName);
        }
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        // Trigger reflow
        toast.offsetHeight;

        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    function updateMarkerStyle(continentName) {
        // Find marker and add class - this is tricky with Leaflet markers not having direct IDs
        // We will rely on re-rendering or direct DOM manipulation if possible,
        // but easier is to add a class during creation if visited.
        // For now, let's handle this by iterating markers if we stored them, or just rely on the passport view.
        // Better: We iterate over the map layers to find the marker with the title.
        map.eachLayer(layer => {
            if (layer instanceof L.Marker && layer.options.title === continentName) {
                const icon = layer.getElement();
                if (icon) icon.classList.add('visited-marker');
            }
        });
    }

    function renderPassport() {
        const grid = document.getElementById('passport-grid');
        grid.innerHTML = '';

        continents.forEach(continent => {
            const isVisited = visitedContinents.has(continent.name);
            const stamp = document.createElement('div');
            stamp.className = `passport-stamp ${isVisited ? 'earned' : ''}`;

            // Generate a deterministic rotation for a messy stamp look
            const rotation = (continent.name.length * 7) % 30 - 15;

            if (isVisited) {
                stamp.style.cursor = 'pointer';
                stamp.addEventListener('click', () => openJournal(continent.name));
            }

            stamp.innerHTML = `
                <div class="stamp-inner" style="transform: rotate(${rotation}deg)">
                    <div class="stamp-icon">
                        ${isVisited ?
                            '<svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>' :
                            '<svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>'}
                    </div>
                    <span class="stamp-name">${continent.name}</span>
                    ${isVisited ? '<span class="stamp-date">VISITED</span>' : ''}
                </div>
            `;
            grid.appendChild(stamp);
        });

        const progress = (visitedContinents.size / continents.length) * 100;
        document.getElementById('passport-progress-fill').style.width = `${progress}%`;
        document.getElementById('passport-status').textContent = `${visitedContinents.size} / ${continents.length} Collected`;
    }

    passportBtn.addEventListener('click', () => {
        renderPassport();
        passportModal.classList.add('active');
        passportModal.setAttribute('aria-hidden', 'false');
    });

    closePassportBtn.addEventListener('click', () => {
        passportModal.classList.remove('active');
        passportModal.setAttribute('aria-hidden', 'true');
        closeJournal(); // Reset view
    });

    document.getElementById('journal-back-btn').addEventListener('click', closeJournal);
    document.getElementById('journal-save-btn').addEventListener('click', saveJournal);

    // Close on background click
    passportModal.addEventListener('click', (e) => {
        if (e.target === passportModal) {
            passportModal.classList.remove('active');
            passportModal.setAttribute('aria-hidden', 'true');
        }
    });

    let map;

    const closeUI = () => {
         sidebar.classList.remove('active');
         bottomSheet.classList.remove('active');
         document.body.classList.remove('ui-active');
         if (map) map.flyTo([20, 0], 2.5, { animate: true, duration: 1.5 });
    };

    const ExplorationManager = {
        currentStep: 0,
        totalSteps: 8, // 0: Intro, 1: Climate, 2: Wildlife, 3: Landmarks, 4: Tips, 5: Facts, 6: Quiz, 7: Completion
        currentContinent: null,

        startExploration: function(continent) {
            this.currentContinent = continent;
            this.currentStep = 0;
            this.renderStep(this.currentStep);
            this.openUI(continent);
        },

        nextStep: function() {
            if (this.currentStep < this.totalSteps - 1) {
                this.currentStep++;
                this.renderStep(this.currentStep);
            }
        },

        prevStep: function() {
            if (this.currentStep > 0) {
                this.currentStep--;
                this.renderStep(this.currentStep);
            }
        },

        completeExploration: function() {
            if (this.currentContinent) {
                markVisited(this.currentContinent.name);
            }
            closeUI();
        },

        checkQuizAnswer: function(selectedIndex, btnElement) {
            const correctAnswer = this.currentContinent.quiz.answer;
            // Select all feedback elements and buttons to handle both Desktop/Mobile views simultaneously
            const feedbackEls = document.querySelectorAll('.quiz-feedback-box');
            const nextBtns = document.querySelectorAll('.quiz-continue-btn');
            const options = document.querySelectorAll('.quiz-option');

            // Reset styles
            options.forEach(opt => {
                opt.classList.remove('correct', 'incorrect');
                opt.disabled = true; // Disable all after selection
            });

            const isCorrect = selectedIndex === correctAnswer;
            const feedbackText = isCorrect ? "Correct! Well done." : "Not quite. The correct answer is highlighted.";
            const feedbackClass = isCorrect ? "quiz-feedback-box success show" : "quiz-feedback-box error show";

            // Update all feedback boxes
            feedbackEls.forEach(el => {
                el.textContent = feedbackText;
                el.className = feedbackClass;
            });

            if (isCorrect) {
                btnElement.classList.add('correct');
            } else {
                btnElement.classList.add('incorrect');
                // Highlight correct answer(s)
                const correctOptions = document.querySelectorAll(`.quiz-option[data-index="${correctAnswer}"]`);
                correctOptions.forEach(opt => opt.classList.add('correct'));
            }

            // Enable Continue buttons
            const enableBtns = () => {
                nextBtns.forEach(btn => {
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                });
            };

            if (isCorrect) {
                enableBtns();
            } else {
                setTimeout(enableBtns, 1500);
            }
        },

        openUI: function(continent) {
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
        },

        renderStep: function(stepIndex) {
            const continent = this.currentContinent;
            const isDesktop = window.innerWidth > 768;

            // Helper to update UI
            const updateUI = (containerId, titleId, descId) => {
                const container = document.getElementById(containerId);
                const titleEl = document.getElementById(titleId);
                const descEl = document.getElementById(descId);

                if (!container) return;

                // Clear previous content
                container.innerHTML = '';

                let contentHTML = '';
                let stepTitle = '';
                let stepDesc = '';

                // Progress Indicator
                const progressHTML = `
                    <div class="progress-indicator">
                        ${Array.from({length: this.totalSteps}).map((_, i) =>
                            `<div class="progress-dot ${i <= stepIndex ? 'active' : ''}"></div>`
                        ).join('')}
                    </div>
                `;

                if (stepIndex === 0) {
                    stepTitle = continent.name;
                    stepDesc = continent.description;
                    contentHTML = `
                        <div class="hero-image-container">
                            <img src="${continent.gallery[0]}" class="hero-image" alt="${continent.name}" style="width:100%; height:200px; object-fit:cover; border-radius:16px; margin-bottom:24px; box-shadow:var(--shadow-md);">
                        </div>
                        <div class="nav-buttons center" style="display:flex; justify-content:center;">
                            <button class="nav-btn primary" onclick="ExplorationManager.nextStep()">
                                Begin Journey
                            </button>
                        </div>
                    `;
                } else if (stepIndex === 1) {
                    stepTitle = "Climate & Environment";
                    stepDesc = "Discover the natural forces that shape this land.";
                    contentHTML = `
                        <div class="climate-section">
                             <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="section-icon"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                             <p>${sanitizeHTML(continent.climate)}</p>
                        </div>
                        <div class="nav-buttons">
                            <button class="nav-btn secondary" onclick="ExplorationManager.prevStep()">Back</button>
                            <button class="nav-btn primary" onclick="ExplorationManager.nextStep()">Meet the Locals</button>
                        </div>
                    `;
                } else if (stepIndex === 2) {
                    stepTitle = "Wildlife & Culture";
                    stepDesc = "The living soul of the continent.";
                    const wildlifeHTML = continent.wildlife.map(w => `<span style="background:rgba(255,255,255,0.7); padding:6px 12px; border-radius:50px; font-size:0.9rem; font-weight:500;">${sanitizeHTML(w)}</span>`).join(' ');
                    contentHTML = `
                         <div style="margin-bottom: 24px;">
                            <h4 style="margin-bottom:12px; color:var(--text-light); text-transform:uppercase; font-size:0.8rem; letter-spacing:0.05em;">Native Wildlife</h4>
                            <div style="display:flex; flex-wrap:wrap; gap:8px;">${wildlifeHTML}</div>
                         </div>
                         <div style="margin-bottom: 24px; padding: 20px; background: rgba(99, 91, 255, 0.05); border-radius: 16px; border: 1px solid rgba(99, 91, 255, 0.1);">
                            <h4 style="margin-bottom:8px; color:var(--accent); text-transform:uppercase; font-size:0.8rem; letter-spacing:0.05em;">Cultural Insight</h4>
                            <p style="font-size:1.05rem; line-height:1.6;">${sanitizeHTML(continent.culture)}</p>
                         </div>
                         <div class="nav-buttons">
                            <button class="nav-btn secondary" onclick="ExplorationManager.prevStep()">Back</button>
                            <button class="nav-btn primary" onclick="ExplorationManager.nextStep()">Must Visit</button>
                        </div>
                    `;
                } else if (stepIndex === 3) {
                    stepTitle = "Must Visit";
                    stepDesc = "Iconic landmarks you cannot miss.";
                    const landmarksHTML = continent.landmarks.map(l => `<li class="landmark-item">${sanitizeHTML(l)}</li>`).join('');
                    const remainingGallery = continent.gallery.slice(1).map(url => `<img src="${url}" loading="lazy">`).join('');
                    contentHTML = `
                        <ul class="landmark-list">${landmarksHTML}</ul>
                        <div class="gallery-grid" style="margin-top: 20px;">${remainingGallery}</div>
                        <div class="nav-buttons">
                            <button class="nav-btn secondary" onclick="ExplorationManager.prevStep()">Back</button>
                            <button class="nav-btn primary" onclick="ExplorationManager.nextStep()">Travel Smart</button>
                        </div>
                    `;
                } else if (stepIndex === 4) {
                    stepTitle = "Travel Tips";
                    stepDesc = "Essential advice for your journey.";
                    contentHTML = `
                        <div class="tips-grid" style="display: grid; gap: 16px;">
                            <div class="tip-card">
                                <div class="tip-icon">📅</div>
                                <div class="tip-content">
                                    <strong>Best Time to Visit</strong>
                                    <p>${sanitizeHTML(continent.travelTips.bestTime)}</p>
                                </div>
                            </div>
                            <div class="tip-card">
                                <div class="tip-icon">💰</div>
                                <div class="tip-content">
                                    <strong>Currency</strong>
                                    <p>${sanitizeHTML(continent.travelTips.currency)}</p>
                                </div>
                            </div>
                            <div class="tip-card">
                                <div class="tip-icon">🗣️</div>
                                <div class="tip-content">
                                    <strong>Languages</strong>
                                    <p>${sanitizeHTML(continent.travelTips.language)}</p>
                                </div>
                            </div>
                        </div>
                        <div class="nav-buttons">
                            <button class="nav-btn secondary" onclick="ExplorationManager.prevStep()">Back</button>
                            <button class="nav-btn primary" onclick="ExplorationManager.nextStep()">Quick Facts</button>
                        </div>
                    `;
                } else if (stepIndex === 5) {
                    stepTitle = "Quick Facts";
                    stepDesc = "Interesting tidbits to know.";
                    const factsHTML = continent.facts.map(f => `<div class="fact-card"><p><strong>Did you know?</strong><br>${sanitizeHTML(f)}</p></div>`).join('');
                    contentHTML = `
                        ${factsHTML}
                        <div style="text-align: center; margin: 20px 0;">
                             <a href="${continent.wikiLink}" class="read-more-link" target="_blank" rel="noopener noreferrer">
                                <span>Read more on Wikipedia</span>
                             </a>
                        </div>
                        <div class="nav-buttons">
                            <button class="nav-btn secondary" onclick="ExplorationManager.prevStep()">Back</button>
                            <button class="nav-btn primary" onclick="ExplorationManager.nextStep()">Take Quiz</button>
                        </div>
                    `;
                } else if (stepIndex === 6) {
                    stepTitle = "Knowledge Check";
                    stepDesc = "Test what you've learned.";
                    const quiz = continent.quiz;
                    contentHTML = `
                        <div class="quiz-container">
                            <p class="quiz-question">${sanitizeHTML(quiz.question)}</p>
                            <div class="quiz-options">
                                ${quiz.options.map((opt, i) => `
                                    <button class="quiz-option" data-index="${i}" onclick="ExplorationManager.checkQuizAnswer(${i}, this)">
                                        ${sanitizeHTML(opt)}
                                    </button>
                                `).join('')}
                            </div>
                            <div class="quiz-feedback-box"></div>
                        </div>
                        <div class="nav-buttons">
                            <button class="nav-btn secondary" onclick="ExplorationManager.prevStep()">Back</button>
                            <button class="nav-btn primary quiz-continue-btn" disabled style="opacity: 0.5; pointer-events: none;" onclick="ExplorationManager.nextStep()">Finish</button>
                        </div>
                    `;
                } else if (stepIndex === 7) {
                    stepTitle = "Journey Complete!";
                    stepDesc = "You have fully explored " + continent.name + ".";
                    contentHTML = `
                        <div class="completion-view" style="text-align:center; padding: 40px 0;">
                            <div class="success-icon-wrapper" style="margin-bottom:20px; color:var(--success);">
                                <svg viewBox="0 0 24 24" width="80" height="80" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="success-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            </div>
                            <h3 style="margin-bottom:10px;">Passport Stamp Collected!</h3>
                            <p style="color:var(--text-light);">You are one step closer to exploring the whole world.</p>
                        </div>
                        <div class="nav-buttons center" style="display:flex; justify-content:center;">
                            <button class="nav-btn primary success" onclick="ExplorationManager.completeExploration()">
                                Return to Map
                            </button>
                        </div>
                    `;
                }

                // Inject Content
                titleEl.textContent = stepTitle;
                descEl.textContent = stepDesc;
                container.innerHTML = progressHTML + contentHTML;

                // Tilt Effect for Hero Image
                const heroImg = container.querySelector('.hero-image');
                if (heroImg) {
                    const heroContainer = heroImg.parentElement;
                    heroContainer.style.perspective = '1000px';
                    heroImg.style.transition = 'transform 0.1s ease-out';

                    heroContainer.addEventListener('mousemove', (e) => {
                        const rect = heroContainer.getBoundingClientRect();
                        const x = (e.clientX - rect.left) / rect.width - 0.5;
                        const y = (e.clientY - rect.top) / rect.height - 0.5;
                        heroImg.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
                    });

                    heroContainer.addEventListener('mouseleave', () => {
                        heroImg.style.transform = 'rotateY(0) rotateX(0) scale(1)';
                    });
                }

                // Trigger a slight fade-in for content
                container.animate([
                    { opacity: 0, transform: 'translateY(10px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], {
                    duration: 400,
                    easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)'
                });
            };

            // Update visible UI based on mode
            // We update both just in case user resizes, but prioritize based on logic if needed
            // Actually, updating both is safer for resize handling without reload
            updateUI('sidebar-content', 'sidebar-title', 'sidebar-desc');
            updateUI('sheet-content', 'sheet-title', 'sheet-desc');
        }
    };

    // Expose logic for inline HTML handlers if needed (though we will try to use addEventListener)
    window.ExplorationManager = ExplorationManager;


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
            const isVisited = visitedContinents.has(continent.name);
            const continentIcon = L.divIcon({
                className: `continent-marker ${isVisited ? 'visited-marker' : ''}`,
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

            const handleMarkerInteraction = (e) => {
                L.DomEvent.stopPropagation(e);
                ExplorationManager.startExploration(continent);
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
