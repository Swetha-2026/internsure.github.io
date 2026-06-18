// JavaScript logic code for InternSure Risk Assessment Calculator

document.getElementById('quiz-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Select checked options
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');
    const q4 = document.querySelector('input[name="q4"]:checked');
    const q5 = document.querySelector('input[name="q5"]:checked');

    if (!q1 || !q2 || !q3 || !q4 || !q5) {
        alert("Please answer all the questions to calculate your risk score.");
        return;
    }

    // Cumulative weighted danger total score calculations
    let score = parseInt(q1.value) + parseInt(q2.value) + parseInt(q3.value) + parseInt(q4.value) + parseInt(q5.value);
    
    if (score > 100) score = 100;

    // Display values into output components
    document.getElementById('score-num').innerText = score;
    
    const riskLevelElement = document.getElementById('risk-level');
    const riskDescElement = document.getElementById('risk-desc');
    const flagsList = document.getElementById('red-flags-list');
    
    flagsList.innerHTML = '';
    let flagsFound = [];

    // Score Classification Metric Matrix
    if (score >= 60) {
        riskLevelElement.innerText = "High Risk 🚨";
        riskLevelElement.style.color = "#ef4444";
        riskDescElement.innerText = "This internship offer shows strong correlation with verified recruitment scams. Do not make any financial transfers or upfront payments under any circumstances.";
    } else if (score >= 25) {
        riskLevelElement.innerText = "Medium Risk ⚠️";
        riskLevelElement.style.color = "#f59e0b";
        riskDescElement.innerText = "Several suspicious parameters were flagged. Proceed with high caution, investigate further, and request feedback from seniors or professors before deciding.";
    } else {
        riskLevelElement.innerText = "Low Risk ✅";
        riskLevelElement.style.color = "#10b981";
        riskDescElement.innerText = "The details provided conform to standard credible operations. No common malicious patterns were caught. Best of luck with your internship!";
    }

    // Analyze individual criteria values for generating active warning feeds
    if (parseInt(q1.value) > 0) flagsFound.push("Contacted via unverified or non-professional channels (WhatsApp, Telegram, or a personal domain email address).");
    if (parseInt(q2.value) > 0) flagsFound.push("Upfront fees or hidden expenses (Training, Tool setup, Deposits) were explicitly demanded from you.");
    if (parseInt(q3.value) > 0) flagsFound.push("Offer extended instantly without structured interviews, background checks, or evaluation processes.");
    if (parseInt(q4.value) > 0) flagsFound.push("Artificial time limits and extreme urgency pressure applied to circumvent verification.");
    if (parseInt(q5.value) > 0) flagsFound.push("Missing a professional standardized layout, verified physical addresses, or valid registration signs.");

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

    // Make Result Dashboard visible and auto-scroll cleanly
    const resultSection = document.getElementById('result');
    resultSection.classList.remove('hidden');
    resultSection.scrollIntoView({ behavior: 'smooth' });
});
