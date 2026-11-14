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
            greeting: "Welcome / Bonjour",
            spokenGreeting: "Welcome. Bonjour.",
            spokenLang: "en-US",
            themeColor: "#FF5A5F",
            themeColorLight: "#FF7E82",
            coords: [45, -100],
            zoom: 3.5,
            description: "Vast forests, towering cities, and grand canyons.",
            facts: [
                "Home to over 500 million people.",
                "Has the longest coastline in the world (Canada).",
                "Lake Superior is a major North American freshwater lake."
            ],
            climate: "Varied from tropical in the south to arctic in the north.",
            wildlife: ["Grizzly Bear", "Bald Eagle", "Moose"],
            culture: "A melting pot of indigenous heritage and modern innovation.",
            cuisine: [
                { name: "Hamburger", description: "A quintessential American staple." },
                { name: "Poutine", description: "Canadian comfort food with fries, cheese curds, and gravy." },
                { name: "Tacos", description: "Traditional Mexican street food with endless varieties." }
            ],
            travelTips: [
                "Get a National Parks Pass if visiting multiple parks in the US.",
                "Tipping (15-20%) is customary in restaurants in the US and Canada.",
                "Weather varies wildly; pack layers if traveling north to south."
            ],
            landmarks: [
                { name: "Grand Canyon", coords: [36.0544, -112.1401] },
                { name: "Niagara Falls", coords: [43.0962, -79.0377] },
                { name: "Chichen Itza", coords: [20.6843, -88.5678] }
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
            greeting: "Hola / Olá",
            spokenGreeting: "Hola. Olá.",
            spokenLang: "es-ES",
            themeColor: "#3ECF8E",
            themeColorLight: "#62DBA2",
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
            cuisine: [
                { name: "Ceviche", description: "Fresh raw fish cured in citrus juices, popular in Peru." },
                { name: "Empanadas", description: "Savory pastries filled with meat, cheese, or corn." },
                { name: "Feijoada", description: "A hearty black bean and pork stew from Brazil." }
            ],
            travelTips: [
                "Learn basic Spanish (or Portuguese for Brazil) phrases.",
                "Carry cash, as smaller vendors may not accept cards.",
                "Be aware of altitude sickness when visiting the Andes."
            ],
            landmarks: [
                { name: "Machu Picchu", coords: [-13.1631, -72.5450] },
                { name: "Christ the Redeemer", coords: [-22.9519, -43.2105] },
                { name: "Angel Falls", coords: [5.9701, -62.5362] }
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
            greeting: "Bonjour / Ciao",
            spokenGreeting: "Bonjour. Ciao.",
            spokenLang: "fr-FR",
            themeColor: "#635BFF",
            themeColorLight: "#7A73FF",
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
            cuisine: [
                { name: "Pizza", description: "The world-famous Italian dish born in Naples." },
                { name: "Croissant", description: "Buttery, flaky pastry emblematic of French breakfast." },
                { name: "Schnitzel", description: "Breaded and fried meat cutlet popular in Central Europe." }
            ],
            travelTips: [
                "Use the extensive train network (Eurail) for easy travel.",
                "Book major museums in advance to skip lines.",
                "Many businesses close on Sundays in parts of Europe."
            ],
            landmarks: [
                { name: "Eiffel Tower", coords: [48.8584, 2.2945] },
                { name: "Colosseum", coords: [41.8902, 12.4922] },
                { name: "Acropolis", coords: [37.9715, 23.7257] }
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
            greeting: "Jambo / Sawubona",
            spokenGreeting: "Jambo. Sawubona.",
            spokenLang: "sw-KE",
            themeColor: "#F5A623",
            themeColorLight: "#F7B94B",
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
            cuisine: [
                { name: "Jollof Rice", description: "A spicy, one-pot rice dish popular in West Africa." },
                { name: "Tagine", description: "Slow-cooked stew from North Africa, named after the pot." },
                { name: "Bobotie", description: "South African dish of spiced minced meat with an egg topping." }
            ],
            travelTips: [
                "Book safaris well in advance.",
                "Consult a doctor for vaccinations and malaria prophylaxis.",
                "Respect local customs and dress codes."
            ],
            landmarks: [
                { name: "Pyramids of Giza", coords: [29.9792, 31.1342] },
                { name: "Victoria Falls", coords: [-17.9243, 25.8572] },
                { name: "Table Mountain", coords: [-33.9628, 18.4098] }
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
            greeting: "Namaste / Nǐ hǎo",
            spokenGreeting: "Namaste. Nǐ hǎo.",
            spokenLang: "hi-IN",
            themeColor: "#E31837",
            themeColorLight: "#E8445E",
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
            cuisine: [
                { name: "Sushi", description: "Japanese dish of vinegared rice with seafood." },
                { name: "Dim Sum", description: "Small bite-sized portions of food served in steamer baskets." },
                { name: "Pad Thai", description: "Stir-fried rice noodle dish commonly served as street food." }
            ],
            travelTips: [
                "Remove shoes before entering homes or temples in many countries.",
                "Carry toilet paper and hand sanitizer.",
                "Be prepared to haggle in markets."
            ],
            landmarks: [
                { name: "Great Wall of China", coords: [40.4319, 116.5704] },
                { name: "Taj Mahal", coords: [27.1751, 78.0421] },
                { name: "Angkor Wat", coords: [13.4125, 103.8670] }
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
            greeting: "G\'day",
            spokenGreeting: "G\'day.",
            spokenLang: "en-AU",
            themeColor: "#00843D",
            themeColorLight: "#1F9D55",
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
            cuisine: [
                { name: "Meat Pie", description: "Hand-sized pie containing diced or minced meat and gravy." },
                { name: "Vegemite", description: "Dark brown food spread made from leftover brewers' yeast extract." },
                { name: "Pavlova", description: "Meringue-based dessert with a crisp crust and soft, light inside." }
            ],
            travelTips: [
                "Sun protection is essential due to high UV levels.",
                "Swim between the red and yellow flags at beaches.",
                "Distances are vast; plan accordingly if driving."
            ],
            landmarks: [
                { name: "Sydney Opera House", coords: [-33.8568, 151.2153] },
                { name: "Uluru", coords: [-25.3444, 131.0369] },
                { name: "Great Barrier Reef", coords: [-18.2871, 147.6992] }
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
            greeting: "Welcome to the Ice",
            spokenGreeting: "Welcome to the Ice.",
            spokenLang: "en-GB",
            themeColor: "#00B4E8",
            themeColorLight: "#33C3ED",
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
            cuisine: [
                { name: "Sledging Biscuits", description: "Hard, high-energy biscuits for expeditions." },
                { name: "Hoosh", description: "A porridge-like stew made from pemmican, biscuits, and water." },
                { name: "Chocolate", description: "Essential high-calorie fuel for researchers." }
            ],
            travelTips: [
                "Follow all IAATO guidelines to protect the environment.",
                "Invest in high-quality thermal layers.",
                "Be prepared for rough seas when crossing the Drake Passage."
            ],
            landmarks: [
                { name: "Mount Vinson", coords: [-78.5254, -85.6171] },
                { name: "McMurdo Station", coords: [-77.8463, 166.6681] },
                { name: "South Pole", coords: [-90.0000, 0.0000] }
            ],
            gallery: [
                "https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Ice/Glacier
                "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop", // Mountain/Cold
                "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop"  // Lake/Cold
            ],
            wikiLink: "https://en.wikipedia.org/wiki/Antarctica"
        }
    ];



    const sourceNotes={
      'North America':{url:'https://kids.britannica.com/kids/article/North-America/353542',facts:['North America is the third-largest continent.','Canada, the United States and Mexico cover much of its land area.','Central America and the Caribbean are part of this regional guide.'],detail:'Explore the continent from Arctic landscapes to Central America and the Caribbean.'},
      'South America':{url:'https://kids.britannica.com/students/article/South-America/277149',facts:['The Andes run along the western side of South America.','The Amazon carries more water than any other river.','Northern Chile includes the extremely dry Atacama Desert.'],detail:'The Andes rise beside the Pacific; the Amazon basin stretches far to their east.'},
      'Europe':{url:'https://kids.britannica.com/kids/article/Europe/353110',facts:['Europe is the second-smallest continent in the seven-continent model.','Europe and Asia form the continuous Eurasian landmass.','The Alps rise in south-central Europe.'],detail:'Look for the Mediterranean peninsulas, broad northern plains and the arc of the Alps.'},
      'Africa':{url:'https://kids.britannica.com/students/article/Africa/272745',facts:['Africa is the second-largest continent.','The Atlantic Ocean lies to its west and the Indian Ocean to its east.','The continent stretches across the Equator.'],detail:'The Equator crosses Africa between the Sahara to the north and southern Africa.'},
      'Asia':{url:'https://kids.britannica.com/kids/article/Asia/346086',facts:['Asia is the largest continent in the seven-continent model.','It stretches from the Arctic Ocean toward the Equator.',"Mount Everest is Earth's highest summit above sea level."],detail:'The Himalayas divide the Tibetan Plateau from the northern edge of the Indian subcontinent.'},
      'Australia':{url:'https://kids.britannica.com/kids/article/Australia/345639',facts:['Australia is the smallest continent in the seven-continent model.','It lies between the Indian and Pacific oceans.','Canberra is the capital of the country of Australia.'],detail:'Australia is the continent used here. Oceania is a broader region including Pacific islands.'},
      'Antarctica':{url:'https://www.bas.ac.uk/about/education-and-schools/antarctic-factsheet/',facts:['Antarctica is the coldest, highest, driest and windiest continent.','It is a rocky continent covered by a thick ice sheet.','The Southern Ocean surrounds Antarctica.'],detail:'Antarctica has no native human population. The polar plateau rises well above sea level.'}
    };
    continents.forEach(c=>{const n=sourceNotes[c.name];c.facts=n.facts;c.detail=n.detail;c.source=n.url;c.travelTips=['Check destination-specific entry rules and official travel advice before booking.','Check local weather, opening times and transport for the exact places you plan to visit.','Ask local hosts about customs rather than assuming one rule fits a whole continent.'];c.culture=c.name==='Antarctica'?'There is no single national culture here. Research stations and expeditions bring people from many countries.':'These are selected food examples, not a summary of everyone who lives here. Explore individual places and communities for their own histories and traditions.';});
    // This guide uses the seven-continent model. Other geographic conventions exist.

    // --- Particle System ---
    const ParticleSystem = {
        canvas: document.getElementById('particle-canvas'),
        ctx: null,
        particles: [],
        animationId: null,
        activeType: null,

        init: function() {
            if (!this.canvas) this.canvas = document.getElementById('particle-canvas');
            if (!this.ctx && this.canvas) {
                this.ctx = this.canvas.getContext('2d');
                this.resize();
                window.addEventListener('resize', () => this.resize());
            }
        },

        resize: function() {
            if (this.canvas) {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
            }
        },

        start: function(continentName) {
            if(!motion)return;
            this.init();
            if (!this.ctx) return;
            this.stop();
            this.activeType = this.getTypeForContinent(continentName);
            if (!this.activeType) return;

            this.createParticles();
            this.animate();
        },

        stop: function() {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
                this.animationId = null;
            }
            if (this.ctx && this.canvas) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
            this.particles = [];
        },

        getTypeForContinent: function(name) {
            // Also supports direct type passing (e.g. 'rain' or 'snow')
            if (['rain', 'snow', 'dust', 'leaves', 'petals', 'embers'].includes(name)) {
                return name;
            }
            const map = {
                'Antarctica': 'snow',
                'Africa': 'dust',
                'South America': 'leaves',
                'Asia': 'petals',
                'Australia': 'embers'
            };
            return map[name] || null;
        },

        createParticles: function() {
            const count = this.activeType === 'snow' ? 100 :
                          this.activeType === 'rain' ? 150 :
                          this.activeType === 'dust' ? 150 :
                          this.activeType === 'leaves' ? 40 :
                          this.activeType === 'petals' ? 50 : 30;

            for (let i = 0; i < count; i++) {
                this.particles.push(this.createParticle());
            }
        },

        createParticle: function() {
            const p = {
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                vx: (Math.random() - 0.5) * 1,
                vy: (Math.random() - 0.5) * 1,
                alpha: Math.random() * 0.5 + 0.1
            };

            if (this.activeType === 'snow') {
                p.vy = Math.random() * 1 + 0.5;
                p.vx = (Math.random() - 0.5) * 0.5;
                p.size = Math.random() * 2 + 1;
            } else if (this.activeType === 'rain') {
                p.vy = Math.random() * 5 + 5; // Fast falling
                p.vx = Math.random() * 1 - 0.5;
                p.size = Math.random() * 1.5 + 0.5;
                p.length = Math.random() * 10 + 10;
                p.alpha = Math.random() * 0.3 + 0.1;
            } else if (this.activeType === 'dust') {
                p.vy = (Math.random() - 0.5) * 0.5 - 0.2;
                p.vx = (Math.random() - 0.5) * 1 + 0.5;
                p.size = Math.random() * 1.5 + 0.5;
            } else if (this.activeType === 'leaves' || this.activeType === 'petals') {
                p.vy = Math.random() * 1 + 0.2;
                p.vx = (Math.random() - 0.5) * 2;
                p.size = Math.random() * 4 + 2;
                p.angle = Math.random() * Math.PI * 2;
                p.spin = (Math.random() - 0.5) * 0.1;
            } else if (this.activeType === 'embers') {
                p.vy = -Math.random() * 1 - 0.5;
                p.vx = (Math.random() - 0.5) * 1;
                p.size = Math.random() * 2 + 0.5;
                p.life = Math.random() * 100;
            }
            return p;
        },

        animate: function() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (this.activeType === 'snow') {
                    this.ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
                    this.ctx.beginPath();
                    this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    this.ctx.fill();
                    if (p.y > this.canvas.height) { p.y = 0; p.x = Math.random() * this.canvas.width; }
                } else if (this.activeType === 'rain') {
                    this.ctx.strokeStyle = `rgba(150, 180, 255, ${p.alpha})`;
                    this.ctx.lineWidth = p.size;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p.x + p.vx * 2, p.y + p.vy * 2);
                    this.ctx.stroke();
                    if (p.y > this.canvas.height) { p.y = 0; p.x = Math.random() * this.canvas.width; }
                } else if (this.activeType === 'dust') {
                    this.ctx.fillStyle = `rgba(245, 166, 35, ${p.alpha * 0.5})`;
                    this.ctx.beginPath();
                    this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    this.ctx.fill();
                    if (p.x > this.canvas.width) { p.x = 0; p.y = Math.random() * this.canvas.height; }
                    if (p.y < 0) { p.y = this.canvas.height; p.x = Math.random() * this.canvas.width; }
                } else if (this.activeType === 'leaves' || this.activeType === 'petals') {
                    p.angle += p.spin;
                    this.ctx.save();
                    this.ctx.translate(p.x, p.y);
                    this.ctx.rotate(p.angle);
                    this.ctx.fillStyle = this.activeType === 'leaves' ? `rgba(62, 207, 142, ${p.alpha})` : `rgba(227, 24, 55, ${p.alpha * 0.8})`;
                    this.ctx.beginPath();
                    this.ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
                    this.ctx.fill();
                    this.ctx.restore();
                    if (p.y > this.canvas.height) { p.y = -10; p.x = Math.random() * this.canvas.width; }
                } else if (this.activeType === 'embers') {
                    p.life--;
                    if (p.life <= 0) {
                        this.particles[i] = this.createParticle();
                        this.particles[i].y = this.canvas.height + 10;
                    }
                    this.ctx.fillStyle = `rgba(255, 90, 95, ${p.alpha * (p.life / 100)})`;
                    this.ctx.beginPath();
                    this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    this.ctx.fill();
                }
            });

            this.animationId = requestAnimationFrame(() => this.animate());
        }
    };

    let motion = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.body.classList.toggle('motion-paused', !motion);
    // --- Audio Engine ---
    const AudioEngine = {
        ctx: null,
        scape: null,
        muted: true,
        ambientNode: null,
        ambientGain: null,

        init: function() {
            if (!this.ctx) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                this.ctx = new AudioContext();
            }
        },

        speak: function(text, lang) {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const msg = new SpeechSynthesisUtterance(text);
                if (lang) msg.lang = lang;
                msg.rate = 0.9;
                window.speechSynthesis.speak(msg);
            }
        },

        playHover: function() {
            this.playTone(400, 'sine', 0.05, 0.05);
        },

        playTone: function(freq, type, duration, vol) {
            if (this.muted) return;
            this.init();
            if (this.ctx.state === 'suspended') this.ctx.resume();

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

            gain.gain.setValueAtTime(vol, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        },

        playClick: function() {
            this.playTone(600, 'sine', 0.1, 0.1);
        },

        playSuccess: function() {
            this.playTone(800, 'sine', 0.1, 0.1);
            setTimeout(() => this.playTone(1200, 'sine', 0.2, 0.1), 100);
        },

        playError: function() {
            this.playTone(300, 'sawtooth', 0.2, 0.1);
            setTimeout(() => this.playTone(250, 'sawtooth', 0.2, 0.1), 100);
        },

        playStamp: function() {
            this.playTone(150, 'square', 0.1, 0.2);
            setTimeout(() => this.playTone(100, 'square', 0.2, 0.2), 50);
        },

        toggleMute: function() {
            this.muted = !this.muted;
            if(this.muted){this.stopAmbient();if('speechSynthesis' in window)speechSynthesis.cancel()}
            else this.playAmbient(ExplorationManager.currentContinent?.name || 'World map');
            return this.muted;
        },

        playAmbient: function(continentName) {
            if (this.muted) return;
            if (!this.scape && window.ContinentSound) {
                this.scape = window.ContinentSound.createSoundscape(window.ContinentSound.CONTINENT_PLACES);
            }
            if (!this.scape) return;
            const idx = Math.max(0, window.ContinentSound.CONTINENT_PLACES.findIndex(p => p.id === continentName));
            if (!this.scape.state.on) this.scape.toggle(idx);
            else this.scape.setPlace(idx);
            this.ctx = this.scape.state.ctx;
        },

        stopAmbient: function() {
            if (this.scape && this.scape.state.on) this.scape.toggle(0);
            this.ctx = null;
            this.ambientNode = null;
            this.ambientGain = null;
        }

    };

    // Global Tactile Hover Events
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('button, .landmark-item, .cuisine-card, .continent-marker .pin')) {
            AudioEngine.playHover();
        }
    });

    const welcomeScreen = document.getElementById('welcome-screen');
    const beginButton = document.getElementById('begin-button');
    const sidebar = document.getElementById('sidebar');
    const bottomSheet = document.getElementById('bottom-sheet');
    const passportModal = document.getElementById('passport-modal');
    const passportBtn = document.getElementById('passport-btn');
    const closePassportBtn = document.querySelector('.close-passport');

    const muteBtn = document.getElementById('mute-btn');
    muteBtn.textContent='Sound on';muteBtn.setAttribute('aria-label','Sound on');muteBtn.setAttribute('aria-pressed','false');
    if (muteBtn) {
        muteBtn.addEventListener('click', () => {
            const isMuted = AudioEngine.toggleMute();
            muteBtn.textContent=isMuted?'Sound on':'Sound off';muteBtn.setAttribute('aria-label',muteBtn.textContent);muteBtn.setAttribute('aria-pressed',''+!isMuted);
        });
    }


    // Passport State
    let visitedContinents = new Set();try{visitedContinents=new Set(JSON.parse(localStorage.getItem('visitedContinents'))||[])}catch{};

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

        const prompts = {
            'North America': 'What was your favorite National Park?',
            'South America': 'Describe the vibrant colors you saw.',
            'Europe': 'Which historic landmark stood out the most?',
            'Africa': 'What was your most memorable wildlife encounter?',
            'Asia': 'What was your favorite cultural experience?',
            'Australia': 'How did you enjoy the unique landscapes?',
            'Antarctica': 'What was it like exploring the frozen wilderness?'
        };
        document.getElementById('journal-textarea').placeholder = prompts[continentName] || 'What did you discover?';
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
        AudioEngine.playStamp();
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
            const stamp = document.createElement('button');stamp.type='button';stamp.disabled=!isVisited;stamp.setAttribute('aria-label',isVisited?'Open '+continent.name+' journal':continent.name+' stamp not yet collected');
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
        passportModal.setAttribute('aria-hidden', 'false');passportModal.setAttribute('role','dialog');passportModal.setAttribute('aria-modal','true');document.getElementById('app-shell').inert=true;document.getElementById('guide-toolbar').inert=true;document.getElementById('atlas-toggle').inert=true;closePassportBtn.focus();
    });

    closePassportBtn.addEventListener('click', () => {
        passportModal.classList.remove('active');
        passportModal.setAttribute('aria-hidden', 'true');document.getElementById('app-shell').inert=false;document.getElementById('guide-toolbar').inert=document.getElementById('guide-toolbar').hidden;document.getElementById('atlas-toggle').inert=false;passportBtn.focus();
        closeJournal(); // Reset view
    });

    document.getElementById('journal-back-btn').addEventListener('click', closeJournal);
    document.getElementById('journal-save-btn').addEventListener('click', saveJournal);

    // Close on background click
    passportModal.addEventListener('click', (e) => {
        if (e.target === passportModal) {
            passportModal.classList.remove('active');
            passportModal.setAttribute('aria-hidden', 'true');document.getElementById('app-shell').inert=false;document.getElementById('guide-toolbar').inert=document.getElementById('guide-toolbar').hidden;document.getElementById('atlas-toggle').inert=false;passportBtn.focus();
        }
    });

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    let lightboxReturnFocus;
    function openLightbox(src) {
        lightboxReturnFocus=document.activeElement===document.body?document.querySelector('#sidebar.active .close-btn,#bottom-sheet.active .close-btn'):document.activeElement;
        lightboxImg.src = src;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');lightbox.setAttribute('role','dialog');lightbox.setAttribute('aria-modal','true');document.getElementById('app-shell').inert=true;document.getElementById('guide-toolbar').inert=true;document.getElementById('atlas-toggle').inert=true;lightboxClose.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');document.getElementById('app-shell').inert=false;document.getElementById('guide-toolbar').inert=document.getElementById('guide-toolbar').hidden;document.getElementById('atlas-toggle').inert=false;if(lightboxReturnFocus?.isConnected)lightboxReturnFocus.focus();
        const currentSrc = lightboxImg.src;
        setTimeout(() => {
            if (lightboxImg.src === currentSrc) {
                lightboxImg.src = '';
            }
        }, 400); // clear after animation only if it hasn't changed
    }

    document.addEventListener('keydown',e=>{const modal=passportModal.classList.contains('active')?passportModal:lightbox.classList.contains('active')?lightbox:null;if(!modal)return;if(e.key==='Escape'){e.preventDefault();if(modal===passportModal)closePassportBtn.click();else closeLightbox()}if(e.key==='Tab'){const nodes=[...modal.querySelectorAll('button:not(:disabled),[tabindex="0"],textarea')].filter(e=>e.getBoundingClientRect().height>0);const first=nodes[0],last=nodes.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});lightboxClose.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')closeLightbox()});
    lightbox.addEventListener('click', closeLightbox);
    lightboxClose.addEventListener('click', closeLightbox);

    let map;
    let resizeTimer;
    window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{if(!map)return;map.invalidateSize({pan:false});if(document.body.classList.contains('ui-active')){const desktop=innerWidth>768;sidebar.classList.toggle('active',desktop);bottomSheet.classList.toggle('active',!desktop);sidebar.inert=!desktop;bottomSheet.inert=desktop;sidebar.setAttribute('aria-hidden',''+!desktop);bottomSheet.setAttribute('aria-hidden',''+desktop);map.invalidateSize({pan:false});const c=ExplorationManager.currentContinent;if(c)map.setView(c.coords,c.zoom-.5,{animate:false});if(ExplorationManager.currentStep===4){ExplorationManager.resetMapState();ExplorationManager.updateMapState(4)}}},150)});


    const closeUI = () => {
         ParticleSystem.stop();
         AudioEngine.playClick();
         AudioEngine.stopAmbient();
         sidebar.classList.remove('active');
         bottomSheet.classList.remove('active');
         sidebar.inert=bottomSheet.inert=true;sidebar.setAttribute('aria-hidden','true');bottomSheet.setAttribute('aria-hidden','true');
         document.body.classList.remove('ui-active');
         document.getElementById('atlas-toggle').focus({preventScroll:true});

         // Restore default theme colors
         document.documentElement.style.setProperty('--accent', '#635BFF');
         document.documentElement.style.setProperty('--accent-light', '#7A73FF');
         document.documentElement.style.setProperty('--accent-glow', 'rgba(99, 91, 255, 0.5)');

         ExplorationManager.resetMapState();
         document.getElementById('continent-picker').value='';
         if(map){map.invalidateSize();map.setView([20,0],2,{animate:false})}
    };

    document.addEventListener('close-guide',()=>{if(document.body.classList.contains('ui-active'))closeUI()});

    const ExplorationManager = {
        currentStep: 0,
        liveConditions: {},
        fetchLiveConditions: async function(lat, lng) {
            try {
                // Use open-meteo for free weather/time
                const activeName=this.currentContinent?.name;
                const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code&timezone=auto`,{signal:AbortSignal.timeout(6000)});
                const data = await response.json();
                if(this.currentContinent?.name!==activeName)return;

                // Weather codes map
                const weatherIcons = {
                    0: '☀️', // Clear sky
                    1: '🌤️', 2: '⛅', 3: '☁️', // Partly cloudy/overcast
                    45: '🌫️', 48: '🌫️', // Fog
                    51: '🌧️', 53: '🌧️', 55: '🌧️', // Drizzle
                    61: '🌧️', 63: '🌧️', 65: '🌧️', // Rain
                    71: '❄️', 73: '❄️', 75: '❄️', // Snow
                    80: '🌦️', 81: '🌦️', 82: '🌦️', // Showers
                    95: '⛈️', 96: '⛈️', 99: '⛈️' // Thunderstorm
                };

                const code = data.current.weather_code;
                const temp = Math.round(data.current.temperature_2m);
                const icon = weatherIcons[code] || '🌡️';

                // Format time based on timezone
                const date = new Date();
                const timeString = new Intl.DateTimeFormat('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    timeZone: data.timezone,
                    hour12: true
                }).format(date);

                this.liveConditions = {
                    temp: `${temp}°C`,
                    icon: icon,
                    time: timeString
                };

                // Apply Contextual Weather Particles
                const isRain = [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code);
                const isSnow = [71, 73, 75].includes(code);

                if (isRain) {
                    ParticleSystem.start('rain');
                } else if (isSnow) {
                    ParticleSystem.start('snow');
                }

                // Force update if we are on step 1 (Climate)
                if (this.currentStep === 1) {
                    this.updateLiveWidget();
                }
            } catch (error) {
                console.info('Sample weather unavailable');
                this.liveConditions = { temp: 'Unavailable', icon: '', time: 'Unavailable' };
                if (this.currentStep === 1) this.updateLiveWidget();
            }
        },
        updateLiveWidget: function() {
            document.querySelectorAll('[id=live-temp]').forEach(e=>e.textContent=`${this.liveConditions.icon||''} ${this.liveConditions.temp||'Unavailable'}`);
            document.querySelectorAll('[id=live-time]').forEach(e=>e.textContent=this.liveConditions.time||'Unavailable');
        },
        totalSteps: 8, // Intro, Climate, Wildlife, Culture, Landmarks, Tips, Facts, Souvenir
        currentContinent: null,
        exploredSteps: new Set(),
        landmarkMarkers: [],

        resetMapState: function() {
            // Remove any landmark markers
            if (this.landmarkMarkers.length > 0) {
                this.landmarkMarkers.forEach(m => {m.closeTooltip();m.unbindTooltip();map.removeLayer(m)});
                this.landmarkMarkers = [];
            }

            // Restore continent marker opacity
            if (this.currentContinent && map) {
                map.eachLayer(layer => {
                    if (layer instanceof L.Marker && layer.options.title === this.currentContinent.name) {
                        layer.setOpacity(1);
                    }
                });
            }
        },

        startExploration: function(continent) {
            this.currentContinent = continent;
            this.currentStep = 0;
            this.exploredSteps = new Set();
            this.renderStep(this.currentStep);
            this.openUI(continent);
        },

        highlightLandmark: function(index) {
            if (this.landmarkMarkers && this.landmarkMarkers[index]) {
                const marker = this.landmarkMarkers[index];
                const icon = marker.getElement();
                if (icon) icon.classList.add('highlighted');

                // Slight pan towards the landmark
                const isDesktop = window.innerWidth > 768;
                const offset = isDesktop ? [0, -5] : [0, 0];
                map.panTo([marker.getLatLng().lat + offset[0], marker.getLatLng().lng + offset[1]], {animate: false, duration: 0.5});
            }
        },
        resetLandmarkHighlight: function(index) {
            if (this.landmarkMarkers && this.landmarkMarkers[index]) {
                const marker = this.landmarkMarkers[index];
                const icon = marker.getElement();
                if (icon) icon.classList.remove('highlighted');
            }
        },
        updateMapState: function(stepIndex) {
            if (!map || !this.currentContinent) return;
            const continent = this.currentContinent;

            // Helper to toggle continent marker opacity
            const setContinentMarkerOpacity = (opacity) => {
                 map.eachLayer(layer => {
                    if (layer instanceof L.Marker && layer.options.title === continent.name) {
                        layer.setOpacity(opacity);
                    }
                });
            };

            // STEP 4: LANDMARKS
            if (stepIndex === 4) {
                 // 1. Hide main marker
                 setContinentMarkerOpacity(0);

                 // 2. Add landmark markers if not already there
                 if (this.landmarkMarkers.length === 0) {
                     const bounds = L.latLngBounds();
                     continent.landmarks.forEach(lm => {
                         const icon = L.divIcon({
                             className: 'landmark-pin',
                             html: `<div style="background:var(--accent); width:16px; height:16px; border-radius:50%; box-shadow:0 0 0 3px white, 0 4px 8px rgba(0,0,0,0.3); transform:translate(-50%, -50%);"></div>`,
                             iconSize: [0, 0] // CSS handles size
                         });
                         const marker = L.marker(lm.coords, {icon: icon, title: lm.name}).addTo(map);
                         marker.bindTooltip(lm.name, {
                             direction: 'top',
                             offset: [0, -12],
                             className: 'custom-tooltip',
                             permanent: true
                         });
                         this.landmarkMarkers.push(marker);
                         bounds.extend(lm.coords);
                     });

                     // 3. Fly to bounds with padding to respect UI
                     const isDesktop = window.innerWidth > 768;
                     map.fitBounds(bounds, {
                         paddingTopLeft: [40, 40],
                         paddingBottomRight: [40, 40],
                         animate: false,
                         duration: 1.5
                     });
                 }
            }
            // EXITING LANDMARKS (Cleanup and Restore)
            else if (this.landmarkMarkers.length > 0) {
                // 1. Remove landmark markers
                this.landmarkMarkers.forEach(m => {m.closeTooltip();m.unbindTooltip();map.removeLayer(m)});
                this.landmarkMarkers = [];

                // 2. Restore main marker
                setContinentMarkerOpacity(1);

                // 3. Fly back to main continent view
                 const isDesktop = window.innerWidth > 768;
                 let targetLatLng;
                 if (isDesktop) {
                     targetLatLng = continent.coords;
                 } else {
                     targetLatLng = continent.coords;
                 }

                 map.setView(targetLatLng, continent.zoom, {
                     animate: false, duration: 1.5
                 });
            }
        },

        nextStep: function() {
            AudioEngine.playClick();
            if (this.currentStep < this.totalSteps - 1) {
                this.currentStep++;
                this.renderStep(this.currentStep);
            }
        },

        prevStep: function() {
            AudioEngine.playClick();
            if (this.currentStep > 0) {
                this.currentStep--;
                this.renderStep(this.currentStep);
            }
        },

        completeExploration: function() {
            closeUI();
        },

        openUI: function(continent) {
             document.dispatchEvent(new Event('close-atlas'));
             AudioEngine.playClick();
             AudioEngine.playAmbient(continent.name);
             document.getElementById('continent-picker').value=continent.name;
             // Reset and fetch new conditions
             this.liveConditions = { temp: 'Loading...', icon: '⏳', time: 'Loading...' };
             this.fetchLiveConditions(continent.coords[0], continent.coords[1]);
             ParticleSystem.start(continent.name);
             // Set dynamic context theme
             if (continent.themeColor) {
                 document.documentElement.style.setProperty('--accent', continent.themeColor);
                 document.documentElement.style.setProperty('--accent-light', continent.themeColorLight);
                 // Convert hex to rgb for glow
                 const hexToRgb = hex => {
                     let r = 0, g = 0, b = 0;
                     if (hex.length == 4) {
                         r = parseInt(hex[1] + hex[1], 16);
                         g = parseInt(hex[2] + hex[2], 16);
                         b = parseInt(hex[3] + hex[3], 16);
                     } else if (hex.length == 7) {
                         r = parseInt(hex.substring(1, 3), 16);
                         g = parseInt(hex.substring(3, 5), 16);
                         b = parseInt(hex.substring(5, 7), 16);
                     }
                     return `${r}, ${g}, ${b}`;
                 };
                 document.documentElement.style.setProperty('--accent-glow', `rgba(${hexToRgb(continent.themeColor)}, 0.5)`);
             }

             const isDesktop = window.innerWidth > 768;

             if (isDesktop) {
                 // Desktop: Fly to allow sidebar space on left
                 // We shift center WEST so target is EAST
                 map.setView([continent.coords[0], continent.coords[1] - 30], continent.zoom, {
                     animate: false, duration: 1.2, easeLinearity: 0.2
                 });
                 sidebar.classList.add('active');
                 bottomSheet.classList.remove('active');
         sidebar.inert=bottomSheet.inert=true;sidebar.setAttribute('aria-hidden','true');bottomSheet.setAttribute('aria-hidden','true');
             } else {
                 // Mobile: Sidebar is bottom, so we shift map SOUTH so target is NORTH (top)
                 map.setView([continent.coords[0] - 15, continent.coords[1]], continent.zoom - 0.5, {
                     animate: false, duration: 1.2, easeLinearity: 0.2
                 });
                 bottomSheet.classList.add('active');
                 sidebar.classList.remove('active');
             }
             document.body.classList.add('ui-active');
             requestAnimationFrame(()=>{const panel=isDesktop?sidebar:bottomSheet;panel.querySelector('.close-btn').focus({preventScroll:true});});
             sidebar.inert=!isDesktop;bottomSheet.inert=isDesktop;sidebar.setAttribute('aria-hidden',''+!isDesktop);bottomSheet.setAttribute('aria-hidden',''+isDesktop);
             map.stop();map.invalidateSize({pan:false});map.setView(continent.coords,continent.zoom-.5,{animate:false});
        },

        triggerConfetti: function() {
            if(!motion)return;
            const canvas = document.createElement('canvas');
            canvas.className = 'confetti-canvas';
            document.body.appendChild(canvas);

            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const particles = [];
            const colors = ['#635BFF', '#3ECF8E', '#F5A623', '#FF5A5F', '#0A2540'];

            // Create particles from center
            for (let i = 0; i < 150; i++) {
                particles.push({
                    x: canvas.width / 2,
                    y: canvas.height / 2,
                    vx: (Math.random() - 0.5) * 15,
                    vy: (Math.random() - 0.5) * 15 - 5,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    size: Math.random() * 8 + 4,
                    life: 100 + Math.random() * 50
                });
            }

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                let active = false;
                particles.forEach(p => {
                    if (p.life > 0) {
                        active = true;
                        p.x += p.vx;
                        p.y += p.vy;
                        p.vy += 0.3; // Gravity
                        p.vx *= 0.99; // Drag
                        p.life--;
                        p.size *= 0.96; // Shrink

                        ctx.fillStyle = p.color;
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                        ctx.fill();
                    }
                });

                if (active) {
                    requestAnimationFrame(animate);
                } else {
                    canvas.remove();
                }
            }
            animate();
        },

        renderStep: function(stepIndex) {
            const continent = this.currentContinent;

            // A stamp remembers the scenes visited, never a right answer.
            if (stepIndex < 7) this.exploredSteps.add(stepIndex);
            if (stepIndex === 7 && [0,1,2,3,4,5,6].every(i => this.exploredSteps.has(i))) {
                markVisited(continent.name);
            }

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

                // STEP 0: INTRO
                if (stepIndex === 0) {
                    stepTitle = continent.name;
                    stepDesc = continent.description;
                    contentHTML = `
                        ${continent.greeting ? `
                        <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px; opacity:0; animation: staggerFadeUp 0.6s var(--ease-out-quart) forwards;">
                            <div style="font-size:14px; color:var(--accent); font-weight:700;">${sanitizeHTML(continent.greeting)}</div>
                            <button class="play-greeting-btn" aria-label="Play greeting" onclick="AudioEngine.speak(ExplorationManager.currentContinent.spokenGreeting, ExplorationManager.currentContinent.spokenLang)" style="background:rgba(99, 91, 255, 0.1); border:none; cursor:pointer; color:var(--accent); display:flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:50%; transition:all 0.3s ease; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style="margin-left: 2px;"><path d="M8 5v14l11-7z"></path></svg>
                            </button>
                        </div>
                        ` : ''}
                        <div class="hero-image-container">
                            <img src="${continent.gallery[0]}" class="hero-image" alt="${continent.name}" style="width:100%; height:200px; object-fit:cover; border-radius:16px; margin-bottom:24px; box-shadow:var(--shadow-md); cursor: zoom-in;" onclick="openLightbox(this.src)">
                        </div>
                        <div class="nav-buttons center" style="display:flex; justify-content:center;">
                            <button class="nav-btn primary" onclick="ExplorationManager.nextStep()">
                                Begin Journey
                            </button>
                        </div>
                    `;
                }
                // STEP 1: CLIMATE
                else if (stepIndex === 1) {
                    stepTitle = "Climate & Environment";
                    stepDesc = "Discover the natural forces that shape this land.";
                    contentHTML = `
                        <div class="live-conditions-widget stagger-in" style="margin-bottom: 24px; animation-delay: 0.1s;">
                            <div class="widget-header">
                                <span class="pulse-dot"></span> Sample point conditions
                            </div>
                            <div class="widget-body">
                                <div class="widget-item">
                                    <span class="widget-value" id="live-temp">${ExplorationManager.liveConditions.icon || '⏳'} ${ExplorationManager.liveConditions.temp || 'Loading...'}</span>
                                    <span class="widget-label">Sample temperature</span>
                                </div>
                                <div class="widget-divider"></div>
                                <div class="widget-item">
                                    <span class="widget-value" id="live-time">🕒 ${ExplorationManager.liveConditions.time || 'Loading...'}</span>
                                    <span class="widget-label">Sample local time</span>
                                </div>
                            </div>
                        </div>
                        <p>Weather is for a single sample point at ${continent.coords.join(', ')}, not the whole continent. Source: <a href="https://open-meteo.com/" target="_blank" rel="noopener">Open-Meteo</a>.</p><div class="climate-section stagger-in" style="animation-delay: 0.2s;">
                             <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="section-icon"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                             <p>${sanitizeHTML(continent.climate)}</p>
                        </div>
                        <div class="nav-buttons">
                            <button class="nav-btn secondary" onclick="ExplorationManager.prevStep()">Back</button>
                            <button class="nav-btn primary" onclick="ExplorationManager.nextStep()">Native Wildlife</button>
                        </div>
                    `;
                }
                // STEP 2: WILDLIFE (Split from Culture)
                else if (stepIndex === 2) {
                    stepTitle = "Native Wildlife";
                    stepDesc = "The living soul of the continent.";
                    const wildlifeHTML = continent.wildlife.map(w => `<span style="background:rgba(255,255,255,0.7); padding:8px 16px; border-radius:50px; font-size:1rem; font-weight:500; border:1px solid rgba(0,0,0,0.05);">${sanitizeHTML(w)}</span>`).join(' ');

                    // Use second image for wildlife background feeling
                    const bgImage = continent.gallery[1] || continent.gallery[0];

                    contentHTML = `
                         <div style="margin-bottom: 24px;">
                            <img src="${bgImage}" style="width:100%; height:120px; object-fit:cover; border-radius:12px; margin-bottom:16px; opacity:0.9;">
                            <div style="display:flex; flex-wrap:wrap; gap:10px; justify-content:center;">${wildlifeHTML}</div>
                         </div>
                         <div class="nav-buttons">
                            <button class="nav-btn secondary" onclick="ExplorationManager.prevStep()">Back</button>
                            <button class="nav-btn primary" onclick="ExplorationManager.nextStep()">Culture & Cuisine</button>
                        </div>
                    `;
                }
                // STEP 3: CULTURE & CUISINE (New)
                else if (stepIndex === 3) {
                    stepTitle = "Culture & Cuisine";
                    stepDesc = "Taste the flavors and feel the rhythm.";

                    const cuisineHTML = continent.cuisine.map((dish, idx) => `
                        <div class="cuisine-card stagger-in" style="animation-delay: ${0.2 + idx * 0.1}s">
                            <strong>${sanitizeHTML(dish.name)}</strong>
                            <p>${sanitizeHTML(dish.description)}</p>
                        </div>
                    `).join('');

                    contentHTML = `
                         <div style="margin-bottom: 24px; padding: 20px; background: rgba(99, 91, 255, 0.05); border-radius: 16px; border: 1px solid rgba(99, 91, 255, 0.1);">
                            <h4 style="margin-bottom:8px; color:var(--accent); font-size:16px;">Cultural Insight</h4>
                            <p style="font-size:1.05rem; line-height:1.6;">${sanitizeHTML(continent.culture)}</p>
                         </div>
                         <h4 style="margin-bottom:12px; color:var(--text-light); font-size:16px;">Culinary Delights</h4>
                         <div class="cuisine-grid">${cuisineHTML}</div>
                         <div class="nav-buttons">
                            <button class="nav-btn secondary" onclick="ExplorationManager.prevStep()">Back</button>
                            <button class="nav-btn primary" onclick="ExplorationManager.nextStep()">Landmarks</button>
                        </div>
                    `;
                }
                // STEP 4: LANDMARKS
                else if (stepIndex === 4) {
                    stepTitle = 'Landmarks';
                    stepDesc = "A small starting point for further exploration.";
                    const landmarksHTML = continent.landmarks.map((l, idx) => `<li class="landmark-item stagger-in" style="animation-delay: ${0.2 + idx * 0.1}s" onmouseenter="ExplorationManager.highlightLandmark(${idx})" onmouseleave="ExplorationManager.resetLandmarkHighlight(${idx})"><button class="landmark-link" onclick="ExplorationManager.highlightLandmark(${idx})">${sanitizeHTML(l.name)}</button><span class="landmark-coords">${l.coords.join(', ')} (approx.)</span></li>`).join('');
                    const remainingGallery = continent.gallery.slice(1).map(url => `<img src="${url}" loading="lazy" onclick="openLightbox(this.src)" style="cursor: zoom-in;">`).join('');
                    contentHTML = `
                        <p>${sanitizeHTML(continent.detail)}</p><p>Map points are approximate. Antarctica is clipped at the poles by this map projection.</p><ul class="landmark-list">${landmarksHTML}</ul><p>Gallery photos are generic landscape illustrations, not verified views of these landmarks.</p>
                        <div class="gallery-grid" style="margin-top: 20px;">${remainingGallery}</div>
                        <div class="nav-buttons">
                            <button class="nav-btn secondary" onclick="ExplorationManager.prevStep()">Back</button>
                            <button class="nav-btn primary" onclick="ExplorationManager.nextStep()">Travel Tips</button>
                        </div>
                    `;
                }
                // STEP 5: TRAVEL TIPS (New)
                else if (stepIndex === 5) {
                    stepTitle = "Travel Essentials";
                    stepDesc = "Smart tips for a smooth journey.";
                    const tipsHTML = continent.travelTips.map((tip, idx) => `
                        <li class="tip-item stagger-in" style="animation-delay: ${0.2 + idx * 0.1}s">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            <span>${sanitizeHTML(tip)}</span>
                        </li>
                    `).join('');

                    contentHTML = `
                        <p>General background only. Check current local advice, entry rules and costs before travel.</p><ul class="tips-list">${tipsHTML}</ul>
                        <div class="nav-buttons">
                            <button class="nav-btn secondary" onclick="ExplorationManager.prevStep()">Back</button>
                            <button class="nav-btn primary" onclick="ExplorationManager.nextStep()">Quick Facts</button>
                        </div>
                    `;
                }
                // STEP 6: FACTS
                else if (stepIndex === 6) {
                    stepTitle = "Quick Facts";
                    stepDesc = "Interesting tidbits to know.";
                    const factsHTML = continent.facts.map((f, idx) => `<div class="fact-card stagger-in" style="animation-delay: ${0.2 + idx * 0.1}s"><p><strong>Did you know?</strong><br>${sanitizeHTML(f)}</p></div>`).join('');
                    contentHTML = `
                        ${factsHTML}
                        <div style="text-align: center; margin: 20px 0;">
                             <a href="${continent.wikiLink}" class="read-more-link" target="_blank" rel="noopener noreferrer">
                                <span>Read more on Wikipedia</span>
                             </a>
                        </div>
                        <div class="nav-buttons">
                            <button class="nav-btn secondary" onclick="ExplorationManager.prevStep()">Back</button>
                            <button class="nav-btn primary" onclick="ExplorationManager.nextStep()">Collect Passport Stamp</button>
                        </div>
                    `;
                }
                // STEP 7: SOUVENIR
                else if (stepIndex === 7) {
                    stepTitle = "Journey Complete!";
                    stepDesc = "A souvenir of your journey through " + continent.name + ".";
                    if(containerId==='sheet-content')this.triggerConfetti();
                    contentHTML = `
                        <div class="completion-view" style="text-align:center; padding: 40px 0;">
                            <div class="success-icon-wrapper" style="margin-bottom:20px; color:var(--success);">
                                <svg viewBox="0 0 24 24" width="80" height="80" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="success-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            </div>
                            <h3 style="margin-bottom:10px;">Passport Stamp Collected!</h3>
                            <p style="color:var(--text-light);">A little reminder of the landscapes, wildlife and places you explored.</p>
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
                container.innerHTML = progressHTML + contentHTML + `<p class="source-note">Background: <a href="${continent.source}" target="_blank" rel="noopener">${continent.name==='Antarctica'?'British Antarctic Survey':'Britannica'}</a>. Seven-continent model; regional examples are not exhaustive.</p>`;

                container.scrollTop=0;
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

                // Update Map State

            };

            // Update visible UI based on mode
            // We update both just in case user resizes, but prioritize based on logic if needed
            // Actually, updating both is safer for resize handling without reload
            updateUI('sidebar-content', 'sidebar-title', 'sidebar-desc');
            updateUI('sheet-content', 'sheet-title', 'sheet-desc');
            this.updateMapState(stepIndex);
        }
    };

    // Expose logic for inline HTML handlers if needed (though we will try to use addEventListener)
    window.ExplorationManager = ExplorationManager;
    window.AudioEngine = AudioEngine;
    window.guideContinents=continents;
    window.openLightbox = openLightbox;


    beginButton.addEventListener('click', function() {
        welcomeScreen.style.display='none';document.getElementById('app-shell').inert=false;document.getElementById('app-shell').removeAttribute('aria-hidden');document.getElementById('atlas-toggle').hidden=false;initializeMap();return;

    });

    function initializeMap() {
        const loader = document.getElementById('loader');
        map = L.map('map', {
            zoomControl: false,
            attributionControl: false,
            center: [20, 0],
            zoom: 2,
            minZoom: 1,
            maxZoom: 7,
            worldCopyJump: true,
        });

        // Key-free OpenStreetMap. Attribution must remain visible.
        const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 7, updateWhenIdle: true, keepBuffer: 1
        });

        tileLayer.on('loading', function() { loader.style.display = 'block'; });
        tileLayer.on('load', function() { loader.style.display = 'none'; });

        tileLayer.on('tileerror',()=>{loader.style.display='none'});
        tileLayer.addTo(map);
        loader.style.display='none';
        window.guideMap=map;

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


        continents.forEach(c=>{const button=document.createElement('button');button.type='button';button.textContent=c.name;button.dataset.continent=c.name;button.addEventListener('click',()=>ExplorationManager.startExploration(c));document.getElementById('continent-choices').appendChild(button)});
        document.getElementById('reset-map').onclick=()=>{map.stop();closeUI()};
        document.getElementById('theme-toggle').onclick=e=>{document.body.classList.toggle('dark');e.target.textContent=document.body.classList.contains('dark')?'Light UI':'Dark UI'};
        document.getElementById('motion-toggle').textContent=motion?'Pause motion':'Play motion';
        document.getElementById('motion-toggle').onclick=e=>{motion=!motion;document.body.classList.toggle('motion-paused',!motion);if(!motion){map.stop();ParticleSystem.stop()}else if(ExplorationManager.currentContinent)ParticleSystem.start(ExplorationManager.currentContinent.name);e.target.textContent=motion?'Pause motion':'Play motion'};
        continents.forEach((continent, index) => {
            const isVisited = visitedContinents.has(continent.name);
            const continentIcon = L.divIcon({
                className: `continent-marker ${isVisited ? 'visited-marker' : ''}`,
                html: `<div class="pin" aria-hidden="true" style="animation: fadeInUp 0.5s ease-out forwards ${index * 100}ms; opacity: 0;">
                         <div class="pin-ring" style="border-color: ${continent.themeColor};"></div>
                         <div class="pin-inner" style="background: linear-gradient(135deg, ${continent.themeColorLight}, ${continent.themeColor}); box-shadow: 0 0 0 3px #fff, 0 4px 12px ${continent.themeColor}80;"></div>
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
            marker.getElement()?.setAttribute('aria-label',continent.name);
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

    }
});
