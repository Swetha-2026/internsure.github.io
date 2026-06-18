// JavaScript logic code for InternSure Risk Assessment Calculator

document.getElementById('quiz-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Select all checked options
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');
    const q4 = document.querySelector('input[name="q4"]:checked');
    const q5 = document.querySelector('input[name="q5"]:checked');

    if (!q1 || !q2 || !q3 || !q4 || !q5) {
        alert("Please answer all the questions to calculate risk score!");
        return;
    }

    // Calculate dynamic cumulative total score
    let score = parseInt(q1.value) + parseInt(q2.value) + parseInt(q3.value) + parseInt(q4.value) + parseInt(q5.value);
    
    // Cap maximum value at 100
    if (score > 100) score = 100;

    // Display updates inside layout Elements
    document.getElementById('score-num').innerText = score;
    
    const riskLevelElement = document.getElementById('risk-level');
    const riskDescElement = document.getElementById('risk-desc');
    const flagsList = document.getElementById('red-flags-list');
    
    // Clear old flags trace list
    flagsList.innerHTML = '';
    let flagsFound = [];

    // Classification Logic Metrics Mapping
    if (score >= 60) {
        riskLevelElement.innerText = "High Risk 🚨";
        riskLevelElement.style.color = "#ef4444";
        riskDescElement.innerText = "Intha internship offer scam aaga niriaya vaippu iruku. Ethavathu fee kettal nichayam panam tharathiga!";
    } else if (score >= 25) {
        riskLevelElement.innerText = "Medium Risk ⚠️";
        riskLevelElement.style.color = "#f59e0b";
        riskDescElement.innerText = "Sila sandhegapadum features iruku. Careful ah verify pannitu, unga seniors kitta pesittu mudivu edunga.";
    } else {
        riskLevelElement.innerText = "Low Risk ✅";
        riskLevelElement.style.color = "#10b981";
        riskDescElement.innerText = "Intha offer safe ah thonuthu. Entha scam pattern-um detect aagala. Best wishes for your internship!";
    }

    // Dynamic extraction of warnings text triggers
    if (parseInt(q1.value) > 0) flagsFound.push("Contacted via non-official channels like WhatsApp, Telegram or generic public mail domain.");
    if (parseInt(q2.value) > 0) flagsFound.push("Asked for money (Security Deposit / Training Fee / Material charges) which legitimate internships never demand.");
    if (parseInt(q3.value) > 0) flagsFound.push("Direct selection without any robust review screening process / interview evaluation.");
    if (parseInt(q4.value) > 0) flagsFound.push("High pressure urgency tactic applied to force quick cash transactions.");
    if (parseInt(q5.value) > 0) flagsFound.push("Missing credible legal address or standard layout verification on the written document.");

    if (flagsFound.length === 0) {
        flagsList.innerHTML = '<p style="color: #10b981; font-weight: 500;">No immediate red flags detected from your inputs.</p>';
    } else {
        flagsFound.forEach(flag => {
            const div = document.createElement('div');
            div.className = 'flag-alert';
            div.innerText = flag;
            flagsList.appendChild(div);
        });
    }

    // Make Result Dashboard visible and auto scroll cleanly
    const resultSection = document.getElementById('result');
    resultSection.classList.remove('hidden');
    resultSection.scrollIntoView({ behavior: 'smooth' });
});
