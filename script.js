
// Advanced 4-Tier Automated Threat Spectrum Aggregator Engine

document.getElementById('quiz-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Isolate targeted tracking variables
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');
    const q4 = document.querySelector('input[name="q4"]:checked');
    const q5 = document.querySelector('input[name="q5"]:checked');

    if (!q1 || !q2 || !q3 || !q4 || !q5) {
        alert("Action Aborted: Please supply metrics across all evaluation parameters.");
        return;
    }

    // Compute heuristic cumulative anomaly metric 
    let score = parseInt(q1.value) + parseInt(q2.value) + parseInt(q3.value) + parseInt(q4.value) + parseInt(q5.value);
    if (score > 100) score = 100;

    // Target tracking elements inside UI display terminal
    document.getElementById('score-num').innerText = score + "%";
    
    const circle = document.querySelector('.score-circle');
    const riskLevel = document.getElementById('risk-level');
    const riskDesc = document.getElementById('risk-desc');
    const flagsList = document.getElementById('red-flags-list');
    
    flagsList.innerHTML = '';
    let flagsFound = [];

    // Processing 4-Tier Enhanced Risk Spectrum Logic
    if (score >= 70) {
        // Critical Level Configuration
        riskLevel.innerText = "Critical Scam Flag 🚨";
        riskLevel.style.color = "#ef4444";
        circle.style.borderColor = "#ef4444";
        circle.style.boxShadow = "0 0 30px rgba(239, 68, 68, 0.4)";
        riskDesc.innerText = "Extreme Threat: This proposal exhibits definitive, structural markers typical of financial harvesting operations. Terminate engagement instantly. Do not sign documents or send funds.";
    } else if (score >= 45) {
        // High Level Configuration
        riskLevel.innerText = "High Risk Structure ⚠️";
        riskLevel.style.color = "#f59e0b";
        circle.style.borderColor = "#f59e0b";
        circle.style.boxShadow = "0 0 30px rgba(245, 158, 11, 0.4)";
        riskDesc.innerText = "Heavy Threat Indicators: Multiple standard corporate compliance metrics failed verification. High probability of deceptive operations or predatory fees.";
    } else if (score >= 15) {
        // Average Level Configuration
        riskLevel.innerText = "Average Threat Level ⚡";
        riskLevel.style.color = "#6366f1";
        circle.style.borderColor = "#6366f1";
        circle.style.boxShadow = "0 0 30px rgba(99, 102, 241, 0.4)";
        riskDesc.innerText = "Moderate Anomaly Index: Certain components align with suboptimal operational procedures or unverified agency structures. Exercise strict procedural verification.";
    } else {
        // Low Level Configuration
        riskLevel.innerText = "Verified Operations ✅";
        riskLevel.style.color = "#10b981";
        circle.style.borderColor = "#10b981";
        circle.style.boxShadow = "0 0 30px rgba(16, 185, 129, 0.4)";
        riskDesc.innerText = "Secure Structural Configuration: No malicious anomalies detected. Operational attributes fit within safe parameters.";
    }

    // Isolate active warning text arrays matching selections
    if (parseInt(q1.value) === 15) flagsFound.push("Communication relies on non-corporate open domain endpoints (@gmail, @outlook).");
    if (parseInt(q1.value) === 25) flagsFound.push("Initial routing payload deployed via unverified external text chats (WhatsApp/Telegram).");
    if (parseInt(q2.value) === 20) flagsFound.push("Demands transactional conversion labeled under training layer credentials.");
    if (parseInt(q2.value) === 40) flagsFound.push("Direct financial premium requisition ordered upfront for basic onboarding validation.");
    if (parseInt(q3.value) === 15) flagsFound.push("Evaluation restricted entirely to structured offline static surveys without interview steps.");
    if (parseInt(q3.value) === 30) flagsFound.push("Instant hiring confirmation bypassed completely all standard verification rounds.");
    if (parseInt(q4.value) > 0) flagsFound.push("High-velocity coercion framework designed to rush execution parameters.");
    if (parseInt(q5.value) > 0) flagsFound.push("Contract documentation parameters lack official entity registration signatures.");

    if (flagsFound.length === 0) {
        flagsList.innerHTML = '<p style="color: #10b981; font-weight: 600;">System Check Passed: Zero critical structural anomalies isolated.</p>';
    } else {
        flagsFound.forEach(flag => {
            const div = document.createElement('div');
            div.className = 'flag-alert';
            div.innerText = "🚩 [Anomaly Isolated] " + flag;
            flagsList.appendChild(div);
        });
    }

    // Clean viewport slide transition to diagnostics panel
    const resultSection = document.getElementById('result');
    resultSection.classList.remove('hidden');
    resultSection.scrollIntoView({ behavior: 'smooth' });
});    
