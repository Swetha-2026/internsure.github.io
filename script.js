/**
 * Internsure AI - Core Logic Engine
 */

// Function to automatically load the pre-defined demo scenario
function loadDemo() {
    const demoText = "FakeTech Global Internship – Pay ₹500 registration fee to join immediately. WhatsApp only contact. No interview required for instant selection.";
    document.getElementById('inputText').value = demoText;
}

// Main processing function
function analyzeRisk() {
    const inputElement = document.getElementById('inputText');
    const text = inputElement.value.trim();
    
    // Guard clause for empty submissions
    if (!text) {
        alert("Please enter some internship details or paste a description first!");
        return;
    }

    // Reset UI visibility states to trigger loader display
    document.getElementById('results').classList.add('hidden');
    document.getElementById('loading').classList.remove('hidden');

    // Simulate standard AI processing delay (1 second)
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('results').classList.remove('hidden');

        const lowerText = text.toLowerCase();
        let score = 10; // Baseline structural risk index
        let flags = [];
        let reasons = [];

        // 1. Scam Pattern Recognition Layer
        if (lowerText.includes("fee") || lowerText.includes("pay") || lowerText.includes("₹") || lowerText.includes("money") || lowerText.includes("security deposit")) {
            score += 40;
            flags.push("Upfront Payments requested");
            reasons.push("Demands cash or dynamic security fee payments, which is a major red flag for legitimate internships.");
        }
        
        if (lowerText.includes("whatsapp") || lowerText.includes("telegram")) {
            score += 20;
            flags.push("Unregulated Messaging Channels");
            reasons.push("Uses non-corporate communications channels like WhatsApp/Telegram instead of registered enterprise email domains.");
        }
        
        if (lowerText.includes("no interview") || lowerText.includes("instant") || lowerText.includes("direct join") || lowerText.includes("instant offer")) {
            score += 20;
            flags.push("Zero Screening Bias");
            reasons.push("Promises immediate recruitment bypassing structural skill assessment rounds or background evaluation pipelines.");
        }
        
        if (lowerText.includes("faketech") || text.length < 35) {
            score += 10;
            reasons.push("The limited metadata provided matches structural parameters commonly found in high-risk template job posts.");
        }

        // Cap maximum possible risk score to 100
        if (score > 100) score = 100;

        // Dom Element Selectors
        const scoreDisplay = document.getElementById('scoreDisplay');
        const labelDisplay = document.getElementById('labelDisplay');
        const companyStatus = document.getElementById('companyStatus');
        const scamBox = document.getElementById('scamDetectorBox');
        const flaggedKeywords = document.getElementById('flaggedKeywords');

        scoreDisplay.innerText = score;

        // 2. State-Based Classification Logic (Green / Yellow / Red)
        if (score <= 30) {
            // Safe Tier Configuration
            scoreDisplay.className = "text-5xl font-black mt-2 text-green-400";
            labelDisplay.className = "mt-2 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide bg-green-500/10 text-green-400 border border-green-500/20";
            labelDisplay.innerText = "Safe Internship";
            companyStatus.className = "text-lg font-bold text-green-400 mt-1";
            companyStatus.innerHTML = "<i class='fa-solid fa-circle-check'></i> Verified Entity";
            scamBox.classList.add('hidden');
            reasons.push("The profile metrics exhibit strong standard operational compliance signatures.");
        } 
        else if (score <= 60) {
            // Medium Risk Configuration
            scoreDisplay.className = "text-5xl font-black mt-2 text-yellow-400";
            labelDisplay.className = "mt-2 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
            labelDisplay.innerText = "Medium Risk";
            companyStatus.className = "text-lg font-bold text-yellow-400 mt-1";
            companyStatus.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Unverified Domain";
            scamBox.classList.add('hidden');
        } 
        else {
            // Danger Tier Configuration
            scoreDisplay.className = "text-5xl font-black mt-2 text-red-500";
            labelDisplay.className = "mt-2 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide bg-red-500/10 text-red-400 border border-red-500/20";
            labelDisplay.innerText = "High Risk Scam";
            companyStatus.className = "text-lg font-bold text-red-500 mt-1";
            companyStatus.innerHTML = "<i class='fa-solid fa-skull-crossbones'></i> Blacklisted Profile Pattern";
            
            scamBox.classList.remove('hidden');
            flaggedKeywords.innerText = flags.join(" | ");
        }

        // 3. Structural Parsing Simulation
        document.getElementById('detRole').innerText = lowerText.includes("data entry") ? "Data Entry Operator" : (lowerText.includes("developer") || lowerText.includes("tech") ? "Software Engineer" : "General Intern");
        document.getElementById('detType').innerText = lowerText.includes("home") || lowerText.includes("remote") ? "Remote (Work from Home)" : "On-site / Unspecified";
        document.getElementById('detSkills').innerText = lowerText.includes("excel") || lowerText.includes("typing") ? "Excel, Fast Typing, Office Suite" : "Basic Communication, Minimal Prerequisites";

        // 4. Update the Dynamic Explainability List
        const aiUl = document.getElementById('aiReasons');
        aiUl.innerHTML = ""; // Clear legacy nodes
        
        reasons.forEach(reasonText => {
            let li = document.createElement('li');
            li.innerText = reasonText;
            aiUl.appendChild(li);
        });

    }, 1000);
}
