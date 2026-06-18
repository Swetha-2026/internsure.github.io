document.addEventListener("DOMContentLoaded", () => {
    initFormProgress();
    initActiveNavTracking();
    initCalculationEngine();
});

// Navigation smooth scrolling anchor integration helper
function scrollToSection(id) {
    const target = document.getElementById(id);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}

// Monitored Progress updates tracking engine
function initFormProgress() {
    const form = document.getElementById('riskForm');
    const inputs = form.querySelectorAll('input[type="radio"]');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    inputs.forEach(input => {
        input.addEventListener('change', () => {
            // Manage tile background UI states dynamically 
            const name = input.name;
            const parentTiles = form.querySelectorAll(`input[name="${name}"]`);
            parentTiles.forEach(p => p.parentElement.classList.remove('selected-tile'));
            if(input.checked) {
                input.parentElement.classList.add('selected-tile');
            }

            // Calculate completed answered segments
            const totalQuestions = 6;
            const answeredUniqueGroups = new Set();
            inputs.forEach(i => {
                if(i.checked) answeredUniqueGroups.add(i.name);
            });

            const percent = Math.round((answeredUniqueGroups.size / totalQuestions) * 100);
            progressFill.style.width = `${percent}%`;
            progressText.innerText = `${percent}%`;
        });
    });
}

// Active Intersection Tracking highlights active links on navigation bar automatically
function initActiveNavTracking() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let activeId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;
            if (window.scrollY >= sectionTop) {
                activeId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    });
}

// Computational calculation mapping metrics, array vulnerabilities summaries
function initCalculationEngine() {
    const calculateBtn = document.getElementById('calculateBtn');
    
    calculateBtn.addEventListener('click', () => {
        const form = document.getElementById('riskForm');
        const q1 = form.querySelector('input[name="q1"]:checked');
        const q2 = form.querySelector('input[name="q2"]:checked');
        const q3 = form.querySelector('input[name="q3"]:checked');
        const q4 = form.querySelector('input[name="q4"]:checked');
        const q5 = form.querySelector('input[name="q5"]:checked');
        const q6 = form.querySelector('input[name="q6"]:checked');

        // Validation rule validation layer
        if (!q1 || !q2 || !q3 || !q4 || !q5 || !q6) {
            alert("⚠️ Please answer all questions before running the risk analysis engine.");
            return;
        }

        // Aggregate system value processing
        const score = parseInt(q1.value) + parseInt(q2.value) + parseInt(q3.value) + 
                      parseInt(q4.value) + parseInt(q5.value) + parseInt(q6.value);

        displayDashboardResults(score, { q1, q2, q3, q4, q5, q6 });
    });
}

function displayDashboardResults(score, inputs) {
    const dashboard = document.getElementById('result-dashboard');
    const scoreNumber = document.getElementById('scoreNumber');
    const scoreCircle = document.getElementById('scoreCircle');
    const badge = document.getElementById('riskLevelBadge');
    const explanation = document.getElementById('riskExplanation');
    const redFlagsList = document.getElementById('redFlagsList');
    const recsList = document.getElementById('recommendationsList');

    // Unhide Dashboard View frame
    dashboard.classList.remove('hidden');

    // Reset runtime dashboard category state tags
    dashboard.className = "result-dashboard glass-card animate-up";
    badge.className = "risk-badge";

    let tier = '';
    let categoryClass = '';
    let descriptionText = '';
    let conicColor = '';

    if (score <= 30) {
        tier = 'Low Risk';
        categoryClass = 'low-risk';
        conicColor = '#10b981';
        badge.classList.add('badge-low');
        descriptionText = "This position appears safe. The structural parameters line up closely with verified, compliant institutional hiring profiles. Proceed with normal precautions.";
    } else if (score <= 60) {
        tier = 'Medium Risk';
        categoryClass = 'med-risk';
        conicColor = '#f59e0b';
        badge.classList.add('badge-medium');
        descriptionText = "Caution advised. Several operational metrics fall outside normal verification guidelines. Run secondary checks on structural domain registration and legal headers.";
    } else {
        tier = 'High Risk';
        categoryClass = 'high-risk';
        conicColor = '#ef4444';
        badge.classList.add('badge-high');
        descriptionText = "Critical security alert. The tracking profiles exhibit direct correlations with modern phishing and advance-fee scam models. High likelihood of unauthorized harvesting or spoofing.";
    }

    dashboard.classList.add(categoryClass);
    badge.innerText = tier;
    explanation.innerText = descriptionText;

    // Smooth counter animation engine
    animateScoreCounter(score, scoreNumber, scoreCircle, conicColor);

    // Evaluate structural responses for flag mapping
    generateContextualFeedback(inputs, redFlagsList, recsList);

    // Scroll to dashboard
    dashboard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function animateScoreCounter(targetScore, numberElement, circleElement, color) {
    let current = 0;
    const duration = 800; // ms
    const increment = targetScore / (duration / 16); // ~60fps target

    const timer = setInterval(() => {
        current += increment;
        if (current >= targetScore) {
            current = targetScore;
            clearInterval(timer);
        }
        const displayVal = Math.floor(current);
        numberElement.innerText = displayVal;
        circleElement.style.background = `conic-gradient(${color} ${displayVal * 3.6}deg, rgba(255,255,255,0.05) 0deg)`;
    }, 16);
}

function generateContextualFeedback(inputs, flagsContainer, recsContainer) {
    flagsContainer.innerHTML = '';
    recsContainer.innerHTML = '';

    let flagCount = 0;

    // Rule Evaluations mapping
    if (parseInt(inputs.q1.value) === 20) {
        addListElement(flagsContainer, '<i class="fa-solid fa-circle-xmark text-danger"></i> Sourced via unverified random chat software channels (WhatsApp/Telegram).');
        flagCount++;
    }
    if (parseInt(inputs.q2.value) === 25) {
        addListElement(flagsContainer, '<i class="fa-solid fa-circle-xmark text-danger"></i> Demanding upfront capital/training acquisition investment payments.');
        flagCount++;
    } else if (parseInt(inputs.q2.value) === 15) {
        addListElement(flagsContainer, '<i class="fa-solid fa-circle-xmark text-danger"></i> Imposed suspicious non-standard documentation registration deposits.');
        flagCount++;
    }
    if (parseInt(inputs.q3.value) === 20) {
        addListElement(flagsContainer, '<i class="fa-solid fa-circle-xmark text-danger"></i> Automatic onboarding devoid of selective skills screening or vetting interviews.');
        flagCount++;
    }
    if (parseInt(inputs.q4.value) === 15) {
        addListElement(flagsContainer, '<i class="fa-solid fa-circle-xmark text-danger"></i> Utilizing aggressive sales pressure timelines to bypass security reflection.');
        flagCount++;
    }
    if (parseInt(inputs.q5.value) === 10) {
        addListElement(flagsContainer, '<i class="fa-solid fa-circle-xmark text-danger"></i> Missing verifiable company letterhead validation parameters.');
        flagCount++;
    }
    if (parseInt(inputs.q6.value) === 10) {
        addListElement(flagsContainer, '<i class="fa-solid fa-circle-xmark text-danger"></i> Unlisted, newly registered, or hidden corporate entity registry data footprint.');
        flagCount++;
    }

    if (flagCount === 0) {
        addListElement(flagsContainer, '<i class="fa-solid fa-circle-check text-success"></i> Excellent. No structural vulnerabilities intercepted.');
    }

    // Default Actionable safety recommendations pipeline population
    addListElement(recsContainer, '<i class="fa-solid fa-circle-right"></i> Cross-examine the employer identity on LinkedIn against registered staff arrays.');
    addListElement(recsContainer, '<i class="fa-solid fa-circle-right"></i> Send an verification inquiry via official corporate email domain.');
    addListElement(recsContainer, '<i class="fa-solid fa-circle-right"></i> Never submit processing payment credentials or personal background documents.');
    addListElement(recsContainer, '<i class="fa-solid fa-circle-right"></i> Report unverified or suspicious recruitment accounts directly to placement cells.');
}

function addListElement(parent, htmlContent) {
    const li = document.createElement('li');
    li.innerHTML = htmlContent;
    parent.appendChild(li);
}
