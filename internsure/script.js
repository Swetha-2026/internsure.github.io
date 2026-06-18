// InternShield AI - Risk Assessment Engine

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("riskForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        let riskScore = 0;
        let warnings = [];

        const company =
            document.getElementById("company").value.trim();

        const email =
            document.getElementById("email").value.trim().toLowerCase();

        const website =
            document.getElementById("website").value.trim();

        const stipend =
            Number(document.getElementById("stipend").value) || 0;

        const fee =
            Number(document.getElementById("fee").value) || 0;

        const description =
            document.getElementById("description").value.toLowerCase();

        // --------------------
        // COMPANY NAME CHECK
        // --------------------
        if (company.length < 3) {
            riskScore += 15;
            warnings.push("Company name looks incomplete.");
        }

        // --------------------
        // WEBSITE CHECK
        // --------------------
        if (website === "") {
            riskScore += 20;
            warnings.push("No company website provided.");
        }

        // --------------------
        // EMAIL CHECK
        // --------------------
        const freeDomains = [
            "gmail.com",
            "yahoo.com",
            "outlook.com",
            "hotmail.com"
        ];

        const emailDomain = email.split("@")[1];

        if (freeDomains.includes(emailDomain)) {
            riskScore += 15;
            warnings.push(
                "Recruiter is using a free email service."
            );
        }

        // --------------------
        // STIPEND CHECK
        // --------------------
        if (stipend > 100000) {
            riskScore += 25;
            warnings.push(
                "Very high stipend for an internship."
            );
        }

        // --------------------
        // APPLICATION FEE CHECK
        // --------------------
        if (fee > 0) {
            riskScore += 30;
            warnings.push(
                "Internship requires an application fee."
            );
        }

        if (fee > 5000) {
            riskScore += 10;
            warnings.push(
                "Application fee amount is unusually high."
            );
        }

        // --------------------
        // DESCRIPTION CHECK
        // --------------------
        const suspiciousWords = [
            "guaranteed",
            "easy money",
            "earn instantly",
            "registration fee",
            "limited seats",
            "pay first",
            "quick income",
            "urgent hiring",
            "100% placement"
        ];

        suspiciousWords.forEach(word => {
            if (description.includes(word)) {
                riskScore += 8;
                warnings.push(
                    `Suspicious keyword detected: "${word}"`
                );
            }
        });

        // Limit Score
        if (riskScore > 100) {
            riskScore = 100;
        }

        // --------------------
        // DETERMINE RISK LEVEL
        // --------------------
        let level = "";
        let trust = 0;

        if (riskScore <= 30) {
            level = "LOW RISK";
            trust = 100 - riskScore;
        }
        else if (riskScore <= 60) {
            level = "MEDIUM RISK";
            trust = 100 - riskScore;
        }
        else {
            level = "HIGH RISK";
            trust = 100 - riskScore;
        }

        // --------------------
        // UPDATE DASHBOARD
        // --------------------
        document.getElementById("riskScore").innerText =
            riskScore;

        document.getElementById("trustScore").innerText =
            trust + "%";

        const riskLevel =
            document.getElementById("riskLevel");

        riskLevel.innerText = level;

        if (level === "LOW RISK") {
            riskLevel.style.color = "#00ff88";
        }
        else if (level === "MEDIUM RISK") {
            riskLevel.style.color = "#ffd43b";
        }
        else {
            riskLevel.style.color = "#ff4d6d";
        }

        // --------------------
        // WARNINGS
        // --------------------
        const warningList =
            document.getElementById("warningList");

        warningList.innerHTML = "";

        if (warnings.length === 0) {
            warningList.innerHTML =
                "<li>No major warning signs detected.</li>";
        }
        else {
            warnings.forEach(item => {

                const li =
                    document.createElement("li");

                li.textContent = item;

                warningList.appendChild(li);

            });
        }

        // Smooth Scroll
        document
            .getElementById("dashboard")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});