// Array tracking wizard screens sequentially 
const screenOrderList = [
    'screen-landing',
    'screen-metadata',
    'screen-q1',
    'screen-q2',
    'screen-q3',
    'screen-q4',
    'screen-q5',
    'screen-q6',
    'screen-q7',
    'screen-q8',
    'screen-q9',
    'screen-q10',
    'output-dashboard'
];

// Handles state switches between views instantly
function navigateToScreen(targetScreenId) {
    // Hide all modular screen components
    document.querySelectorAll('.dynamic-screen').forEach(screen => {
        screen.classList.add('hidden');
    });

    // Make target panel screen layout visible
    const targetEl = document.getElementById(targetScreenId);
    if (targetEl) {
        targetEl.classList.remove('hidden');
    }

    // Update current step counter numbers in navbar header
    const progressLabel = document.getElementById('page-progress');
    const currentIdx = screenOrderList.indexOf(targetScreenId);

    if (currentIdx > 0 && currentIdx < screenOrderList.length - 1) {
        progressLabel.classList.remove('hidden');
        progressLabel.innerText = `Step ${currentIdx} of 11`;
    } else {
        progressLabel.classList.add('hidden');
    }
}

// Automatically shifts layout scene when an answer pill option gets triggered
function nextQuestion(currentQuestionIndex) {
    // Artificial mini-delay so user witnesses selection highlight state transition
    setTimeout(() => {
        navigateToScreen(`screen-q${currentQuestionIndex + 1}`);
    }, 250);
}

// Risk Evaluation Logic Aggregator
function calculateFinalScore(event) {
    event.preventDefault();

    const rawCompany = document.getElementById('companyName').value.trim();
    const targetCompany = rawCompany ? rawCompany : "Your Internship Offer";

    let totalPoints = 0;
    let identifiedFlags = [];

    const evaluationMetrics = [
        { name: 'q1', check: (val) => val > 0, text: " Demanding upfront charging matrices for registration assets or training kits." },
        { name: 'q2', check: (val) => val >= 40, text: "Recruitment executed entirely via third-party messaging spaces (WhatsApp/Telegram)." },
        { name: 'q3', check: (val) => val >= 20, text: "Lacks transparent digital footprints or verifiable corporate domain references." },
        { name: 'q4', check: (val) => val > 0, text: "Offered immediate role positioning without an evaluation workflow pipeline." },
        { name: 'q5', check: (val) => val > 0, text: "Missing official formal appointment verification frameworks." },
        { name: 'q6', check: (val) => val > 0, text: "Aggressive inquiries for confidential personal records prematurely." },
        { name: 'q7', check: (val) => val > 0, text: "Onboarding conditions look disproportionately generous to be true." },
        { name: 'q8', check: (val) => val > 0, text: "Imposes strict high-pressure deadline boundaries on candidates." },
        { name: 'q9', check: (val) => val === 30, text: "Communications routed using generic free platform servers." },
        { name: 'q10', check: (val) => val > 0, text: "Stipend values are highly inflated above conventional industry averages." }
    ];

    evaluationMetrics.forEach(metric => {
        const checkedNode = document.querySelector(`input[name="${metric.name}"]:checked`);
        if (checkedNode) {
            const pointValue = parseInt(checkedNode.value);
            totalPoints += pointValue;
            if (metric.check(pointValue)) {
                identifiedFlags.push(metric.text);
            }
        }
    });

    const standardScore = Math.min(totalPoints, 100);

    // Calculate Risk Tier Badge Attributes
    let classification = "LOW RISK";
    let styleClasses = "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";

    if (standardScore >= 31 && standardScore <= 60) {
        classification = "MEDIUM RISK";
        styleClasses = "bg-amber-500/20 text-amber-400 border border-amber-500/30";
    } else if (standardScore > 60) {
        classification = "HIGH RISK";
        styleClasses = "bg-rose-500/20 text-rose-400 border border-rose-500/30";
    }

    // Set Data Node Inner Content
    document.getElementById('out-target-headline').innerText = targetCompany;
    document.getElementById('out-score-label').innerText = `${standardScore}/100`;

    const badgeNode = document.getElementById('out-badge');
    badgeNode.innerText = classification;
    badgeNode.className = `text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-full ${styleClasses}`;

    const listContainer = document.getElementById('out-flags-list');
    listContainer.innerHTML = "";

    if (identifiedFlags.length === 0) {
        listContainer.innerHTML = "<li>No operational high-level risk criteria detected inside selection inputs. Proceed with standard due diligence guidelines.</li>";
    } else {
        identifiedFlags.forEach(flagDescription => {
            const itemElement = document.createElement('li');
            itemElement.innerText = flagDescription;
            listContainer.appendChild(itemElement);
        });
    }

    // Switch View to Output Panel Dashboard Screen View
    navigateToScreen('output-dashboard');
}

// Reset System State back to Entry Point Sequence
function resetCalculatorFramework() {
    document.getElementById('riskEngineForm').reset();
    navigateToScreen('screen-landing');
}
